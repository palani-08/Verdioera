import type { Visual } from "./types";

/**
 * Innovation pipeline (PRD §6). Every item is a future development.
 * Do not add biodegradability, compostability, food-safety or other
 * environmental claims until testing and certification are complete and approved.
 */

export type InnovationSlug =
  | "biodegradable-cutlery"
  | "bagasse-tableware"
  | "edible-cutlery"
  | "paddy-husk-products";

export type InnovationStatus = "under-development";

export type Innovation = {
  slug: InnovationSlug;
  name: string;
  status: InnovationStatus;
  summary: string;
  description: string;
  proposedApplications: string[];
  /** What must be validated before any commercial availability. */
  validation: string;
  visual: Visual;
};

export const innovationStatusLabel: Record<InnovationStatus, string> = {
  "under-development": "Under Development",
};

export const innovations: Innovation[] = [
  {
    slug: "biodegradable-cutlery",
    name: "Biodegradable Cutlery",
    status: "under-development",
    summary: "Single-use cutlery from alternative materials, intended as a practical option for food service.",
    description:
      "We are exploring alternative materials for everyday spoons, forks and knives used across takeaway and catering. The goal is cutlery that performs in real service conditions and can be produced consistently at B2B volumes.",
    proposedApplications: ["Takeaway and delivery", "Catering and events", "Institutional canteens", "Quick-service restaurants"],
    validation:
      "Material performance and any biodegradability claims will be tested and certified before publication or sale.",
    visual: { art: "biodegradable-cutlery", artAlt: "Illustration of a spoon, fork and knife in a natural material" },
  },
  {
    slug: "bagasse-tableware",
    name: "Bagasse Tableware",
    status: "under-development",
    summary: "Plates, bowls and containers moulded from bagasse, the fibre remaining after sugarcane is processed.",
    description:
      "Bagasse is a by-product of sugarcane processing. We are developing moulded tableware formats from it for food service, with a focus on everyday durability and handling.",
    proposedApplications: ["Plates and bowls", "Takeaway containers", "Catering and banquets", "Food courts and canteens"],
    validation: "Food-service applications are subject to testing before any product is offered.",
    visual: { art: "bagasse-tableware", artAlt: "Illustration of a moulded compartment plate and bowl" },
  },
  {
    slug: "edible-cutlery",
    name: "Edible Cutlery",
    status: "under-development",
    summary: "Spoons and cutlery made from edible ingredients, designed to be eaten after use.",
    description:
      "Edible cutlery is an early-stage concept in our pipeline. We are studying formulations, strength in use and how products hold up between production and the table.",
    proposedApplications: ["Desserts and ice cream", "Cafés and street food", "Events and tastings", "Airline and travel catering"],
    validation: "Food-safety and shelf-life validation are required before availability.",
    visual: { art: "edible-cutlery", artAlt: "Illustration of a baked, grain-textured spoon" },
  },
  {
    slug: "paddy-husk-products",
    name: "Paddy Husk Products",
    status: "under-development",
    summary: "Exploring rice husk, left over from paddy milling, as a raw material for durable everyday products.",
    description:
      "Paddy husk is generated in large quantities wherever rice is milled. We are assessing whether it can become a dependable input for everyday products, and which product formats make practical sense.",
    proposedApplications: ["Tableware and serveware", "Storage containers", "Household essentials", "Hospitality amenities"],
    validation: "Material feasibility and performance testing are required before availability.",
    visual: { art: "paddy-husk-products", artAlt: "Illustration of a bowl surrounded by scattered rice husk" },
  },
];

export function getInnovation(slug: string): Innovation | undefined {
  return innovations.find((item) => item.slug === slug);
}
