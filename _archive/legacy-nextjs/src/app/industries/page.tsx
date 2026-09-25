import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import { industries } from "@/lib/data/industries";
import { getProducts } from "@/lib/data/products";
import { getInnovation } from "@/lib/data/innovation";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { ProductArt } from "@/components/media/product-art";
import { IndustryIcon } from "@/components/sections/industry-icon";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  title: "Industries — Retail, Hospitality, Food Service & More",
  description:
    "Simply Paper supplies paper, packaging and hygiene products to retail, hospitality, restaurants, food service, healthcare, textile, e-commerce and institutions.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Made for the businesses that keep everyday life running."
        lede="Eight sectors, each with its own rhythm of demand. Find the products that fit yours, then tell us how you use them."
      />

      <nav aria-label="Industries" className="sticky top-[4.5rem] z-30 border-b border-line/70 bg-paper/90 backdrop-blur">
        <Container width="wide">
          <ul className="flex gap-2 overflow-x-auto py-3">
            {industries.map((industry) => (
              <li key={industry.slug} className="shrink-0">
                <a
                  href={`#${industry.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 px-3.5 py-1.5 text-sm transition-colors hover:border-forest hover:text-forest"
                >
                  <IndustryIcon icon={industry.icon} className="size-4" />
                  {industry.name}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <div>
        {industries.map((industry, index) => {
          const related = getProducts(industry.products);
          const future = industry.futureProducts.map(getInnovation).filter((item) => item !== undefined);
          return (
            <section
              key={industry.slug}
              id={industry.slug}
              aria-labelledby={`${industry.slug}-title`}
              className={cn("scroll-mt-36 border-b border-line/70 py-16 sm:py-20", index % 2 ? "bg-paper-2" : "bg-paper")}
            >
              <Container width="wide" className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex size-12 items-center justify-center rounded-full bg-sage-soft text-forest">
                      <IndustryIcon icon={industry.icon} className="size-6" />
                    </span>
                    <span className="text-sm tabular-nums text-stone">{String(index + 1).padStart(2, "0")} / 08</span>
                  </div>
                  <h2 id={`${industry.slug}-title`} className="display-md mt-8">
                    {industry.name}
                  </h2>
                  <p className="lede mt-4 text-stone">{industry.summary}</p>
                  <ul className="mt-8 space-y-2.5 text-[0.95rem]">
                    {industry.needs.map((need) => (
                      <li key={need} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-forest" />
                        {need}
                      </li>
                    ))}
                  </ul>
                  {industry.note && (
                    <p className="mt-6 flex gap-3 text-sm leading-relaxed text-charcoal/80">
                      <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-forest" />
                      {industry.note}
                    </p>
                  )}
                  <ButtonLink
                    href={`/contact?type=quote&industry=${industry.slug}#enquiry`}
                    arrow
                    className="mt-10"
                  >
                    {`Enquire for ${industry.name.toLowerCase()}`}
                  </ButtonLink>
                </div>

                <div className="lg:col-span-6 lg:col-start-7">
                  <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-stone">Relevant products</h3>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {related.map((product) => (
                      <li key={product.slug} className="group relative flex items-center gap-4 rounded-2xl border border-line bg-paper p-3 transition-colors hover:border-forest/40">
                        <ProductArt art={product.visual.art} alt="" className="size-16 shrink-0 rounded-xl" />
                        <Link href={`/products/${product.slug}`} className="flex-1 font-medium after:absolute after:inset-0 after:content-['']">
                          {product.name}
                        </Link>
                        <ArrowUpRight aria-hidden="true" className="mr-2 size-4 text-charcoal/40 group-hover:text-forest" />
                      </li>
                    ))}
                  </ul>
                  {future.length > 0 && (
                    <>
                      <h3 className="mt-10 text-xs font-medium uppercase tracking-[0.16em] text-stone">
                        In our innovation pipeline
                      </h3>
                      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                        {future.map((item) => (
                          <li key={item.slug} className="group relative flex items-center gap-4 rounded-2xl border border-dashed border-charcoal/25 p-3">
                            <ProductArt art={item.visual.art} alt="" className="size-16 shrink-0 rounded-xl opacity-90" />
                            <div className="flex-1">
                              <Link href={`/innovation#${item.slug}`} className="font-medium after:absolute after:inset-0 after:content-['']">
                                {item.name}
                              </Link>
                              <StatusBadge variant="inline" className="mt-1.5 flex" />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      <CtaBand
        eyebrow="Your sector isn’t listed?"
        title="If your business uses everyday paper and hygiene products, let’s talk."
        primary={{ label: "Start an enquiry", href: "/contact#enquiry" }}
        secondary={{ label: "Explore Products", href: "/products" }}
      />
    </>
  );
}
