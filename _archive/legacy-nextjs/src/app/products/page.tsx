import { pageMetadata } from "@/lib/seo";
import { quoteHref } from "@/lib/config/site";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Catalogue } from "@/components/products/catalogue";

export const metadata = pageMetadata({
  title: "Products — Paper Bags, Tissue, Hygiene, Thermal & Kitchen Rolls",
  description:
    "Browse Simply Paper’s five core product categories: paper bags, tissue products, hygiene products, thermal rolls and kitchen rolls. Bulk, custom and private-label B2B supply.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Everyday products, made for business."
        lede="Five core manufacturing categories for retail, hospitality, food service, institutions and more. Every order is specified, quoted and confirmed with you before production."
        actions={
          <>
            <ButtonLink href={quoteHref} arrow>
              Request a Quote
            </ButtonLink>
            <ButtonLink href="/build-with-us#custom-manufacturing" variant="secondary">
              Custom manufacturing
            </ButtonLink>
          </>
        }
      />
      <Section spacing="compact" aria-label="Product catalogue">
        <Container width="wide">
          <Catalogue />
        </Container>
      </Section>
      <CtaBand
        eyebrow="Not sure what you need?"
        title="Tell us how you use it. We’ll help specify the right product."
        primary={{ label: "Start an enquiry", href: "/contact#enquiry" }}
        secondary={{ label: "See our innovation pipeline", href: "/innovation" }}
      />
    </>
  );
}
