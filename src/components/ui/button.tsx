import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-medium tracking-[-0.005em] transition-[background-color,color,border-color,box-shadow] duration-300 ease-[var(--ease-soft)] disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary: "bg-forest text-paper hover:bg-forest-deep",
  secondary: "border border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-paper",
  light: "bg-paper text-forest hover:bg-kraft-soft",
  "outline-light": "border border-paper/40 text-paper hover:border-paper hover:bg-paper hover:text-forest",
  text: "min-h-0 rounded-none px-0 text-forest underline-offset-4 hover:underline",
};

export type ButtonVariant = keyof typeof variants;

function Arrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="size-4 transition-transform duration-300 ease-[var(--ease-soft)] group-hover:translate-x-0.5"
    />
  );
}

type ButtonLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "children"> & {
  variant?: ButtonVariant;
  arrow?: boolean;
  children: ReactNode;
};

export function ButtonLink({ variant = "primary", arrow = false, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & { variant?: ButtonVariant; arrow?: boolean };

export function Button({ variant = "primary", arrow = false, className, children, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={cn(base, variants[variant], className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
