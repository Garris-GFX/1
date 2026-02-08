import * as React from "react";

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

type CardPadding = "none" | "tile" | "card";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  padding?: CardPadding;
};

export function Card({
  className,
  padding = "card",
  ...props
}: CardProps) {
  const padClass =
    padding === "none" ? "" : padding === "tile" ? "p-tile" : "p-card";

  return (
    <div
      className={cn("bg-surface rounded-card shadow-card", padClass, className)}
      {...props}
    />
  );
}
