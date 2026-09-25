import { products } from "./products";
import { innovations } from "./innovation";

export const enquiryTypes = [
  { value: "quote", label: "Request a quote" },
  { value: "bulk-b2b", label: "Bulk B2B supply" },
  { value: "custom-manufacturing", label: "Custom manufacturing" },
  { value: "private-label", label: "Private label" },
  { value: "institutional-supply", label: "Institutional supply" },
  { value: "product-development", label: "Sustainable product development" },
  { value: "innovation-interest", label: "Express interest in an innovation" },
  { value: "general", label: "General enquiry" },
] as const;

export type EnquiryType = (typeof enquiryTypes)[number]["value"];

export const enquiryTypeValues = enquiryTypes.map((type) => type.value) as [
  EnquiryType,
  ...EnquiryType[],
];

/** Enquiry types where expected quantity is not required. */
export const quantityOptionalTypes: readonly EnquiryType[] = [
  "general",
  "innovation-interest",
  "product-development",
];

export const productInterestOptions = [
  ...products.map((product) => ({ value: product.slug, label: product.name, group: "Core products" })),
  ...innovations.map((item) => ({
    value: item.slug,
    label: `${item.name} (under development)`,
    group: "Innovation pipeline",
  })),
  { value: "multiple", label: "Multiple products", group: "Other" },
  { value: "not-sure", label: "Not sure yet", group: "Other" },
] as const;

export type ProductInterest = (typeof productInterestOptions)[number]["value"];

export const productInterestValues = productInterestOptions.map((option) => option.value) as [
  ProductInterest,
  ...ProductInterest[],
];

export function labelForEnquiryType(value: string): string {
  return enquiryTypes.find((type) => type.value === value)?.label ?? value;
}

export function labelForProductInterest(value: string): string {
  return productInterestOptions.find((option) => option.value === value)?.label ?? value;
}

export function isEnquiryType(value: unknown): value is EnquiryType {
  return typeof value === "string" && (enquiryTypeValues as readonly string[]).includes(value);
}

export function isProductInterest(value: unknown): value is ProductInterest {
  return typeof value === "string" && (productInterestValues as readonly string[]).includes(value);
}
