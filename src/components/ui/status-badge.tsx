import { cn } from "@/lib/cn";

type StatusBadgeProps = {
  label?: string;
  variant?: "pill" | "inline";
  className?: string;
};

export function StatusBadge({ label = "Under Development", variant = "pill", className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-charcoal",
        variant === "pill" && "rounded-full border border-charcoal/15 bg-paper/90 px-3 py-1 backdrop-blur",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-[#B7791F]" />
      {label}
    </span>
  );
}
