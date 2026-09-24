import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/data/products";
import { MediaFrame } from "@/components/media/media-frame";
import { cn } from "@/lib/cn";

export function ProductCard({ product, className, headingLevel = "h3" }: { product: Product; className?: string; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className={cn("group relative flex flex-col", className)}>
      <MediaFrame
        visual={product.visual}
        aspect="aspect-[4/5]"
        sizes="(min-width: 1280px) 20vw, (min-width: 640px) 45vw, 100vw"
        decorative
        className="transition-transform duration-700 ease-[var(--ease-soft)] group-hover:-translate-y-1"
      />
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-stone">{product.index}</p>
          <Heading className="mt-1.5 font-serif text-2xl leading-tight">
            <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {product.name}
            </Link>
          </Heading>
        </div>
        <ArrowUpRight
          aria-hidden="true"
          className="mt-6 size-5 shrink-0 text-forest transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </div>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-stone">{product.summary}</p>
    </article>
  );
}
