import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { company, formatAddress } from "@/lib/config/company";
import { isEnquiryType, isProductInterest } from "@/lib/data/enquiry-options";
import { getIndustry } from "@/lib/data/industries";
import { getDeliveryStatus } from "@/lib/server/enquiry-delivery";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/typography";
import { Pending } from "@/components/ui/pending";
import { EnquiryForm } from "@/components/forms/enquiry-form";

export const metadata = pageMetadata({
  title: "Contact & Request a Quote",
  description:
    "Request a quote or send a B2B enquiry to Simply Paper for paper bags, tissue, hygiene products, thermal rolls, kitchen rolls, private label and custom manufacturing.",
  path: "/contact",
});

const nextSteps = [
  "We review your requirements and qualify the enquiry.",
  "We confirm specifications and feasibility with you.",
  "You receive a quotation for approval.",
];

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const params = await searchParams;
  const type = first(params.type);
  const product = first(params.product);
  const industry = getIndustry(first(params.industry) ?? "");

  const contactItems = [
    company.email && { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
    company.phone && { icon: Phone, label: "Phone", value: company.phone, href: `tel:${company.phone.replace(/\s+/g, "")}` },
    company.whatsapp && { icon: MessageCircle, label: "WhatsApp", value: "Message us on WhatsApp", href: `https://wa.me/${company.whatsapp}` },
    company.hours && { icon: Clock, label: "Hours", value: company.hours },
  ].filter((item) => Boolean(item)) as { icon: typeof Mail; label: string; value: string; href?: string }[];

  return (
    <section className="border-b border-line/70">
      <Container width="wide" className="grid gap-14 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-5">
          <Eyebrow className="rise-in mb-6">Contact</Eyebrow>
          <h1 className="display-xl rise-in [--delay:80ms]">Let’s talk about what you need.</h1>
          <p className="lede rise-in mt-7 text-stone [--delay:160ms]">
            Request a quote, discuss a custom or private-label product, or ask about our innovation pipeline. The more
            detail you share, the faster we can respond with something useful.
          </p>

          <h2 className="mt-12 text-xs font-medium uppercase tracking-[0.16em] text-stone">What happens next</h2>
          <ol className="mt-5 space-y-4">
            {nextSteps.map((step, index) => (
              <li key={step} className="flex gap-4 text-[0.95rem]">
                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-sage-soft text-xs font-medium text-forest">
                  {index + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>

          {(contactItems.length > 0 || company.address) && (
            <>
              <h2 className="mt-12 text-xs font-medium uppercase tracking-[0.16em] text-stone">Reach us directly</h2>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-center gap-4 py-4">
                    <Icon aria-hidden="true" className="size-4 text-forest" />
                    <span className="w-24 text-sm text-stone">{label}</span>
                    {href ? (
                      <a href={href} className="hover:text-forest" {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        {value}
                      </a>
                    ) : (
                      <span>{value}</span>
                    )}
                  </li>
                ))}
                {company.address && (
                  <li className="flex gap-4 py-4">
                    <MapPin aria-hidden="true" className="mt-1 size-4 text-forest" />
                    <span className="w-24 text-sm text-stone">Address</span>
                    <address className="not-italic">
                      {formatAddress(company.address).map((line) => (
                        <span key={line} className="block">{line}</span>
                      ))}
                    </address>
                  </li>
                )}
              </ul>
            </>
          )}
          <div className="mt-8 flex flex-col items-start gap-2">
            {!company.email && <Pending field="sales email" />}
            {!company.phone && <Pending field="phone number" />}
            {!company.whatsapp && <Pending field="WhatsApp number" />}
            {!company.address && <Pending field="address" />}
            {!company.hours && <Pending field="business hours" />}
          </div>
        </div>

        <div id="enquiry" className="scroll-mt-24 lg:col-span-7">
          <h2 className="sr-only">Enquiry form</h2>
          <EnquiryForm
            defaultType={isEnquiryType(type) ? type : undefined}
            defaultProduct={isProductInterest(product) ? product : undefined}
            defaultMessage={industry ? `Industry: ${industry.name}\n\n` : undefined}
            deliveryStatus={getDeliveryStatus()}
            directEmail={company.email}
          />
        </div>
      </Container>
    </section>
  );
}
