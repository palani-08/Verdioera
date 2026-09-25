import { Boxes, ClipboardCheck, Layers, Truck } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { company, showContentPlaceholders } from "@/lib/config/company";
import { quoteHref } from "@/lib/config/site";
import { products } from "@/lib/data/products";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow, SectionHeading } from "@/components/ui/typography";
import { Pending } from "@/components/ui/pending";
import { PageHero } from "@/components/sections/page-hero";
import { PhilosophySteps } from "@/components/sections/philosophy-steps";
import { CtaBand } from "@/components/sections/cta-band";
import { ButtonLink } from "@/components/ui/button";

export const metadata = pageMetadata({
  title: "Manufacturing — Make, Measure, Improve, Scale",
  description:
    "How Simply Paper manufactures: a Make → Measure → Improve → Scale philosophy, documented specifications, quality consistency, customisation and dependable B2B supply.",
  path: "/manufacturing",
});

const capabilities = [
  {
    icon: Layers,
    title: "Five core categories",
    detail: `Manufacturing across ${products.map((product) => product.name.toLowerCase()).join(", ").replace(/, ([^,]*)$/, " and $1")}.`,
  },
  {
    icon: ClipboardCheck,
    title: "Quality consistency",
    detail:
      "Approved specifications, inspection before dispatch and corrective action when something falls short — so repeat orders match the original.",
  },
  {
    icon: Boxes,
    title: "Customisation",
    detail:
      "Products made to agreed dimensions, materials and packaging, including private label, with written sign-off before production.",
  },
  {
    icon: Truck,
    title: "B2B supply",
    detail:
      "Bulk and recurring supply planned around your consumption, from single-site buyers to institutional contracts.",
  },
];

const orderProcess = [
  "Enquiry",
  "Requirement qualification",
  "Specification and feasibility review",
  "Quotation",
  "Customer approval",
  "Production planning",
  "Manufacturing and quality inspection",
  "Dispatch and delivery",
  "Feedback and repeat order",
];

export default function ManufacturingPage() {
  const { manufacturing } = company;
  const facts = [
    { label: "Manufacturing model", value: manufacturing.model },
    { label: "Operating locations", value: manufacturing.locations.length ? manufacturing.locations.join(" · ") : null },
    { label: "Production capacity", value: manufacturing.capacityStatement },
    { label: "Quality process", value: manufacturing.qualityProcess },
    {
      label: "Certifications",
      value: manufacturing.certifications.length
        ? manufacturing.certifications.map((cert) => (cert.scope ? `${cert.name} (${cert.scope})` : cert.name)).join(" · ")
        : null,
    },
  ];
  const confirmedFacts = facts.filter((fact) => fact.value);

  return (
    <>
      <PageHero
        eyebrow="Manufacturing"
        title="Consistency is made, not promised."
        lede="Our manufacturing philosophy is simple: document how a product is made, measure how well it’s made, improve it continuously, and scale only what’s proven."
        visual={{ art: "manufacturing", artAlt: "Illustration of a parent paper roll feeding sheets onto a stack" }}
      />

      <Section tone="forest" aria-labelledby="philosophy-title" className="paper-grain">
        <Container width="wide">
          <SectionHeading
            id="philosophy-title"
            eyebrow="Our philosophy"
            title="Make → Measure → Improve → Scale"
            lede="Four steps that apply to every product line — from a paper bag to a material still in development."
          />
          <div className="mt-14">
            <PhilosophySteps tone="dark" />
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="capabilities-title">
        <Container width="wide">
          <SectionHeading id="capabilities-title" eyebrow="Capabilities" title="What that means for your supply." />
          <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map(({ icon: Icon, title, detail }) => (
              <li key={title} className="border-t border-charcoal/20 pt-6">
                <Icon aria-hidden="true" strokeWidth={1.5} className="size-7 text-forest" />
                <h3 className="mt-8 font-serif text-2xl">{title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-stone">{detail}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="muted" aria-labelledby="facility-title">
        <Container width="wide" className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="facility-title" eyebrow="Facility" size="md" title="Facility and quality details" />
            <p className="mt-6 text-[0.95rem] leading-relaxed text-stone">
              We publish facility, capacity and certification details only once they are confirmed. Qualified buyers can
              request current information as part of the quotation process.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {confirmedFacts.length > 0 || showContentPlaceholders ? (
              <dl className="divide-y divide-line border-y border-line">
                {facts.map((fact) =>
                  fact.value ? (
                    <div key={fact.label} className="grid gap-1 py-5 sm:grid-cols-3 sm:gap-6">
                      <dt className="text-sm text-stone">{fact.label}</dt>
                      <dd className="sm:col-span-2">{fact.value}</dd>
                    </div>
                  ) : showContentPlaceholders ? (
                    <div key={fact.label} className="grid gap-1 py-5 sm:grid-cols-3 sm:gap-6">
                      <dt className="text-sm text-stone">{fact.label}</dt>
                      <dd className="sm:col-span-2">
                        <Pending field={fact.label.toLowerCase()} source="company.manufacturing" />
                      </dd>
                    </div>
                  ) : null,
                )}
              </dl>
            ) : (
              <div className="rounded-[var(--radius-card)] border border-line bg-paper p-8">
                <p className="font-serif text-2xl leading-snug">Need facility or compliance documentation?</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-stone">
                  Tell us what your procurement process requires and we’ll share what applies to your order.
                </p>
                <ButtonLink href="/contact?type=general#enquiry" variant="secondary" arrow className="mt-6">
                  Request information
                </ButtonLink>
              </div>
            )}
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="process-title">
        <Container width="wide" className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-5">From enquiry to repeat order</Eyebrow>
            <h2 id="process-title" className="display-md">
              A clear path from first conversation to dependable supply.
            </h2>
            <p className="mt-6 text-[0.95rem] leading-relaxed text-stone">
              Custom orders are formally signed off on artwork, specification, pricing, quantity and schedule before
              production begins.
            </p>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-3 lg:col-span-8">
            {orderProcess.map((step, index) => (
              <li key={step} className="flex min-h-36 flex-col justify-between bg-paper p-6">
                <span className="text-sm tabular-nums text-forest">{String(index + 1).padStart(2, "0")}</span>
                <span className="mt-6 font-serif text-xl leading-snug">{step}</span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <CtaBand
        title="Put our manufacturing to work for your business."
        primary={{ label: "Request a Quote", href: quoteHref }}
        secondary={{ label: "Custom manufacturing", href: "/contact?type=custom-manufacturing#enquiry" }}
      />
    </>
  );
}
