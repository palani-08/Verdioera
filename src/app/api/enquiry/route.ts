import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { enquiryRequestSchema, enquirySchema, type EnquiryApiResponse } from "@/lib/validation/enquiry";
import { rateLimit } from "@/lib/server/rate-limit";
import { deliverEnquiry } from "@/lib/server/enquiry-delivery";

const MAX_BODY_BYTES = 16_000;
const MIN_FILL_MS = 3_000;
const MAX_FORM_AGE_MS = 1000 * 60 * 60 * 24;
const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

function json(body: EnquiryApiResponse, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // Non-browser clients; still subject to validation and rate limits.
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function makeReference(): string {
  const date = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  return `SP-${date}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return json({ ok: false, error: "This request could not be verified." }, 403);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, error: "Unsupported request format." }, 415);
  }

  const limit = rateLimit(`enquiry:${clientIp(request)}`, RATE_LIMIT.limit, RATE_LIMIT.windowMs);
  if (!limit.allowed) {
    return json(
      { ok: false, error: "You’ve sent several enquiries in a short time. Please wait a few minutes and try again." },
      429,
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: "Your enquiry is too long. Please shorten the message." }, 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "The enquiry could not be read. Please try again." }, 400);
  }

  const envelope = enquiryRequestSchema.safeParse(body);
  if (!envelope.success) {
    return json({ ok: false, error: "The enquiry could not be read. Please refresh the page and try again." }, 400);
  }

  const { meta } = envelope.data;
  const elapsed = Date.now() - meta.startedAt;

  // Honeypot filled or implausibly fast: respond as if accepted, but deliver nothing.
  if (meta.website || elapsed < MIN_FILL_MS) {
    return json({ ok: true, reference: makeReference(), mode: "delivered" }, 200);
  }
  if (elapsed > MAX_FORM_AGE_MS) {
    return json({ ok: false, error: "This form has expired. Please refresh the page and submit again." }, 400);
  }

  const parsed = enquirySchema.safeParse(envelope.data.values);
  if (!parsed.success) {
    return json(
      {
        ok: false,
        error: "Some details need attention. Please check the highlighted fields.",
        fieldErrors: z.flattenError(parsed.error).fieldErrors,
      },
      422,
    );
  }

  const now = new Date().toISOString();
  const reference = makeReference();
  const result = await deliverEnquiry({
    ...parsed.data,
    reference,
    submittedAt: now,
    consentRecordedAt: now,
    sourcePage: meta.sourcePage.startsWith("/") ? meta.sourcePage : "/contact",
    userAgent: request.headers.get("user-agent")?.slice(0, 300) ?? null,
  });

  if (!result.ok) {
    if (result.reason === "not-configured") {
      console.error("[enquiry] No delivery channel configured. See README → Enquiry delivery.");
      return json(
        { ok: false, error: "Online enquiries are not available right now. Please contact us directly." },
        503,
      );
    }
    return json(
      { ok: false, error: "We couldn’t send your enquiry just now. Your details are still here — please try again." },
      502,
    );
  }

  return json({ ok: true, reference, mode: result.mode === "dev-log" ? "dev-log" : "delivered" }, 200);
}

export function GET() {
  return json({ ok: false, error: "Method not allowed." }, 405, { Allow: "POST" });
}
