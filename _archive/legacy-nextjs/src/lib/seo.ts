import type { Metadata } from "next";
import { company } from "@/lib/config/company";
import { absoluteUrl } from "@/lib/config/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Use the title as-is instead of appending the brand template. */
  absoluteTitle?: boolean;
};

export function pageMetadata({ title, description, path, absoluteTitle = false }: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${company.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: company.name,
      url: absoluteUrl(path),
      title: fullTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    ...(company.legalName ? { legalName: company.legalName } : {}),
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon.svg"),
    slogan: company.tagline,
    ...(company.email ? { email: company.email } : {}),
    ...(company.phone ? { telephone: company.phone } : {}),
    ...(company.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: [company.address.line1, company.address.line2].filter(Boolean).join(", "),
            addressLocality: company.address.city,
            addressRegion: company.address.region,
            postalCode: company.address.postalCode,
            addressCountry: company.address.country,
          },
        }
      : {}),
    ...(company.social.length ? { sameAs: company.social.map((profile) => profile.href) } : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
