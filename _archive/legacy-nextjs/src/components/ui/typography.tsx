import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-forest [.on-dark_&]:text-kraft",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-6 bg-current opacity-60" />
      {children}
    </p>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  size?: "lg" | "md";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  size = "lg",
  as: Heading = "h2",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center [&_p:first-child]:justify-center", className)}>
      {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
      <Heading id={id} className={size === "lg" ? "display-lg" : "display-md"}>
        {title}
      </Heading>
      {lede && (
        <p className="lede mt-6 text-stone [.on-dark_&]:text-paper/80">{lede}</p>
      )}
    </div>
  );
}
