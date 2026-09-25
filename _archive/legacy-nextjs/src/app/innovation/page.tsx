import { FlaskConical, Info } from "lucide-react";
import { innovations, innovationStatusLabel } from "@/lib/data/innovation";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow, SectionHeading } from "@/components/ui/typography";
import { StatusBadge } from "@/components/ui/status-badge";
import { MediaFrame } from "@/components/media/media-frame";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  title: "Innovation — Future Material Developments",
  description:
    "Simply Paper’s material innovation pipeline: biodegradable cutlery, bagasse tableware, edible cutlery and paddy husk products. All are under development — express your interest.",
  path: "/innovation",
});

const stages = [
  { title: "Feasibility", detail: "Is the material practical to source, process and produce consistently?" },
  { title: "Prototype", detail: "Early formats made and assessed against real use." },
  { title: "Testing", detail: "Performance, safety and any environmental claims tested and certified." },
  { title: "Pilot production", detail: "Small runs to prove repeatability and cost." },
  { title: "Launch approval", detail: "Separate technical, regulatory and commercial sign-off." },
];

export default function InnovationPage() {
  return (
    <>
      <PageHero
        eyebrow="Innovation"
        title="What we’re building next."
        lede="Alongside our core manufacturing, we are developing everyday products from alternative materials. Each one is a future development — shared here so partners can follow along and get involved early."
      >
        <p className="rise-in mt-10 flex max-w-2xl gap-3 rounded-xl border border-line bg-paper-2 p-4 text-sm leading-relaxed text-charcoal/85 [--delay:260ms]">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-forest" />
          <span>
            <strong className="font-medium">All four products are under development</strong> and are not available to
            order. Applications listed are proposed, and no environmental or food-safety claims are made until testing and
            certification are complete.
          </span>
        </p>
      </PageHero>

      <nav aria-label="Innovation products" className="border-b border-line/70">
        <Container width="wide">
          <ul className="flex gap-6 overflow-x-auto py-4 text-sm text-stone">
            {innovations.map((item) => (
              <li key={item.slug} className="shrink-0">
                <a href={`#${item.slug}`} className="hover:text-forest">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {innovations.map((item, index) => (
        <Section key={item.slug} id={item.slug} tone={index % 2 ? "muted" : "paper"} aria-labelledby={`${item.slug}-title`}>
          <Container width="wide" className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className={cn("lg:col-span-6", index % 2 === 1 && "lg:order-2")}>
              <MediaFrame visual={item.visual} aspect="aspect-[5/4]" sizes="(min-width: 1024px) 45vw, 100vw">
                <StatusBadge label={innovationStatusLabel[item.status]} className="absolute left-5 top-5" />
              </MediaFrame>
            </div>
            <div className="lg:col-span-6">
              <Eyebrow className="mb-5">{`Development 0${index + 1}`}</Eyebrow>
              <h2 id={`${item.slug}-title`} className="display-lg">
                {item.name}
              </h2>
              <p className="mt-4 text-sm font-medium uppercase tracking-[0.14em] text-[#8A5A12]">
                Status: {innovationStatusLabel[item.status]}
              </p>
              <p className="lede mt-6 text-stone">{item.description}</p>

              <h3 className="mt-10 text-xs font-medium uppercase tracking-[0.16em] text-stone">Proposed applications</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {item.proposedApplications.map((application) => (
                  <li key={application} className="rounded-full border border-charcoal/20 px-3.5 py-1.5 text-sm">
                    {application}
                  </li>
                ))}
              </ul>

              <p className="mt-8 flex gap-3 text-sm leading-relaxed text-charcoal/85">
                <FlaskConical aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-forest" />
                {item.validation}
              </p>

              <ButtonLink href={`/contact?type=innovation-interest&product=${item.slug}#enquiry`} arrow className="mt-10">
                Express interest
              </ButtonLink>
            </div>
          </Container>
        </Section>
      ))}

      <Section tone="sage" aria-labelledby="stages-title">
        <Container width="wide">
          <SectionHeading
            id="stages-title"
            eyebrow="How innovation moves forward"
            title="Stage-gated, tested, then launched."
            lede="No product moves from our pipeline into our catalogue without passing each stage — and without separate technical, regulatory and commercial approval."
          />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-5">
            {stages.map((stage, index) => (
              <li key={stage.title} className="bg-sage-soft p-7">
                <span className="text-sm tabular-nums text-forest">0{index + 1}</span>
                <h3 className="mt-8 font-serif text-2xl">{stage.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/80">{stage.detail}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Sustainable product development"
        title="Developing a material or product? Let’s explore it together."
        lede="We work with partners on feasibility, prototyping and pilot production for alternative-material products."
        primary={{ label: "Propose a partnership", href: "/contact?type=product-development#enquiry" }}
        secondary={{ label: "Build With Us", href: "/build-with-us#product-development" }}
      />
    </>
  );
}
