import { Check } from "lucide-react";
import { services } from "@/lib/data/services";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/typography";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = pageMetadata({
  title: "Build With Us — Custom Manufacturing, Private Label & Bulk Supply",
  description:
    "Partner with Simply Paper for custom manufacturing, private label, institutional supply, bulk B2B supply and sustainable product development.",
  path: "/build-with-us",
});

const steps = [
  { title: "Tell us what you need", detail: "Products, quantities, locations and timelines." },
  { title: "Specification and feasibility", detail: "We review requirements and confirm what’s possible." },
  { title: "Quotation and sign-off", detail: "Pricing, artwork, specification and schedule agreed in writing." },
  { title: "Production and supply", detail: "Manufactured, inspected and dispatched — then repeated." },
];

export default function BuildWithUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Build With Us"
        title="Your products. Our manufacturing."
        lede="Whether you need a custom format, a private-label range, a recurring institutional contract or a partner to develop something new — every engagement starts with understanding your requirements."
        actions={
          <>
            <ButtonLink href="#custom-manufacturing" arrow>
              See partnership options
            </ButtonLink>
            <ButtonLink href="/contact?type=bulk-b2b#enquiry" variant="secondary">
              Talk to our team
            </ButtonLink>
          </>
        }
      />

      <Section spacing="compact" aria-label="Partnership options">
        <Container width="wide" className="space-y-5">
          {services.map((service) => (
            <article
              key={service.slug}
              id={service.slug}
              aria-labelledby={`${service.slug}-title`}
              className="grid gap-8 rounded-[var(--radius-card)] border border-line bg-paper p-7 transition-colors duration-300 hover:border-forest/30 sm:p-10 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-5">
                <span className="text-sm tabular-nums text-forest">{service.index}</span>
                <h2 id={`${service.slug}-title`} className="display-md mt-4">
                  {service.title}
                </h2>
                <p className="mt-4 text-[1.05rem] leading-relaxed">{service.summary}</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-stone">{service.audience}</p>
              </div>
              <div className="flex flex-col justify-between gap-8 lg:col-span-6 lg:col-start-7">
                <ul className="divide-y divide-line border-y border-line">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-4 py-4 text-[0.95rem]">
                      <Check aria-hidden="true" className="size-4 shrink-0 text-forest" />
                      {point}
                    </li>
                  ))}
                </ul>
                <ButtonLink href={`/contact?type=${service.enquiryType}#enquiry`} arrow className="self-start">
                  {service.cta}
                </ButtonLink>
              </div>
            </article>
          ))}
        </Container>
      </Section>

      <Section tone="muted" aria-labelledby="how-title">
        <Container width="wide">
          <SectionHeading id="how-title" eyebrow="How it works" title="Four steps to a dependable partnership." />
          <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t border-charcoal/20 pt-6">
                <span className="text-sm tabular-nums text-forest">0{index + 1}</span>
                <h3 className="mt-6 font-serif text-2xl leading-tight">{step.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-stone">{step.detail}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <CtaBand
        title="Ready to build something with us?"
        lede="Choose the enquiry type that fits and we’ll route it to the right team."
        primary={{ label: "Start an enquiry", href: "/contact#enquiry" }}
        secondary={{ label: "Explore Products", href: "/products" }}
      />
    </>
  );
}
