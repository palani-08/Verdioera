import { company } from "@/lib/config/company";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = `${company.name} — ${company.tagline}`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({ eyebrow: "Paper · Hygiene · Packaging", title: company.tagline });
}
