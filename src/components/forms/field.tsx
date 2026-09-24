import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export const inputClass =
  "block w-full rounded-xl border bg-paper px-4 text-[0.98rem] text-charcoal placeholder:text-charcoal/40 transition-[border-color,box-shadow] duration-200 focus:border-forest focus:outline-none focus:ring-4 focus:ring-forest/15 aria-[invalid=true]:border-danger aria-[invalid=true]:focus:ring-danger/15 disabled:opacity-60";

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

export function fieldDescribedBy(id: string, { hint, error }: { hint?: string; error?: string }) {
  return [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
}

export function Field({ id, label, required, hint, error, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={id} className="mb-2 text-sm font-medium text-charcoal">
        {label}
        {required ? (
          <span className="ml-1 text-danger" aria-hidden="true">*</span>
        ) : (
          <span className="ml-1.5 font-normal text-stone">(optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-stone">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
