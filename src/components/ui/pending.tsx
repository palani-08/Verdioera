import { showContentPlaceholders } from "@/lib/config/company";
import { cn } from "@/lib/cn";

/**
 * Editable placeholder for business information that has not been confirmed.
 * Renders nothing unless NEXT_PUBLIC_SHOW_CONTENT_PLACEHOLDERS=true, so
 * unconfirmed facts are never shown — or faked — on the live site.
 */
export function Pending({ field, source = "src/lib/config/company.ts", className }: { field: string; source?: string; className?: string }) {
  if (!showContentPlaceholders) return null;
  return (
    <span
      className={cn(
        "inline-flex flex-wrap items-center gap-x-2 rounded-md border border-dashed border-[#B7791F]/60 bg-[#FBF3E4] px-2.5 py-1 text-xs font-medium text-[#6B4A12]",
        className,
      )}
    >
      <span>To confirm: {field}</span>
      <code className="font-mono text-[0.7rem] opacity-80">{source}</code>
    </span>
  );
}
