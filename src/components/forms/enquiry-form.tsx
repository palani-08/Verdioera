"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import {
  enquirySchema,
  type EnquiryApiResponse,
  type EnquiryData,
  type EnquiryFormInput,
} from "@/lib/validation/enquiry";
import {
  enquiryTypes,
  productInterestOptions,
  quantityOptionalTypes,
  type EnquiryType,
  type ProductInterest,
} from "@/lib/data/enquiry-options";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Field, fieldDescribedBy, inputClass } from "./field";

type DeliveryStatus = "configured" | "dev-log" | "not-configured";

type EnquiryFormProps = {
  defaultType?: EnquiryType;
  defaultProduct?: ProductInterest;
  defaultMessage?: string;
  deliveryStatus: DeliveryStatus;
  directEmail: string | null;
};

type Status =
  | { kind: "idle" }
  | { kind: "error"; message: string }
  | { kind: "success"; reference: string; devLog: boolean };

const productGroups = Array.from(new Set(productInterestOptions.map((option) => option.group)));

function sourcePage(): string {
  const current = `${window.location.pathname}${window.location.search}`;
  try {
    const referrer = document.referrer ? new URL(document.referrer) : null;
    if (referrer && referrer.origin === window.location.origin && referrer.pathname !== window.location.pathname) {
      return `${referrer.pathname} → ${current}`.slice(0, 300);
    }
  } catch {
    // Ignore malformed referrers.
  }
  return current.slice(0, 300);
}

export function EnquiryForm({ defaultType, defaultProduct, defaultMessage, deliveryStatus, directEmail }: EnquiryFormProps) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  // Render time of the form, used server-side to reject implausibly fast (bot) submissions.
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const successHeading = useRef<HTMLHeadingElement>(null);
  const errorAlert = useRef<HTMLDivElement>(null);
  const unavailable = deliveryStatus === "not-configured";

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control: formControl,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormInput, unknown, EnquiryData>({
    resolver: zodResolver(enquirySchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      enquiryType: defaultType ?? "quote",
      productInterest: defaultProduct ?? ("" as ProductInterest),
      quantity: "",
      location: "",
      message: defaultMessage ?? "",
      consent: false,
    },
  });

  useEffect(() => {
    if (status.kind === "success") successHeading.current?.focus();
    if (status.kind === "error") errorAlert.current?.focus();
  }, [status]);

  const enquiryType = useWatch({ control: formControl, name: "enquiryType" });
  const quantityRequired = !quantityOptionalTypes.includes(enquiryType as EnquiryType);

  async function onSubmit(values: EnquiryData, event?: React.BaseSyntheticEvent) {
    setStatus({ kind: "idle" });
    const form = event?.target as HTMLFormElement | undefined;
    const honeypot = form?.elements.namedItem("website") as HTMLInputElement | null | undefined;
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          values,
          meta: { website: honeypot?.value ?? "", startedAt, sourcePage: sourcePage() },
        }),
      });
      const data = (await response.json().catch(() => null)) as EnquiryApiResponse | null;

      if (data?.ok) {
        setStatus({ kind: "success", reference: data.reference, devLog: data.mode === "dev-log" });
        reset();
        return;
      }

      if (data && !data.ok && data.fieldErrors) {
        for (const [field, messages] of Object.entries(data.fieldErrors)) {
          if (messages?.[0]) setError(field as keyof EnquiryFormInput, { type: "server", message: messages[0] });
        }
      }
      setStatus({
        kind: "error",
        message: data && !data.ok ? data.error : "Something went wrong. Please try again in a moment.",
      });
    } catch {
      setStatus({
        kind: "error",
        message: "We couldn’t reach our server. Please check your connection and try again — your details are still here.",
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="rounded-[var(--radius-card)] border border-line bg-paper p-8 sm:p-10" aria-live="polite">
        <CheckCircle2 aria-hidden="true" className="size-10 text-forest" strokeWidth={1.5} />
        <h2 ref={successHeading} tabIndex={-1} className="display-md mt-6 focus:outline-none">
          Thank you. Your enquiry has been sent.
        </h2>
        <p className="mt-4 text-[0.98rem] leading-relaxed text-stone">
          Our team will review your requirements and get back to you. Please keep your reference for any follow-up.
        </p>
        <p className="mt-6 inline-flex rounded-full bg-paper-2 px-4 py-2 text-sm">
          Reference: <strong className="ml-2 font-medium tabular-nums">{status.reference}</strong>
        </p>
        {status.devLog && (
          <p className="mt-6 rounded-xl border border-dashed border-[#B7791F]/60 bg-[#FBF3E4] p-4 text-sm text-[#6B4A12]">
            Development mode: no delivery channel is configured, so this enquiry was written to the server console and
            was <strong>not</strong> emailed. Configure Resend or a webhook before launch.
          </p>
        )}
        <Button variant="secondary" className="mt-8" onClick={() => {
            setStartedAt(Date.now());
            setStatus({ kind: "idle" });
          }}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  const e = {
    fullName: errors.fullName?.message,
    companyName: errors.companyName?.message,
    email: errors.email?.message,
    phone: errors.phone?.message,
    enquiryType: errors.enquiryType?.message,
    productInterest: errors.productInterest?.message,
    quantity: errors.quantity?.message,
    location: errors.location?.message,
    message: errors.message?.message,
    consent: errors.consent?.message,
  };

  const control = (id: keyof typeof e, hint?: string) => ({
    id,
    "aria-invalid": e[id] ? true : undefined,
    "aria-describedby": fieldDescribedBy(id, { hint, error: e[id] }),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-describedby="form-required-note"
      className="relative rounded-[var(--radius-card)] border border-line bg-paper p-6 sm:p-10"
    >
      {unavailable && (
        <div role="status" className="mb-8 flex gap-3 rounded-xl border border-[#B7791F]/50 bg-[#FBF3E4] p-4 text-sm leading-relaxed text-[#6B4A12]">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <p>
            Online enquiries aren’t connected yet.{" "}
            {directEmail ? (
              <>
                Please email <a className="font-medium underline" href={`mailto:${directEmail}`}>{directEmail}</a> instead.
              </>
            ) : (
              "Please check back shortly."
            )}
          </p>
        </div>
      )}

      <p id="form-required-note" className="mb-8 text-sm text-stone">
        Fields marked <span className="text-danger" aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="fullName" label="Full name" required error={e.fullName}>
          <input {...register("fullName")} {...control("fullName")} autoComplete="name" className={cn(inputClass, "h-12 border-line")} />
        </Field>
        <Field id="companyName" label="Company name" required error={e.companyName}>
          <input {...register("companyName")} {...control("companyName")} autoComplete="organization" className={cn(inputClass, "h-12 border-line")} />
        </Field>
        <Field id="email" label="Business email" required error={e.email}>
          <input {...register("email")} {...control("email")} type="email" autoComplete="email" inputMode="email" className={cn(inputClass, "h-12 border-line")} />
        </Field>
        <Field id="phone" label="Phone" required hint="Include country code if outside India." error={e.phone}>
          <input
            {...register("phone")}
            {...control("phone", "Include country code if outside India.")}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className={cn(inputClass, "h-12 border-line")}
          />
        </Field>

        <Field id="enquiryType" label="Enquiry type" required error={e.enquiryType}>
          <div className="relative">
            <select {...register("enquiryType")} {...control("enquiryType")} className={cn(inputClass, "h-12 appearance-none border-line pr-10")}>
              {enquiryTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-stone" />
          </div>
        </Field>
        <Field id="productInterest" label="Product interest" required error={e.productInterest}>
          <div className="relative">
            <select {...register("productInterest")} {...control("productInterest")} className={cn(inputClass, "h-12 appearance-none border-line pr-10")}>
              <option value="" disabled>
                Select a product
              </option>
              {productGroups.map((group) => (
                <optgroup key={group} label={group}>
                  {productInterestOptions
                    .filter((option) => option.group === group)
                    .map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
            <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-stone" />
          </div>
        </Field>

        <Field
          id="quantity"
          label="Expected quantity"
          required={quantityRequired}
          hint="An estimate is fine, e.g. “20,000 bags per month”."
          error={e.quantity}
        >
          <input
            {...register("quantity")}
            {...control("quantity", "An estimate is fine, e.g. “20,000 bags per month”.")}
            aria-required={quantityRequired}
            className={cn(inputClass, "h-12 border-line")}
          />
        </Field>
        <Field id="location" label="Location" required hint="City and country for delivery." error={e.location}>
          <input
            {...register("location")}
            {...control("location", "City and country for delivery.")}
            autoComplete="address-level2"
            className={cn(inputClass, "h-12 border-line")}
          />
        </Field>

        <Field
          id="message"
          label="Message"
          required
          hint="Tell us about your application, specifications, branding or timelines."
          error={e.message}
          className="sm:col-span-2"
        >
          <textarea
            {...register("message")}
            {...control("message", "Tell us about your application, specifications, branding or timelines.")}
            rows={6}
            className={cn(inputClass, "resize-y border-line py-3 leading-relaxed")}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from people and assistive technology; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="mt-8">
        <div className="flex gap-3">
          <input
            {...register("consent")}
            id="consent"
            type="checkbox"
            aria-invalid={e.consent ? true : undefined}
            aria-describedby={e.consent ? "consent-error" : undefined}
            className="mt-0.5 size-5 shrink-0 cursor-pointer rounded border-line accent-forest"
          />
          <label htmlFor="consent" className="text-sm leading-relaxed text-charcoal/85">
            I agree that Simply Paper may store and use these details to respond to my enquiry, as described in the{" "}
            <Link href="/privacy" className="font-medium text-forest underline underline-offset-2">
              privacy policy
            </Link>
            . <span className="text-danger" aria-hidden="true">*</span>
          </label>
        </div>
        {e.consent && (
          <p id="consent-error" className="ml-8 mt-1.5 text-sm text-danger">
            {e.consent}
          </p>
        )}
      </div>

      {status.kind === "error" && (
        <div
          ref={errorAlert}
          tabIndex={-1}
          role="alert"
          className="mt-8 flex gap-3 rounded-xl border border-danger/30 bg-danger/5 p-4 text-sm text-danger focus:outline-none"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <p>{status.message}</p>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={isSubmitting || unavailable} aria-disabled={isSubmitting || unavailable} className="w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            "Send enquiry"
          )}
        </Button>
        <p className="text-xs text-stone" aria-live="polite">
          {isSubmitting ? "Sending your enquiry…" : "Your details are used to respond to this enquiry."}
        </p>
      </div>
    </form>
  );
}
