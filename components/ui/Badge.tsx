import * as React from "react";

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

type BadgeVariant = "neutral" | "recommended" | "muted";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    neutral:
      "bg-white/5 text-text shadow-tile",
    recommended:
      "bg-white text-black",
    muted:
      "bg-white/4 text-muted shadow-tile",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-3 py-1 text-crumbs uppercase tracking-crumbs",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
