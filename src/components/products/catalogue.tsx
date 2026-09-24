"use client";

import { useState } from "react";
import { products } from "@/lib/data/products";
import { industries, type IndustrySlug } from "@/lib/data/industries";
import { ProductCard } from "@/components/sections/product-card";
import { cn } from "@/lib/cn";

type Filter = IndustrySlug | "all";

export function Catalogue() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? products : products.filter((product) => product.industries.includes(filter));
  const activeName = industries.find((industry) => industry.slug === filter)?.name;

  const options: { value: Filter; label: string }[] = [
    { value: "all", label: "All products" },
    ...industries.map((industry) => ({ value: industry.slug, label: industry.name })),
  ];

  return (
    <div>
      <fieldset>
        <legend className="text-xs font-medium uppercase tracking-[0.16em] text-stone">Filter by industry</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {options.map((option) => {
            const checked = filter === option.value;
            return (
              <label
                key={option.value}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-forest",
                  checked
                    ? "border-forest bg-forest text-paper"
                    : "border-charcoal/20 text-charcoal hover:border-charcoal/50",
                )}
              >
                <input
                  type="radio"
                  name="industry-filter"
                  value={option.value}
                  checked={checked}
                  onChange={() => setFilter(option.value)}
                  className="sr-only"
                />
                {option.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <p aria-live="polite" className="mt-8 text-sm text-stone">
        {filter === "all"
          ? `Showing all ${visible.length} product categories`
          : `Showing ${visible.length} ${visible.length === 1 ? "category" : "categories"} for ${activeName}`}
      </p>

      <ul className="mt-6 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <li key={product.slug}>
            <ProductCard product={product} headingLevel="h2" />
          </li>
        ))}
      </ul>
    </div>
  );
}
