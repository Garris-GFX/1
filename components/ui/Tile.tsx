import * as React from "react";

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export type TileProps = React.HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
};

export function Tile({ className, interactive = false, ...props }: TileProps) {
  return (
    <div
      className={cn(
        "bg-black rounded-tile shadow-tile p-tile text-text",
        interactive &&
          "cursor-pointer transition-transform hover:-translate-y-[1px] hover:shadow-card focus-within:ring-2 focus-within:ring-white/15",
        className
      )}
      {...props}
    />
  );
}
