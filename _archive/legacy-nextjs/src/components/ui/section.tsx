import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const tones = {
  paper: "bg-paper text-charcoal",
  muted: "bg-paper-2 text-charcoal",
  kraft: "bg-kraft-soft text-charcoal",
  sage: "bg-sage-soft text-charcoal",
  forest: "on-dark bg-forest text-paper",
  charcoal: "on-dark bg-charcoal text-paper",
};

export type SectionTone = keyof typeof tones;

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: SectionTone;
  spacing?: "default" | "compact" | "none";
};

export function Section({ tone = "paper", spacing = "default", className, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        tones[tone],
        spacing === "default" && "py-20 sm:py-28 lg:py-32",
        spacing === "compact" && "py-14 sm:py-20",
        className,
      )}
      {...props}
    />
  );
}
