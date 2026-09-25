import "server-only";
import type { EnquiryData } from "@/lib/validation/enquiry";
import { labelForEnquiryType, labelForProductInterest } from "@/lib/data/enquiry-options";
import { company } from "@/lib/config/company";

/**
 * Enquiry delivery.
 *
 * Channels (configure one or both via environment variables):
 *  - Email through Resend  — RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL
 *  - Webhook (CRM, Zapier, Make, Slack workflow, etc.) — ENQUIRY_WEBHOOK_URL (+ optional ENQUIRY_WEBHOOK_SECRET)
 *
 * If no channel is configured, submissions are rejected with a clear message.
 * The one exception is local development with ENQUIRY_DEV_LOG=true, where the
 * enquiry is printed to the server console and the UI says so explicitly.
 */

export type EnquiryRecord = EnquiryData & {
  reference: string;
  submittedAt: string;
  sourcePage: string;
  consentRecordedAt: string;
  userAgent: string | null;
};

export type DeliveryMode = "email" | "webhook" | "email+webhook" | "dev-log";

export type DeliveryResult =
  | { ok: true; mode: DeliveryMode }
  | { ok: false; reason: "not-configured" | "delivery-failed" };

type Config = {
  resend: { apiKey: string; to: string[]; from: string } | null;
  webhook: { url: string; secret: string | null } | null;
  devLog: boolean;
};

function readConfig(): Config {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.ENQUIRY_TO_EMAIL?.split(",").map((value) => value.trim()).filter(Boolean) ?? [];
  const from = process.env.ENQUIRY_FROM_EMAIL?.trim();
  const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL?.trim();

  return {
    resend: apiKey && to.length > 0 && from ? { apiKey, to, from } : null,
    webhook: webhookUrl ? { url: webhookUrl, secret: process.env.ENQUIRY_WEBHOOK_SECRET?.trim() || null } : null,
    devLog: process.env.NODE_ENV !== "production" && process.env.ENQUIRY_DEV_LOG === "true",
  };
}

export type DeliveryStatus = "configured" | "dev-log" | "not-configured";

export function getDeliveryStatus(): DeliveryStatus {
  const config = readConfig();
  if (config.resend || config.webhook) return "configured";
  if (config.devLog) return "dev-log";
  return "not-configured";
}

export async function deliverEnquiry(record: EnquiryRecord): Promise<DeliveryResult> {
  const config = readConfig();

  if (!config.resend && !config.webhook) {
    if (config.devLog) {
      console.info("[enquiry:dev-log] Enquiry received (not delivered — no channel configured):\n", record);
      return { ok: true, mode: "dev-log" };
    }
    return { ok: false, reason: "not-configured" };
  }

  const tasks: Promise<boolean>[] = [];
  if (config.resend) tasks.push(sendWithResend(config.resend, record));
  if (config.webhook) tasks.push(sendToWebhook(config.webhook, record));

  const results = await Promise.all(tasks);
  // Treat the enquiry as delivered if at least one configured channel accepted it.
  if (!results.some(Boolean)) return { ok: false, reason: "delivery-failed" };

  const mode: DeliveryMode =
    config.resend && config.webhook ? "email+webhook" : config.resend ? "email" : "webhook";
  return { ok: true, mode };
}

function rows(record: EnquiryRecord): [string, string][] {
  return [
    ["Reference", record.reference],
    ["Enquiry type", labelForEnquiryType(record.enquiryType)],
    ["Product interest", labelForProductInterest(record.productInterest)],
    ["Full name", record.fullName],
    ["Company", record.companyName],
    ["Business email", record.email],
    ["Phone", record.phone],
    ["Location", record.location],
    ["Expected quantity", record.quantity || "—"],
    ["Source page", record.sourcePage],
    ["Submitted at (UTC)", record.submittedAt],
    ["Privacy consent", `Given at ${record.consentRecordedAt}`],
  ];
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strip CR/LF so user input can never inject email headers via the subject. */
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").slice(0, 120);
}

async function sendWithResend(
  config: NonNullable<Config["resend"]>,
  record: EnquiryRecord,
): Promise<boolean> {
  const subject = headerSafe(
    `New enquiry: ${labelForEnquiryType(record.enquiryType)} — ${record.companyName} [${record.reference}]`,
  );

  const text = [...rows(record).map(([label, value]) => `${label}: ${value}`), "", "Message:", record.message].join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#252B26;max-width:640px">
      <h2 style="font-weight:600;color:#234E3B;margin:0 0 16px">New ${escapeHtml(company.name)} enquiry</h2>
      <table cellpadding="6" style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows(record)
          .map(
            ([label, value]) =>
              `<tr><td style="color:#585E58;width:170px;vertical-align:top;border-bottom:1px solid #E6E0D2">${escapeHtml(label)}</td><td style="border-bottom:1px solid #E6E0D2">${escapeHtml(value)}</td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="font-weight:600;margin:24px 0 8px">Message</h3>
      <p style="white-space:pre-wrap;font-size:14px;line-height:1.6;margin:0">${escapeHtml(record.message)}</p>
    </div>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: config.from,
        to: config.to,
        reply_to: record.email,
        subject,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("[enquiry] Resend rejected the request", response.status, await safeText(response));
      return false;
    }
    return true;
  } catch (error) {
    console.error("[enquiry] Resend request failed", error);
    return false;
  }
}

async function sendToWebhook(
  config: NonNullable<Config["webhook"]>,
  record: EnquiryRecord,
): Promise<boolean> {
  try {
    const response = await fetch(config.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(config.secret ? { "X-Enquiry-Secret": config.secret } : {}),
      },
      body: JSON.stringify({ source: "simply-paper-website", enquiry: record }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("[enquiry] Webhook rejected the request", response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[enquiry] Webhook request failed", error);
    return false;
  }
}

async function safeText(response: Response): Promise<string> {
  try {
    return (await response.text()).slice(0, 500);
  } catch {
    return "";
  }
}
