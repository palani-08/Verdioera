import Link from "next/link";
import type { Innovation } from "@/lib/data/innovation";
import { innovationStatusLabel } from "@/lib/data/innovation";
import { MediaFrame } from "@/components/media/media-frame";
import { StatusBadge } from "@/components/ui/status-badge";

export function InnovationCard({ item }: { item: Innovation }) {
  return (
    <article className="group relative flex flex-col">
      <MediaFrame
        visual={item.visual}
        aspect="aspect-[4/3]"
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        decorative
      >
        <StatusBadge label={innovationStatusLabel[item.status]} className="absolute left-4 top-4" />
      </MediaFrame>
      <h3 className="mt-5 font-serif text-[1.45rem] leading-tight">
        <Link href={`/innovation#${item.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {item.name}
        </Link>
      </h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-stone">{item.summary}</p>
    </article>
  );
}
