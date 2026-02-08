import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  const hasHomeAlready =
    items.length > 0 &&
    (items[0]?.href === "/" || items[0]?.label.toLowerCase() === "home");

  const normalizedItems: BreadcrumbItem[] = hasHomeAlready
    ? items
    : [{ label: "Home", href: "/" }, ...items];

  const lastIdx = normalizedItems.length - 1;

  return (
    <nav
      aria-label="Breadcrumbs"
      className={[
        "text-crumbs uppercase tracking-crumbs",
        className ?? "",
      ].join(" ")}
    >
      {normalizedItems.map((item, idx) => {
        const isLast = idx === lastIdx;

        const crumb = isLast ? (
          <span className="text-white">{item.label}</span>
        ) : item.href ? (
          <Link href={item.href} className="hover:text-white">
            {item.label}
          </Link>
        ) : (
          <span>{item.label}</span>
        );

        return (
          <span key={`${item.label}-${idx}`}>
            {crumb}
            {!isLast ? <span className="mx-2 text-text/40">/</span> : null}
          </span>
        );
      })}
    </nav>
  );
}

