import * as React from "react";

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

type PanelPadding = "none" | "tile" | "card";

export type PanelProps = React.HTMLAttributes<HTMLDivElement> & {
  padding?: PanelPadding;
};

export function Panel({
  className,
  padding = "card",
  ...props
}: PanelProps) {
  const padClass =
    padding === "none" ? "" : padding === "tile" ? "p-tile" : "p-card";

  return (
    <div
      className={cn("bg-surface rounded-panel shadow-panel", padClass, className)}
      {...props}
    />
  );
}
