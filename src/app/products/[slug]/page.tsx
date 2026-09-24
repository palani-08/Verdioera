import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, Info } from "lucide-react";
import { getProduct, products } from "@/lib/data/products";
import { getIndustry } from "@/lib/data/industries";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow, SectionHeading } from "@/components/ui/typography";
import { Pending } from "@/components/ui/pending";
import { MediaFrame } from "@/components/media/media-frame";
import { ProductCard } from "@/components/sections/product-card";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return pageMetadata({ title: product.seo.title, description: product.seo.description, path: `/products/${product.slug}` });
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const quoteLink = `/contact?type=quote&product=${product.slug}#enquiry`;
  const related = products.filter((item) => item.slug !== product.slug).slice(0, 4);
  const productIndustries = product.industries.map(getIndustry).filter((industry) => industry !== undefined);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: product.name, path: `/products/${product.slug}` },
        ])}
      />

      <section className="border-b border-line/70">
        <Container width="wide" className="pt-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-stone">
              <li><Link href="/" className="hover:text-forest">Home</Link></li>
              <li aria-hidden="true"><ChevronRight className="size-3.5" /></li>
              <li><Link href="/products" className="hover:text-forest">Products</Link></li>
              <li aria-hidden="true"><ChevronRight className="size-3.5" /></li>
              <li aria-current="page" className="text-charcoal">{product.name}</li>
            </ol>
          </nav>
        </Container>
        <Container width="wide" className="grid gap-12 py-12 lg:grid-cols-12 lg:items-center lg:py-16">
          <div className="lg:col-span-5">
            <Eyebrow className="rise-in mb-6">Product {product.index} / 05</Eyebrow>
            <h1 className="display-xl rise-in [--delay:80ms]">{product.name}</h1>
            <p className="lede rise-in mt-7 text-stone [--delay:160ms]">{product.summary}</p>
            <div className="rise-in mt-10 flex flex-wrap gap-3 [--delay:240ms]">
              <ButtonLink href={quoteLink} arrow>
                Request a quote
              </ButtonLink>
              <ButtonLink href={`/contact?type=private-label&product=${product.slug}#enquiry`} variant="secondary">
                Private label enquiry
              </ButtonLink>
            </div>
          </div>
          <div className="rise-in lg:col-span-7 [--delay:200ms]">
            <MediaFrame visual={product.visual} aspect="aspect-[4/3]" priority sizes="(min-width: 1024px) 55vw, 100vw" />
          </div>
        </Container>
      </section>

      {/* Overview */}
      <Section aria-labelledby="overview-title">
        <Container width="wide" className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Overview</Eyebrow>
            <h2 id="overview-title" className="sr-only">Overview</h2>
          </div>
          <div className="prose-body lg:col-span-7 lg:col-start-6">
            {product.overview.map((paragraph, index) => (
              <p key={index} className={index === 0 ? "font-serif text-[1.6rem] leading-snug sm:text-3xl" : "lede text-stone"}>
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      {/* Applications */}
      <Section tone="muted" aria-labelledby="applications-title">
        <Container width="wide">
          <SectionHeading id="applications-title" eyebrow="Applications" size="md" title={`Where ${product.name.toLowerCase()} are used`} />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {product.applications.map((application) => (
              <li key={application.title} className="bg-paper p-7">
                <h3 className="font-serif text-xl">{application.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{application.detail}</p>
              </li>
            ))}
          </ul>
          {productIndustries.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center gap-2">
              <span className="mr-2 text-sm text-stone">Industries:</span>
              {productIndustries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/industries#${industry.slug}`}
                  className="rounded-full border border-charcoal/20 px-3.5 py-1.5 text-sm transition-colors hover:border-forest hover:text-forest"
                >
                  {industry.name}
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* Specifications + customisation */}
      <Section aria-labelledby="specs-title">
        <Container width="wide" className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading id="specs-title" eyebrow="Specifications" size="md" title="Specified for your order" />
            {product.specifications.length > 0 ? (
              <dl className="mt-10 divide-y divide-line border-y border-line">
                {product.specifications.map((spec) => (
                  <div key={spec.label} className="grid grid-cols-2 gap-4 py-4 text-[0.95rem]">
                    <dt className="text-stone">{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <>
                <p className="mt-6 text-[0.95rem] leading-relaxed text-stone">
                  We confirm the following for every order during specification review. Verified specifications are
                  shared with your quotation.
                </p>
                <ul className="mt-8 divide-y divide-line border-y border-line">
                  {product.specParameters.map((parameter) => (
                    <li key={parameter} className="flex items-center justify-between gap-4 py-4 text-[0.95rem]">
                      <span>{parameter}</span>
                      <span className="text-sm text-stone">Confirmed at quotation</span>
                    </li>
                  ))}
                </ul>
                <Pending field="verified specifications" source="src/lib/data/products.ts" className="mt-4" />
              </>
            )}
          </div>

          <div>
            <SectionHeading eyebrow="Customisation" size="md" title="Made around your requirements" />
            <ul className="mt-10 space-y-6">
              {product.customisation.map((option) => (
                <li key={option.title} className="flex gap-4">
                  <span className="mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-sage-soft text-forest">
                    <Check aria-hidden="true" className="size-3.5" />
                  </span>
                  <div>
                    <h3 className="font-medium">{option.title}</h3>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-stone">{option.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-stone">
              Availability of each option is confirmed during feasibility review. Custom orders are signed off on
              artwork, specification, pricing, quantity and schedule before production.
            </p>
            {product.complianceNote && (
              <p className="mt-6 flex gap-3 rounded-xl border border-line bg-paper-2 p-4 text-sm leading-relaxed text-charcoal/85">
                <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-forest" />
                {product.complianceNote}
              </p>
            )}
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow={`${product.name} enquiry`}
        title={`Request a quote for ${product.name.toLowerCase()}.`}
        lede="Share your application, preferred specifications and expected quantities. We’ll review feasibility and come back with a quotation."
        primary={{ label: "Request a quote", href: quoteLink }}
        secondary={{ label: "Custom manufacturing", href: `/contact?type=custom-manufacturing&product=${product.slug}#enquiry` }}
      />

      {/* Related */}
      <Section tone="muted" aria-labelledby="related-title">
        <Container width="wide">
          <SectionHeading id="related-title" eyebrow="More from Simply Paper" size="md" title="Other core products" />
          <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <li key={item.slug}>
                <ProductCard product={item} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
