import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/lib/data/products";
import { innovations } from "@/lib/data/innovation";
import { industries } from "@/lib/data/industries";
import { services } from "@/lib/data/services";
import { quoteHref } from "@/lib/config/site";
import { organizationJsonLd, pageMetadata } from "@/lib/seo";
import { company } from "@/lib/config/company";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow, SectionHeading } from "@/components/ui/typography";
import { MediaFrame } from "@/components/media/media-frame";
import { ProductCard } from "@/components/sections/product-card";
import { InnovationCard } from "@/components/sections/innovation-card";
import { PhilosophySteps } from "@/components/sections/philosophy-steps";
import { IndustryIcon } from "@/components/sections/industry-icon";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata = pageMetadata({
  title: `${company.name} — ${company.tagline}`,
  absoluteTitle: true,
  description:
    "A manufacturing-led approach to paper, hygiene, packaging and the next generation of everyday essentials. Paper bags, tissue, hygiene products, thermal rolls and kitchen rolls for B2B supply.",
  path: "/",
});

const pillars = [
  {
    title: "Manufacturing",
    detail: "A manufacturing-led business: specifications, quality and supply are planned from production outwards.",
  },
  {
    title: "Material Innovation",
    detail: "A staged programme developing practical alternatives, with testing before any claim is made.",
  },
  {
    title: "Consistency",
    detail: "Approved specifications and inspection, so every repeat order matches the one before it.",
  },
  {
    title: "B2B Scale",
    detail: "Built for bulk, recurring supply — and for expanding capacity as our customers’ demand grows.",
  },
];

const answerAreas = ["Packaging", "Hygiene", "Food service", "Everyday consumption"];

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />

      {/* 1 — Hero */}
      <section className="relative overflow-hidden">
        <Container width="wide" className="grid gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-24 lg:pt-20">
          <div className="lg:col-span-6 xl:col-span-6">
            <Eyebrow className="rise-in mb-7">Paper · Hygiene · Packaging</Eyebrow>
            <h1 className="display-xl rise-in [--delay:80ms]">
              Better Materials.
              <span className="block text-forest">Better Everyday Products.</span>
            </h1>
            <p className="lede rise-in mt-8 max-w-xl text-stone [--delay:160ms]">
              A manufacturing-led approach to paper, hygiene, packaging and the next generation of everyday essentials.
            </p>
            <div className="rise-in mt-10 flex flex-wrap gap-3 [--delay:240ms]">
              <ButtonLink href="/products" arrow>
                Explore Products
              </ButtonLink>
              <ButtonLink href="/build-with-us" variant="secondary">
                Build With Us
              </ButtonLink>
            </div>
          </div>
          <div className="rise-in lg:col-span-6 [--delay:200ms]">
            <MediaFrame
              visual={{ art: "hero", artAlt: "Illustration of a kraft paper bag, a kitchen roll and a tissue box" }}
              aspect="aspect-[1/1] sm:aspect-[5/4] lg:aspect-[1/1]"
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
            />
          </div>
        </Container>
        <div className="border-y border-line/80">
          <Container width="wide">
            <ul className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-5 text-sm text-stone">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link href={`/products/${product.slug}`} className="transition-colors hover:text-forest">
                    <span className="mr-2 tabular-nums text-forest">{product.index}</span>
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </section>

      {/* 2 — The Challenge */}
      <Section tone="muted" aria-labelledby="challenge-title">
        <Container width="wide" className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Eyebrow>The Challenge</Eyebrow>
          </div>
          <h2 id="challenge-title" className="display-lg lg:col-span-9">
            The world doesn’t need more products.{" "}
            <span className="text-forest">It needs better materials and better ways of making everyday products.</span>
          </h2>
        </Container>
      </Section>

      {/* 3 — Our Answer */}
      <Section aria-labelledby="answer-title">
        <Container width="wide" className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="answer-title"
              eyebrow="Our Answer"
              size="md"
              title="A manufacturing-led platform creating practical alternatives across packaging, hygiene, food service and everyday consumption."
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="lede text-stone">
              Businesses depend on everyday consumables that are replenished constantly. They need consistent quality,
              reliable supply, practical customisation and predictable procurement. We start there — with dependable
              core manufacturing — and build a staged material innovation programme on top of it.
            </p>
            <ul className="mt-10 grid grid-cols-2 border-t border-line">
              {answerAreas.map((area, index) => (
                <li
                  key={area}
                  className="flex items-baseline gap-3 border-b border-line py-5 odd:pr-4 even:border-l even:pl-5"
                >
                  <span className="text-xs tabular-nums text-forest">0{index + 1}</span>
                  <span className="font-serif text-xl">{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* 4 — What We Manufacture */}
      <Section tone="muted" aria-labelledby="manufacture-title" className="overflow-hidden">
        <Container width="wide">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="manufacture-title"
              eyebrow="What We Manufacture"
              title="Five core categories, made for recurring B2B demand."
            />
            <ButtonLink href="/products" variant="secondary" arrow className="self-start lg:self-auto">
              View all products
            </ButtonLink>
          </div>
          <ul className="-mx-4 mt-14 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 xl:grid-cols-5">
            {products.map((product) => (
              <li key={product.slug} className="w-[78%] shrink-0 snap-start sm:w-auto">
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 5 — What We're Building */}
      <Section tone="sage" aria-labelledby="building-title">
        <Container width="wide">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionHeading
                id="building-title"
                eyebrow="What We’re Building"
                title="The next generation of everyday essentials."
              />
            </div>
            <p className="text-[0.95rem] leading-relaxed text-charcoal/80 lg:col-span-4 lg:col-start-9">
              These products are in development and are not yet available to order. Each one moves forward only after
              feasibility, testing and approval.
            </p>
          </div>
          <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {innovations.map((item) => (
              <li key={item.slug}>
                <InnovationCard item={item} />
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <ButtonLink href="/innovation" variant="secondary" arrow>
              Explore our innovation pipeline
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* 6 — Why Simply Paper */}
      <Section aria-labelledby="why-title">
        <Container width="wide">
          <SectionHeading
            id="why-title"
            eyebrow={`Why ${company.name}`}
            title={
              <>
                Manufacturing <span className="text-forest">+</span> Material Innovation{" "}
                <span className="text-forest">+</span> Consistency <span className="text-forest">+</span> B2B Scale
              </>
            }
            className="max-w-5xl"
          />
          <ul className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, index) => (
              <li key={pillar.title} className="border-t border-charcoal/20 pt-6">
                <span className="text-sm tabular-nums text-forest">0{index + 1}</span>
                <h3 className="mt-6 font-serif text-[1.65rem] leading-tight">{pillar.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-stone">{pillar.detail}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 7 — Manufacturing Philosophy */}
      <Section tone="forest" aria-labelledby="philosophy-title" className="paper-grain">
        <Container width="wide">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionHeading
                id="philosophy-title"
                eyebrow="Manufacturing Philosophy"
                title="Make → Measure → Improve → Scale"
              />
            </div>
            <p className="text-[0.95rem] leading-relaxed text-paper/80 lg:col-span-4 lg:col-start-9">
              A simple discipline behind every product we make: document it, measure it, improve it, and only then scale
              it.
            </p>
          </div>
          <div className="mt-14">
            <PhilosophySteps tone="dark" />
          </div>
          <ButtonLink href="/manufacturing" variant="outline-light" arrow className="mt-12">
            How we manufacture
          </ButtonLink>
        </Container>
      </Section>

      {/* 8 — Industries We Serve */}
      <Section aria-labelledby="industries-title">
        <Container width="wide">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading id="industries-title" eyebrow="Industries We Serve" title="Everyday essentials for eight sectors." />
            <ButtonLink href="/industries" variant="secondary" arrow className="self-start lg:self-auto">
              Explore industries
            </ButtonLink>
          </div>
          <ul className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line min-[440px]:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => (
              <li key={industry.slug} className="group relative bg-paper p-6 transition-colors duration-300 hover:bg-paper-2 sm:p-7">
                <IndustryIcon icon={industry.icon} className="size-7 text-forest" />
                <h3 className="mt-10 font-serif text-2xl">
                  <Link href={`/industries#${industry.slug}`} className="after:absolute after:inset-0 after:content-['']">
                    {industry.name}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{industry.summary}</p>
                <ArrowUpRight
                  aria-hidden="true"
                  className="absolute right-6 top-6 size-4 text-charcoal/30 transition-colors group-hover:text-forest"
                />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 9 — Build With Us */}
      <Section tone="kraft" aria-labelledby="build-title">
        <Container width="wide" className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              id="build-title"
              eyebrow="Build With Us"
              size="md"
              title="Work directly with a manufacturing-led team."
              lede="Five ways to work with Simply Paper — each starts with a conversation about your requirements."
            />
            <ButtonLink href="/build-with-us" arrow className="mt-10">
              Partnership options
            </ButtonLink>
          </div>
          <ul className="border-t border-charcoal/20 lg:col-span-7 lg:col-start-6">
            {services.map((service) => (
              <li key={service.slug} className="group relative border-b border-charcoal/20">
                <div className="flex items-center gap-5 py-6 sm:gap-8">
                  <span className="w-8 text-sm tabular-nums text-forest">{service.index}</span>
                  <div className="flex-1">
                    <h3 className="font-serif text-[1.55rem] leading-tight sm:text-3xl">
                      <Link
                        href={`/build-with-us#${service.slug}`}
                        className="after:absolute after:inset-0 after:content-['']"
                      >
                        {service.title}
                      </Link>
                    </h3>
                    <p className="mt-1.5 text-[0.95rem] text-charcoal/75">{service.summary}</p>
                  </div>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-5 shrink-0 text-charcoal/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-forest"
                  />
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 10 — Final CTA */}
      <CtaBand
        title="Tell us what your business needs. We’ll tell you how we can make it."
        lede="Share your products, quantities and timelines, and our team will follow up with next steps."
        primary={{ label: "Request a Quote", href: quoteHref }}
        secondary={{ label: "Explore Products", href: "/products" }}
      />
    </>
  );
}
