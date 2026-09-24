import type { ProductSlug } from "./products";
import type { InnovationSlug } from "./innovation";

export type IndustrySlug =
  | "retail"
  | "hospitality"
  | "restaurants"
  | "food-service"
  | "healthcare"
  | "textile"
  | "e-commerce"
  | "institutions";

export type IndustryIcon =
  | "store"
  | "bed"
  | "utensils"
  | "chef"
  | "health"
  | "shirt"
  | "package"
  | "building";

export type Industry = {
  slug: IndustrySlug;
  name: string;
  icon: IndustryIcon;
  summary: string;
  needs: string[];
  products: ProductSlug[];
  /** Pipeline items that may become relevant — always shown as Under Development. */
  futureProducts: InnovationSlug[];
  note?: string;
};

export const industries: Industry[] = [
  {
    slug: "retail",
    name: "Retail",
    icon: "store",
    summary: "Carry bags and billing essentials for stores that serve customers every day.",
    needs: ["Branded carry bags", "Reliable thermal rolls at every counter", "Consistent reorders across outlets"],
    products: ["paper-bags", "thermal-rolls", "tissue-products", "kitchen-rolls"],
    futureProducts: [],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    icon: "bed",
    summary: "Tissue, kitchen and hygiene consumables for hotels, resorts and serviced spaces.",
    needs: ["Guest-facing tissue and hygiene", "Back-of-house kitchen supply", "Scheduled, predictable deliveries"],
    products: ["tissue-products", "hygiene-products", "kitchen-rolls", "thermal-rolls"],
    futureProducts: ["bagasse-tableware"],
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    icon: "utensils",
    summary: "Front- and back-of-house essentials for dining, takeaway and billing.",
    needs: ["Table and service tissue", "Kitchen rolls for prep areas", "Takeaway bags and billing rolls"],
    products: ["tissue-products", "kitchen-rolls", "paper-bags", "thermal-rolls"],
    futureProducts: ["biodegradable-cutlery", "bagasse-tableware", "edible-cutlery"],
  },
  {
    slug: "food-service",
    name: "Food Service",
    icon: "chef",
    summary: "High-turnover consumables for caterers, cloud kitchens and multi-site operators.",
    needs: ["Volume supply across sites", "Consistent specifications", "Packaging for takeaway and delivery"],
    products: ["kitchen-rolls", "tissue-products", "paper-bags", "hygiene-products"],
    futureProducts: ["bagasse-tableware", "biodegradable-cutlery", "edible-cutlery"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: "health",
    summary: "Suitable, approved tissue and hygiene products for clinics and care facilities.",
    needs: ["Approved hygiene consumables", "Documented specifications", "Dependable recurring supply"],
    products: ["tissue-products", "hygiene-products"],
    futureProducts: [],
    note: "Healthcare supply is limited to products that have completed the applicable testing and compliance.",
  },
  {
    slug: "textile",
    name: "Textile",
    icon: "shirt",
    summary: "Custom branded paper bags for garment, saree and apparel retailers.",
    needs: ["Bags printed with your brand", "Sizes suited to garments", "Seasonal volume planning"],
    products: ["paper-bags"],
    futureProducts: [],
  },
  {
    slug: "e-commerce",
    name: "E-commerce",
    icon: "package",
    summary: "Packaging bags and thermal rolls for online sellers and fulfilment operations.",
    needs: ["Packaging for dispatch and gifting", "Thermal rolls for invoices", "Supply that scales with orders"],
    products: ["paper-bags", "thermal-rolls"],
    futureProducts: [],
  },
  {
    slug: "institutions",
    name: "Institutions",
    icon: "building",
    summary: "Bulk, recurring procurement for schools, campuses, offices and public bodies.",
    needs: ["Contract and scheduled supply", "Consolidated ordering", "Clear documentation for procurement"],
    products: ["tissue-products", "hygiene-products", "kitchen-rolls", "paper-bags"],
    futureProducts: [],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}
