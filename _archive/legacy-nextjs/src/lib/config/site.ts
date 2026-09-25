function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Innovation", href: "/innovation" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Industries", href: "/industries" },
  { label: "Build With Us", href: "/build-with-us" },
  { label: "Contact", href: "/contact" },
];

export const quoteHref = "/contact?type=quote#enquiry";

export function absoluteUrl(path = "/"): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
