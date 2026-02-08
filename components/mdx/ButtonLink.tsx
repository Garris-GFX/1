import Link from "next/link";

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function buttonClasses(variant: "dark" | "light") {
  const base =
    "inline-flex items-center justify-center rounded-pill select-none whitespace-nowrap font-medium transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/15 " +
    "disabled:opacity-50 disabled:pointer-events-none";

  const size = "h-11 px-6 text-body";

  const styles =
    variant === "light"
      ? "bg-surface text-text shadow-card hover:bg-white/5 active:bg-white/7"
      : "bg-white text-black hover:opacity-90 active:opacity-85";

  return cn(base, size, styles);
}

export default function ButtonLink({
  href,
  children,
  variant = "dark",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light";
}) {
  const cls = buttonClasses(variant);
  const isExternal = /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
