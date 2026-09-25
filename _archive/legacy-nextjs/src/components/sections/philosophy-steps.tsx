import { cn } from "@/lib/cn";

export const philosophy = [
  {
    step: "Make",
    detail: "Documented materials, specifications and repeatable production processes.",
  },
  {
    step: "Measure",
    detail: "Monitoring output, defects, material use and delivery performance.",
  },
  {
    step: "Improve",
    detail: "Reducing waste and defects, and acting on customer feedback.",
  },
  {
    step: "Scale",
    detail: "Expanding capacity and repeatable B2B supply as demand justifies.",
  },
];

export function PhilosophySteps({ tone = "light", headingLevel = "h3" }: { tone?: "light" | "dark"; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ol className="grid gap-px overflow-hidden rounded-[var(--radius-card)] sm:grid-cols-2 lg:grid-cols-4">
      {philosophy.map((item, index) => (
        <li
          key={item.step}
          className={cn(
            "relative flex min-h-64 flex-col justify-between p-7 sm:p-8",
            tone === "dark" ? "bg-forest-deep/60 text-paper" : "bg-paper text-charcoal",
          )}
        >
          <div className="flex items-center justify-between">
            <span className={cn("text-sm font-medium tabular-nums", tone === "dark" ? "text-kraft" : "text-forest")}>
              0{index + 1}
            </span>
            {index < philosophy.length - 1 && (
              <span aria-hidden="true" className={cn("text-lg", tone === "dark" ? "text-paper/40" : "text-charcoal/30")}>
                →
              </span>
            )}
          </div>
          <div className="mt-12">
            <Heading className="font-serif text-4xl">{item.step}</Heading>
            <p className={cn("mt-3 text-[0.95rem] leading-relaxed", tone === "dark" ? "text-paper/80" : "text-stone")}>
              {item.detail}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
