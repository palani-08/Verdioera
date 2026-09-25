import { BedDouble, Building2, ChefHat, HeartPulse, Package, Shirt, Store, UtensilsCrossed, type LucideProps } from "lucide-react";
import type { IndustryIcon as IconKey } from "@/lib/data/industries";

const icons = {
  store: Store,
  bed: BedDouble,
  utensils: UtensilsCrossed,
  chef: ChefHat,
  health: HeartPulse,
  shirt: Shirt,
  package: Package,
  building: Building2,
} satisfies Record<IconKey, React.ComponentType<LucideProps>>;

export function IndustryIcon({ icon, ...props }: { icon: IconKey } & LucideProps) {
  const Icon = icons[icon];
  return <Icon aria-hidden="true" strokeWidth={1.5} {...props} />;
}
