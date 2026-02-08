import * as React from "react";

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export type DividerProps = React.HTMLAttributes<HTMLHRElement> & {
  soft?: boolean;
};

export function Divider({ className, soft = true, ...props }: DividerProps) {
  return (
    <hr
      className={cn(
        "w-full border-0",
        soft ? "h-px bg-stroke" : "h-px bg-stroke-strong",
        className
      )}
      {...props}
    />
  );
}
