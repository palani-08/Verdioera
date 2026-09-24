import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type ContainerProps<T extends ElementType> = {
  as?: T;
  width?: "default" | "narrow" | "wide";
} & ComponentPropsWithoutRef<T>;

const widths = {
  narrow: "max-w-[860px]",
  default: "max-w-[1240px]",
  wide: "max-w-[1440px]",
};

export function Container<T extends ElementType = "div">({
  as,
  width = "default",
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";
  return <Component className={cn("mx-auto w-full px-4 sm:px-8 lg:px-12", widths[width], className)} {...props} />;
}
