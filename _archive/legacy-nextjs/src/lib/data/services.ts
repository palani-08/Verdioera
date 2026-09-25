import type { EnquiryType } from "./enquiry-options";

export type ServiceSlug =
  | "custom-manufacturing"
  | "private-label"
  | "institutional-supply"
  | "bulk-b2b"
  | "product-development";

export type Service = {
  slug: ServiceSlug;
  index: string;
  title: string;
  summary: string;
  audience: string;
  points: string[];
  enquiryType: EnquiryType;
  cta: string;
};

export const services: Service[] = [
  {
    slug: "custom-manufacturing",
    index: "01",
    title: "Custom manufacturing",
    summary: "Products made to your agreed dimensions, materials and packaging.",
    audience: "For brands and businesses whose requirements don’t fit a standard format.",
    points: [
      "Requirement and feasibility review",
      "Written sign-off on specification and artwork",
      "Production planned against your schedule",
    ],
    enquiryType: "custom-manufacturing",
    cta: "Discuss a custom product",
  },
  {
    slug: "private-label",
    index: "02",
    title: "Private label",
    summary: "Paper, tissue and hygiene products supplied under your brand.",
    audience: "For distributors, retailers and brands building their own range.",
    points: [
      "Your brand on product and packaging",
      "Artwork, specification and pricing approved before production",
      "Consistent repeat runs",
    ],
    enquiryType: "private-label",
    cta: "Start a private-label enquiry",
  },
  {
    slug: "institutional-supply",
    index: "03",
    title: "Institutional supply",
    summary: "Recurring, contract-based supply for institutions and large facilities.",
    audience: "For schools, campuses, hospitals, offices and public bodies.",
    points: [
      "Scheduled deliveries around consumption",
      "Consolidated ordering across categories",
      "Documentation for procurement teams",
    ],
    enquiryType: "institutional-supply",
    cta: "Enquire about institutional supply",
  },
  {
    slug: "bulk-b2b",
    index: "04",
    title: "Bulk B2B supply",
    summary: "Wholesale volumes across our core categories for trade buyers.",
    audience: "For distributors, wholesalers, retailers and multi-site operators.",
    points: [
      "Volume supply across five core categories",
      "Specifications recorded for every repeat order",
      "Pricing per category and quantity",
    ],
    enquiryType: "bulk-b2b",
    cta: "Request bulk pricing",
  },
  {
    slug: "product-development",
    index: "05",
    title: "Sustainable product development",
    summary: "Co-developing practical products from alternative materials.",
    audience: "For partners who want to develop and trial new materials with a manufacturer.",
    points: [
      "Stage-gated feasibility and prototyping",
      "Testing before any claims are made",
      "Pilot production when a product is ready",
    ],
    enquiryType: "product-development",
    cta: "Propose a development partnership",
  },
];
