import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/typography";

type CtaBandProps = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function CtaBand({ eyebrow = "Start a conversation", title, lede, primary, secondary }: CtaBandProps) {
  return (
    <section className="on-dark paper-grain bg-forest text-paper">
      <Container width="wide" className="grid gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:items-end lg:py-28">
        <div className="lg:col-span-8">
          <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
          <h2 className="display-lg">{title}</h2>
          {lede && <p className="lede mt-6 max-w-2xl text-paper/80">{lede}</p>}
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
          <ButtonLink href={primary.href} variant="light" arrow>
            {primary.label}
          </ButtonLink>
          {secondary && (
            <ButtonLink href={secondary.href} variant="outline-light">
              {secondary.label}
            </ButtonLink>
          )}
        </div>
      </Container>
    </section>
  );
}
