import { pageMetadata } from "@/lib/seo";
import { company } from "@/lib/config/company";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow, SectionHeading } from "@/components/ui/typography";
import { Pending } from "@/components/ui/pending";
import { MediaFrame } from "@/components/media/media-frame";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = pageMetadata({
  title: "About — Vision, Mission & Approach",
  description:
    "Simply Paper is a manufacturing-led B2B business making everyday paper, hygiene and packaging products, and developing practical alternatives through material innovation.",
  path: "/about",
});

const principles = [
  {
    title: "Core manufacturing first",
    detail:
      "Reliable, repeatable production of the everyday products businesses already rely on — paper bags, tissue, hygiene products, thermal rolls and kitchen rolls.",
  },
  {
    title: "Innovation in stages",
    detail:
      "Alternative materials are developed step by step: feasibility, prototypes, testing and pilot production before anything is offered for sale.",
  },
  {
    title: "Honest by default",
    detail:
      "We publish only what we can verify. Specifications, certifications and performance claims are shared once they have been confirmed.",
  },
  {
    title: "Improvement as a habit",
    detail:
      "Measuring output, defects, material use and delivery — and using what we learn, including customer feedback, to get better.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`About ${company.name}`}
        title="Better materials start with better making."
        lede={`${company.name} is a manufacturing-led B2B business producing everyday paper, hygiene and packaging products — while developing practical alternatives using new materials.`}
        visual={{ art: "about", artAlt: "Illustration of fanned sheets of paper in kraft, sage and white" }}
      />

      <Section aria-label="Vision and mission">
        <Container width="wide" className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line lg:grid-cols-2">
          <div className="bg-paper p-8 sm:p-12 lg:p-16">
            <Eyebrow>Vision</Eyebrow>
            <h2 className="display-md mt-8">
              Make better everyday materials and products accessible to businesses at scale.
            </h2>
          </div>
          <div className="bg-forest p-8 text-paper on-dark sm:p-12 lg:p-16">
            <Eyebrow>Mission</Eyebrow>
            <p className="display-md mt-8">
              Manufacture reliable paper, packaging and hygiene products while developing practical alternatives through
              material innovation and continuous process improvement.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="muted" aria-labelledby="challenge-title">
        <Container width="wide" className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="challenge-title"
              eyebrow="The larger challenge"
              title="Everyday products are used constantly. How they’re made matters."
              size="md"
            />
          </div>
          <div className="prose-body lede text-stone lg:col-span-6 lg:col-start-7">
            <p>
              Every hotel, restaurant, store, office and institution runs on consumables that are replenished constantly.
              Buyers need consistent quality, reliable supply, practical customisation and predictable procurement —
              and most of the time, they get only some of those.
            </p>
            <p>
              At the same time, businesses are looking for better materials. But alternatives only matter if they work:
              they need commercial feasibility, verified performance and a supply chain that can deliver them at volume.
            </p>
            <p className="text-charcoal">
              {company.name} exists to close that gap — combining repeatable core manufacturing with a staged, honest
              material innovation programme.
            </p>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="approach-title">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionHeading
                id="approach-title"
                eyebrow="A manufacturing-led approach"
                title="We start with the making — and build everything else on top."
              />
            </div>
            <div className="lg:col-span-5">
              <MediaFrame
                visual={{ art: "manufacturing", artAlt: "Illustration of a parent paper roll feeding sheets onto a stack" }}
                aspect="aspect-[16/10]"
                sizes="(min-width: 1024px) 38vw, 100vw"
              />
            </div>
          </div>
          <ul className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle, index) => (
              <li key={principle.title} className="border-t border-charcoal/20 pt-6">
                <span className="text-sm tabular-nums text-forest">0{index + 1}</span>
                <h3 className="mt-6 font-serif text-2xl leading-tight">{principle.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-stone">{principle.detail}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap gap-3">
            <Pending field="company story, founding team and history" source="src/app/about/page.tsx" />
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href="/manufacturing" arrow>
              Our manufacturing philosophy
            </ButtonLink>
            <ButtonLink href="/innovation" variant="secondary">
              Innovation pipeline
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Looking for a dependable supply partner?"
        lede="Tell us about your products, volumes and timelines."
        primary={{ label: "Request a Quote", href: "/contact?type=quote#enquiry" }}
        secondary={{ label: "Build With Us", href: "/build-with-us" }}
      />
    </>
  );
}
