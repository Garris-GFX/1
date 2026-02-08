import * as React from "react";

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export type ContainerProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
};

export function Container({
  as: Tag = "div",
  className,
  ...props
}: ContainerProps) {
  // Explicit container sizing so we get consistent padding/width even if
  // Tailwind's `container` config isn't being picked up.
  return (
    <Tag
      className={cn("mx-auto w-full max-w-[1200px] px-6 md:px-12", className)}
      {...props}
    />
  );
}
