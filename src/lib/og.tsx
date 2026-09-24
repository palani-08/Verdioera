import { ImageResponse } from "next/og";
import { company } from "@/lib/config/company";

export const ogSize = { width: 1200, height: 630 };

/** Brand Open Graph card rendered at build time. */
export function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F7F5EF",
          padding: "72px 80px",
          color: "#252B26",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: "#234E3B", display: "flex" }} />
          <div style={{ fontSize: 34 }}>{company.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#234E3B", fontFamily: "sans-serif" }}>
            {eyebrow}
          </div>
          <div style={{ fontSize: 76, lineHeight: 1.05, maxWidth: 980 }}>{title}</div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {["#234E3B", "#9CAF88", "#D8C5A5", "#252B26"].map((color) => (
            <div key={color} style={{ width: 120, height: 10, borderRadius: 5, backgroundColor: color, display: "flex" }} />
          ))}
        </div>
      </div>
    ),
    ogSize,
  );
}
