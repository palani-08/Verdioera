import type { ReactNode } from "react";
import { company } from "@/lib/config/company";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/typography";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <Container width="narrow" className="py-16 sm:py-24">
        <Eyebrow className="mb-6">Legal</Eyebrow>
        <h1 className="display-lg">{title}</h1>
        <p className="mt-4 text-sm text-stone">Last updated {company.legal.lastUpdated}</p>
        {!company.legal.reviewed && (
          <p className="mt-8 rounded-xl border border-line bg-paper-2 p-4 text-sm leading-relaxed text-charcoal/85">
            This page is being finalised and may be updated before our full launch. If you have questions in the
            meantime, please contact us through our enquiry form.
          </p>
        )}
        <div className="mt-12 space-y-10 text-[1rem] leading-relaxed text-charcoal/90 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-charcoal [&_li]:ml-5 [&_li]:list-disc [&_p+p]:mt-4 [&_ul]:mt-4 [&_ul]:space-y-2">
          {children}
        </div>
      </Container>
    </section>
  );
}
