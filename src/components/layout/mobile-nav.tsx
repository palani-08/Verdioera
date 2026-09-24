"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/lib/config/site";
import { cn } from "@/lib/cn";
import { isActivePath } from "./nav-links";

/**
 * Mobile navigation built on the native <dialog> element, which provides
 * focus containment, Escape-to-close and an inert background for free.
 */
export function MobileNav({ items, quoteHref }: { items: NavItem[]; quoteHref: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex size-11 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-charcoal/40"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <Menu aria-hidden="true" className="size-5" />
      </button>

      <dialog
        ref={dialogRef}
        onClose={close}
        aria-label="Site menu"
        className="m-0 ml-auto h-dvh max-h-none w-full max-w-md bg-paper p-0 text-charcoal open:flex open:flex-col"
      >
        <div className="flex items-center justify-between px-4 py-4 sm:px-8">
          <span className="font-serif text-xl">Menu</span>
          <button
            type="button"
            onClick={close}
            className="inline-flex size-11 items-center justify-center rounded-full border border-charcoal/15"
            aria-label="Close menu"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 pb-6 sm:px-8">
          <ul className="divide-y divide-line border-y border-line">
            {items.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between py-4 font-serif text-[1.65rem] leading-tight",
                      active ? "text-forest" : "text-charcoal",
                    )}
                  >
                    {item.label}
                    {active && <span aria-hidden="true" className="size-2 rounded-full bg-forest" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t border-line px-4 py-5 sm:px-8">
          <Link
            href={quoteHref}
            onClick={close}
            className="flex min-h-12 w-full items-center justify-center rounded-full bg-forest px-6 font-medium text-paper"
          >
            Request a Quote
          </Link>
        </div>
      </dialog>
    </>
  );
}
