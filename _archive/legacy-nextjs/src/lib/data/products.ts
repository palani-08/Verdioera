import type { Visual } from "./types";
import type { IndustrySlug } from "./industries";

/**
 * Core product catalogue.
 *
 * Content rules (PRD §5, BRD §15):
 * - `specifications` stays empty until values are verified by Quality. The page
 *   then lists `specParameters` — the parameters agreed at quotation — instead.
 * - Never add prices, stock status, capacities or certifications here.
 */

export type ProductSlug =
  | "paper-bags"
  | "tissue-products"
  | "hygiene-products"
  | "thermal-rolls"
  | "kitchen-rolls";

export type Specification = { label: string; value: string };

export type Product = {
  slug: ProductSlug;
  name: string;
  /** Short label used in cards, menus and form options. */
  shortName: string;
  index: string;
  summary: string;
  overview: string[];
  applications: { title: string; detail: string }[];
  industries: IndustrySlug[];
  /** Parameters specified and confirmed per order. */
  specParameters: string[];
  /** Verified specifications approved for publication. Empty until confirmed. */
  specifications: Specification[];
  customisation: { title: string; detail: string }[];
  /** Regulatory caveat shown on the page where relevant. */
  complianceNote?: string;
  visual: Visual;
  seo: { title: string; description: string };
};

export const products: Product[] = [
  {
    slug: "paper-bags",
    name: "Paper Bags",
    shortName: "Paper Bags",
    index: "01",
    summary:
      "Paper carry and packaging bags for retail, textile, food service and e-commerce, made to the format your business needs.",
    overview: [
      "Paper bags are one of Simply Paper’s core manufacturing categories. We work with businesses that need dependable carry and packaging bags in recurring volumes, whether that is a standard format or a bag developed around your product, brand and handling requirements.",
      "Every order starts with a specification review. Format, dimensions, paper grade, handle type and print are agreed and signed off before production is scheduled, so what arrives matches what was approved.",
    ],
    applications: [
      { title: "Retail carry bags", detail: "Checkout and carry bags for stores, supermarkets and speciality retail." },
      { title: "Textile and apparel", detail: "Branded bags for garment, saree and apparel stores." },
      { title: "Food service and takeaway", detail: "Carry bags for restaurants, bakeries and quick-service outlets." },
      { title: "E-commerce and gifting", detail: "Packaging and presentation bags for online and gifting orders." },
    ],
    industries: ["retail", "textile", "restaurants", "food-service", "e-commerce", "institutions"],
    specParameters: [
      "Bag format",
      "Dimensions (width × gusset × height)",
      "Paper grade and GSM",
      "Handle type",
      "Print and branding",
      "Packing configuration",
    ],
    specifications: [],
    customisation: [
      { title: "Size and format", detail: "Dimensions and bag construction agreed to your use case." },
      { title: "Paper grade", detail: "Grade and weight selected for load and presentation." },
      { title: "Handles", detail: "Handle style discussed during specification review." },
      { title: "Printed branding", detail: "Your artwork, approved in writing before production." },
    ],
    complianceNote:
      "Bags intended for direct food contact are supplied only where applicable testing and compliance have been completed for that specification.",
    visual: { art: "paper-bags", artAlt: "Illustration of a kraft paper bag with twisted paper handles" },
    seo: {
      title: "Paper Bags — Custom & Bulk Paper Carry Bags",
      description:
        "Paper carry and packaging bags from Simply Paper for retail, textile, food service and e-commerce. Custom formats, branded print and bulk B2B supply. Request a quote.",
    },
  },
  {
    slug: "tissue-products",
    name: "Tissue Products",
    shortName: "Tissue",
    index: "02",
    summary:
      "Tissue essentials for hospitality, food service, workplaces and institutions, supplied in the formats and packs your operation uses.",
    overview: [
      "Tissue is a daily, high-turnover consumable — which is exactly why consistency matters. Simply Paper manufactures tissue products for businesses that need the same quality in every delivery and a supply partner who plans around their usage.",
      "Formats, dimensions, ply and packaging are confirmed with you during the specification review and documented against your account, so repeat orders stay consistent.",
    ],
    applications: [
      { title: "Hotels and hospitality", detail: "Guest room, washroom and front-of-house tissue." },
      { title: "Restaurants and cafés", detail: "Table and service tissue for dining and takeaway." },
      { title: "Offices and institutions", detail: "Recurring washroom and pantry supply for facilities." },
      { title: "Distribution and retail", detail: "Wholesale and private-label packs for resale." },
    ],
    industries: ["hospitality", "restaurants", "food-service", "healthcare", "institutions", "retail"],
    specParameters: ["Product format", "Sheet dimensions", "Ply", "Sheets per pack", "Packaging"],
    specifications: [],
    customisation: [
      { title: "Pack configuration", detail: "Pack sizes and case quantities matched to your usage." },
      { title: "Private-label packaging", detail: "Tissue supplied under your brand." },
      { title: "Format selection", detail: "Formats agreed to your dispensers and service style." },
    ],
    complianceNote:
      "Tissue for healthcare settings is supplied only for specifications that have completed the applicable testing and approvals.",
    visual: { art: "tissue-products", artAlt: "Illustration of a tissue box with a soft sheet drawn from the top" },
    seo: {
      title: "Tissue Products — Bulk Tissue Supply for Business",
      description:
        "Tissue products from Simply Paper for hotels, restaurants, offices and institutions. Consistent quality, flexible packs and private label. Request a quote.",
    },
  },
  {
    slug: "hygiene-products",
    name: "Hygiene Products",
    shortName: "Hygiene",
    index: "03",
    summary:
      "Everyday hygiene consumables for commercial, hospitality and institutional facilities, supplied for recurring B2B demand.",
    overview: [
      "Hygiene products are part of the everyday running of every hotel, workplace, school and facility. Simply Paper manufactures hygiene essentials for organisations that need reliable, repeatable supply rather than one-off purchases.",
      "The currently approved range, use cases and specifications are shared with you directly on enquiry, so you only ever see what can actually be supplied.",
    ],
    applications: [
      { title: "Hospitality", detail: "Guest and staff hygiene essentials for hotels and resorts." },
      { title: "Workplaces", detail: "Facility and washroom consumables for offices and campuses." },
      { title: "Institutions", detail: "Scheduled supply for schools, colleges and public bodies." },
      { title: "Healthcare facilities", detail: "Approved products for clinics and care settings." },
    ],
    industries: ["hospitality", "healthcare", "institutions", "food-service"],
    specParameters: ["Product variant", "Dimensions", "Pack size", "Packaging"],
    specifications: [],
    customisation: [
      { title: "Pack sizes", detail: "Pack and case configurations for your procurement cycle." },
      { title: "Private-label packaging", detail: "Supplied under your brand where feasible." },
      { title: "Supply schedule", detail: "Recurring delivery planned around consumption." },
    ],
    complianceNote:
      "Products for healthcare use are offered only after applicable testing and compliance for that product and market.",
    visual: { art: "hygiene-products", artAlt: "Illustration of a soft hygiene pouch beside a stack of folded sheets" },
    seo: {
      title: "Hygiene Products — B2B Hygiene Consumables",
      description:
        "Hygiene consumables from Simply Paper for hospitality, workplaces, institutions and healthcare facilities. Recurring B2B supply and private label. Request a quote.",
    },
  },
  {
    slug: "thermal-rolls",
    name: "Thermal Rolls",
    shortName: "Thermal Rolls",
    index: "04",
    summary:
      "Thermal paper rolls for billing, point-of-sale and receipt printing, supplied in the roll sizes your printers use.",
    overview: [
      "Billing never stops, so thermal rolls need to be dependable, correctly sized and always in stock at the counter. Simply Paper manufactures thermal rolls for retailers, restaurants, distributors and any business that prints receipts at volume.",
      "Roll width, length, core diameter and pack size are confirmed for your printers and usage before your first order, and recorded for every repeat order after.",
    ],
    applications: [
      { title: "Retail point of sale", detail: "Receipt rolls for billing counters and POS systems." },
      { title: "Restaurants and QSR", detail: "Billing and kitchen order printing." },
      { title: "Card and payment terminals", detail: "Rolls sized for handheld and counter terminals." },
      { title: "Distribution", detail: "Bulk and private-label supply for stationery distributors." },
    ],
    industries: ["retail", "restaurants", "e-commerce", "hospitality", "institutions"],
    specParameters: ["Roll width", "Roll length", "Core diameter", "Pack size"],
    specifications: [],
    customisation: [
      { title: "Roll dimensions", detail: "Width and length matched to your printers." },
      { title: "Core size", detail: "Core diameter confirmed for your equipment." },
      { title: "Pack configuration", detail: "Box and case quantities for your stores." },
      { title: "Private label", detail: "Rolls packed under your brand." },
    ],
    visual: { art: "thermal-rolls", artAlt: "Illustration of a thermal paper roll with a receipt strip unwinding" },
    seo: {
      title: "Thermal Rolls — Billing & POS Paper Rolls",
      description:
        "Thermal paper rolls from Simply Paper for retail billing, restaurants, payment terminals and distributors. Sized to your printers. Request a bulk quote.",
    },
  },
  {
    slug: "kitchen-rolls",
    name: "Kitchen Rolls",
    shortName: "Kitchen Rolls",
    index: "05",
    summary:
      "Absorbent kitchen rolls for commercial kitchens, hospitality, food service and retail private label.",
    overview: [
      "From restaurant kitchens to hotel pantries, kitchen rolls are used constantly and reordered often. Simply Paper manufactures kitchen rolls for businesses that want consistent absorbency, dependable supply and packs that suit their operation.",
      "Sheet dimensions, ply and roll and pack configurations are confirmed during specification review, then held consistent across every order.",
    ],
    applications: [
      { title: "Commercial kitchens", detail: "Everyday wiping and prep use in restaurant kitchens." },
      { title: "Hotels and catering", detail: "Pantry, banquet and housekeeping supply." },
      { title: "Food service operators", detail: "Recurring supply for multi-outlet operators." },
      { title: "Retail and private label", detail: "Consumer packs for retail under your brand." },
    ],
    industries: ["restaurants", "food-service", "hospitality", "institutions", "retail"],
    specParameters: ["Sheet dimensions", "Ply", "Sheets per roll", "Rolls per pack"],
    specifications: [],
    customisation: [
      { title: "Roll and pack sizes", detail: "Configured for commercial or retail use." },
      { title: "Private-label packaging", detail: "Kitchen rolls under your brand." },
      { title: "Supply planning", detail: "Scheduled replenishment for recurring demand." },
    ],
    complianceNote:
      "Claims about direct food contact are made only for specifications with completed testing and compliance.",
    visual: { art: "kitchen-rolls", artAlt: "Illustration of a kitchen roll with a perforated sheet hanging loose" },
    seo: {
      title: "Kitchen Rolls — Commercial & Private-Label Supply",
      description:
        "Kitchen rolls from Simply Paper for commercial kitchens, hotels, food service and retail private label. Consistent quality and bulk supply. Request a quote.",
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProducts(slugs: readonly ProductSlug[]): Product[] {
  return slugs
    .map((slug) => getProduct(slug))
    .filter((product): product is Product => Boolean(product));
}
