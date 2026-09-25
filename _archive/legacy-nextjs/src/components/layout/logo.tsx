import Link from "next/link";
import { company } from "@/lib/config/company";
import { cn } from "@/lib/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8", className)}>
      <rect width="32" height="32" rx="9" fill="currentColor" />
      <path d="M10 9.5h9.5L23 13v9.5H10z" fill="#F7F5EF" />
      <path d="M19.5 9.5V13H23" fill="#D8C5A5" />
      <path d="M13 17h7M13 20h4.5" stroke="#234E3B" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-md",
        tone === "dark" ? "text-forest" : "text-paper",
        className,
      )}
      aria-label={`${company.name} — home`}
    >
      <LogoMark className={tone === "light" ? "text-forest ring-1 ring-paper/25 rounded-[9px]" : undefined} />
      <span className={cn("font-serif text-[1.35rem] leading-none tracking-[-0.01em]", tone === "dark" ? "text-charcoal" : "text-paper")}>
        {company.name}
      </span>
    </Link>
  );
}
