import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/config/site";
import { products } from "@/lib/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/products", priority: 0.9 },
    { path: "/build-with-us", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
    { path: "/manufacturing", priority: 0.7 },
    { path: "/industries", priority: 0.7 },
    { path: "/innovation", priority: 0.6 },
    { path: "/about", priority: 0.6 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/products/${product.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
