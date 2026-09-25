import type { ReactNode } from "react";
import type { Visual } from "@/lib/data/types";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/typography";
import { MediaFrame } from "@/components/media/media-frame";
import { cn } from "@/lib/cn";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  actions?: ReactNode;
  visual?: Visual;
  visualSlot?: ReactNode;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, lede, actions, visual, visualSlot, children }: PageHeroProps) {
  const hasVisual = Boolean(visual || visualSlot);
  return (
    <section className="relative overflow-hidden border-b border-line/70">
      <Container width="wide" className={cn("grid gap-12 py-16 sm:py-20 lg:py-24", hasVisual && "lg:grid-cols-12 lg:items-center")}>
        <div className={cn(hasVisual ? "lg:col-span-6" : "max-w-4xl")}>
          <Eyebrow className="rise-in mb-6">{eyebrow}</Eyebrow>
          <h1 className="display-xl rise-in [--delay:80ms]">{title}</h1>
          {lede && <p className="lede rise-in mt-7 max-w-2xl text-stone [--delay:160ms]">{lede}</p>}
          {actions && <div className="rise-in mt-10 flex flex-wrap gap-3 [--delay:240ms]">{actions}</div>}
          {children}
        </div>
        {hasVisual && (
          <div className="rise-in lg:col-span-6 [--delay:200ms]">
            {visualSlot ?? (visual && <MediaFrame visual={visual} aspect="aspect-[5/4] lg:aspect-[6/5]" priority sizes="(min-width: 1024px) 45vw, 100vw" />)}
          </div>
        )}
      </Container>
    </section>
  );
}
