import Image from "next/image";
import type { Visual } from "@/lib/data/types";
import { cn } from "@/lib/cn";
import { ProductArt } from "./product-art";

type MediaFrameProps = {
  visual: Visual;
  /** Tailwind aspect ratio class, e.g. "aspect-[4/5]". */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  /** Set when the surrounding text already describes the image. */
  decorative?: boolean;
  className?: string;
  children?: React.ReactNode;
};

/**
 * Displays licensed photography when `visual.image` is configured, otherwise
 * the matching illustration. Either way the frame never renders a broken image.
 */
export function MediaFrame({
  visual,
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority = false,
  decorative = false,
  className,
  children,
}: MediaFrameProps) {
  const { image } = visual;
  return (
    <div className={cn("paper-grain relative overflow-hidden rounded-[var(--radius-card)]", aspect, className)}>
      {image ? (
        <Image
          src={image.src}
          alt={decorative ? "" : image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="-z-20 object-cover"
        />
      ) : (
        <ProductArt art={visual.art} alt={decorative ? "" : visual.artAlt} className="absolute inset-0 -z-20 size-full" />
      )}
      {children}
    </div>
  );
}
