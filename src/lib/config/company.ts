/**
 * Company configuration — the single source of truth for business facts.
 *
 * RULE: never put unverified information here. Anything not yet confirmed by the
 * business stays `null` (or an empty array). Components hide `null` values in
 * production and show an editable placeholder only when
 * NEXT_PUBLIC_SHOW_CONTENT_PLACEHOLDERS=true (useful on staging).
 */

export type PostalAddress = {
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
};

export type CompanyConfig = {
  name: string;
  tagline: string;
  /** Registered legal entity name, e.g. "Simply Paper Private Limited". */
  legalName: string | null;
  /** Public sales / enquiries email shown on the site. */
  email: string | null;
  /** Public phone number in international format, e.g. "+91 98765 43210". */
  phone: string | null;
  /** WhatsApp number in international format without spaces, e.g. "919876543210". */
  whatsapp: string | null;
  /** Registered or correspondence address. */
  address: PostalAddress | null;
  /** Business hours as displayed, e.g. "Mon–Sat, 9:30–18:30 IST". */
  hours: string | null;
  /** Official profile URLs only. Leave empty until accounts exist. */
  social: { label: string; href: string }[];
  /** Primary market from the PRD. */
  primaryMarket: string;
  manufacturing: {
    /** "Owned facility" | "Contract manufacturing" | "Hybrid" — to be confirmed (BRD §18). */
    model: string | null;
    /** Factory / operating locations, e.g. ["Coimbatore, Tamil Nadu"]. */
    locations: string[];
    /** Approved production capacity statement, if leadership approves publishing one. */
    capacityStatement: string | null;
    /** Documented quality and inspection process summary, once approved. */
    qualityProcess: string | null;
    /** Only certifications actually held and approved for publication. */
    certifications: { name: string; scope?: string }[];
  };
  legal: {
    /** Set to true once privacy and terms copy has been reviewed by counsel. */
    reviewed: boolean;
    lastUpdated: string;
    /** Contact for privacy requests. Falls back to `email` when null. */
    privacyContactEmail: string | null;
    /** How long enquiry data is retained — confirm with the business (PRD §15). */
    enquiryRetention: string | null;
  };
};

export const company: CompanyConfig = {
  name: "Simply Paper",
  tagline: "Better Materials. Better Everyday Products.",
  legalName: null,
  email: null,
  phone: null,
  whatsapp: null,
  address: null,
  hours: null,
  social: [],
  primaryMarket: "India, with international enquiries welcome",
  manufacturing: {
    model: null,
    locations: [],
    capacityStatement: null,
    qualityProcess: null,
    certifications: [],
  },
  legal: {
    reviewed: false,
    lastUpdated: "2026-09-24",
    privacyContactEmail: null,
    enquiryRetention: null,
  },
};

export const showContentPlaceholders =
  process.env.NEXT_PUBLIC_SHOW_CONTENT_PLACEHOLDERS === "true";

export function formatAddress(address: PostalAddress): string[] {
  return [
    address.line1,
    address.line2,
    `${address.city}, ${address.region} ${address.postalCode}`.trim(),
    address.country,
  ].filter((line): line is string => Boolean(line));
}
