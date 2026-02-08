// components/layout/Section.tsx
import * as React from "react";

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

type SectionSize = "tight" | "normal" | "section";

export type SectionProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  size?: SectionSize;

  // Optional heading block
  title?: string;
  lead?: string;
  headerSlot?: React.ReactNode;
};

export function Section({
  as: Tag = "section",
  className,
  size = "section",
  title,
  lead,
  headerSlot,
  children,
  ...props
}: SectionProps) {
  const spacing =
    size === "tight"
      ? "space-y-tile"
      : size === "normal"
      ? "space-y-card"
      : "space-y-section";

  return (
    <Tag className={cn(spacing, className)} {...props}>
      {(title || lead || headerSlot) && (
        <header className="space-y-tile">
          {title && (
            <h2 className="text-h2 tracking-tightish text-white">{title}</h2>
          )}
          {lead && <p className="text-body text-muted">{lead}</p>}
          {headerSlot}
        </header>
      )}

      {children}
    </Tag>
  );
}
