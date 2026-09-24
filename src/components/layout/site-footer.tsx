import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { company, formatAddress } from "@/lib/config/company";
import { quoteHref } from "@/lib/config/site";
import { products } from "@/lib/data/products";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Pending } from "@/components/ui/pending";
import { Logo } from "./logo";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Innovation", href: "/innovation" },
  { label: "Industries", href: "/industries" },
];

const partnerLinks = [
  { label: "Build With Us", href: "/build-with-us" },
  { label: "Private label", href: "/build-with-us#private-label" },
  { label: "Institutional supply", href: "/build-with-us#institutional-supply" },
  { label: "Contact", href: "/contact" },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-kraft">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-[0.95rem] text-paper/80 transition-colors hover:text-paper">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-forest-deep text-paper">
      <Container width="wide" className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm font-serif text-2xl leading-snug text-paper/90">{company.tagline}</p>
            <ButtonLink href={quoteHref} variant="light" arrow className="mt-8">
              Request a Quote
            </ButtonLink>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
            <FooterColumn
              title="Products"
              links={products.map((product) => ({ label: product.name, href: `/products/${product.slug}` }))}
            />
            <FooterColumn title="Company" links={companyLinks} />
            <FooterColumn title="Partner" links={partnerLinks} />
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-kraft">Contact</h2>
            <ul className="mt-5 space-y-4 text-[0.95rem] text-paper/85">
              {company.email ? (
                <li className="flex gap-3">
                  <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-kraft" />
                  <a href={`mailto:${company.email}`} className="hover:text-paper">
                    {company.email}
                  </a>
                </li>
              ) : (
                <li><Pending field="sales email" /></li>
              )}
              {company.phone ? (
                <li className="flex gap-3">
                  <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-kraft" />
                  <a href={`tel:${company.phone.replace(/\s+/g, "")}`} className="hover:text-paper">
                    {company.phone}
                  </a>
                </li>
              ) : (
                <li><Pending field="phone number" /></li>
              )}
              {company.address ? (
                <li className="flex gap-3">
                  <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-kraft" />
                  <address className="not-italic">
                    {formatAddress(company.address).map((line) => (
                      <span key={line} className="block">{line}</span>
                    ))}
                  </address>
                </li>
              ) : (
                <li><Pending field="registered address" /></li>
              )}
              <li>
                <Link href="/contact#enquiry" className="underline decoration-paper/30 underline-offset-4 hover:decoration-paper">
                  Send an enquiry
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/15 pt-8 text-sm text-paper/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName ?? company.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link href="/privacy" className="hover:text-paper">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-paper">Terms</Link></li>
            <li><Link href="/sitemap.xml" className="hover:text-paper" prefetch={false}>Sitemap</Link></li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
