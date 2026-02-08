import * as React from "react";

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant = "primary", size = "md", type = "button", ...props },
    ref
  ) {
    const base =
      "inline-flex items-center justify-center rounded-pill select-none whitespace-nowrap font-medium transition " +
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/15 " +
      "disabled:opacity-50 disabled:pointer-events-none";

    const sizes: Record<ButtonSize, string> = {
      sm: "h-9 px-4 text-small",
      md: "h-11 px-6 text-body",
      lg: "h-12 px-8 text-body",
    };

    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-white text-black hover:opacity-90 active:opacity-85",
      secondary:
        "bg-surface text-text shadow-card hover:bg-white/5 active:bg-white/7",
      ghost:
        "bg-transparent text-text hover:bg-white/5 active:bg-white/7",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(base, sizes[size], variants[variant], className)}
        {...props}
      />
    );
  }
);
