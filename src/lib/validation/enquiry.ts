import { z } from "zod";
import {
  enquiryTypeValues,
  productInterestValues,
  quantityOptionalTypes,
} from "@/lib/data/enquiry-options";

/**
 * Shared enquiry schema — used by the client form (React Hook Form) and
 * re-validated on the server in /api/enquiry. Never trust the client.
 */

const phonePattern = /^\+?[0-9\s\-().]{7,20}$/;

const text = (label: string, min: number, max: number) =>
  z
    .string({ error: `Please enter your ${label}.` })
    .trim()
    .min(1, `Please enter your ${label}.`)
    .min(min, `${capitalise(label)} must be at least ${min} characters.`)
    .max(max, `${capitalise(label)} must be ${max} characters or fewer.`);

function capitalise(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export const enquirySchema = z
  .object({
    fullName: text("full name", 2, 100),
    companyName: text("company name", 2, 150),
    email: z
      .string({ error: "Please enter your business email." })
      .trim()
      .min(1, "Please enter your business email.")
      .max(254, "Email must be 254 characters or fewer.")
      .pipe(z.email("Please enter a valid email address.")),
    phone: z
      .string({ error: "Please enter a phone number." })
      .trim()
      .min(1, "Please enter a phone number.")
      .regex(phonePattern, "Please enter a valid phone number, including country code if outside India."),
    enquiryType: z.enum(enquiryTypeValues, { error: "Please choose an enquiry type." }),
    productInterest: z.enum(productInterestValues, { error: "Please choose a product." }),
    quantity: z.string({ error: "Please give an approximate quantity." }).trim().max(200, "Please keep this to 200 characters or fewer."),
    location: text("city and country", 2, 120),
    message: text("message", 10, 3000),
    consent: z.boolean({ error: "Please confirm you agree to be contacted about this enquiry." }).refine((value) => value === true, {
      message: "Please confirm you agree to be contacted about this enquiry.",
    }),
  })
  .superRefine((data, ctx) => {
    if (!quantityOptionalTypes.includes(data.enquiryType) && data.quantity.length < 1) {
      ctx.addIssue({
        code: "custom",
        path: ["quantity"],
        message: "Please give an approximate quantity or frequency.",
      });
    }
  });

export type EnquiryFormInput = z.input<typeof enquirySchema>;
export type EnquiryData = z.output<typeof enquirySchema>;

/** Anti-abuse metadata submitted alongside the form values. */
export const enquiryMetaSchema = z.object({
  /** Honeypot — real users never see or fill this field. */
  website: z.string().max(500).optional().default(""),
  /** Epoch ms when the form was rendered, used for a minimum fill time. */
  startedAt: z.number().int().positive(),
  sourcePage: z.string().max(300).optional().default("/contact"),
});

export const enquiryRequestSchema = z.object({
  values: z.unknown(),
  meta: enquiryMetaSchema,
});

export type EnquiryApiResponse =
  | { ok: true; reference: string; mode: "delivered" | "dev-log" }
  | { ok: false; error: string; fieldErrors?: Record<string, string[] | undefined> };
