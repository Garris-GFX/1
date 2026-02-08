"use client";

import { useEffect, useMemo, useState } from "react";
import { useLayout } from "@/components/layout/LayoutContext";

export type TocItem = {
  text: string;
  level: 2 | 3;
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[`~!@#$%^&*()+=|{}\[\]:;"'<>,.?/\\]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function PostToc({
  items = [],
  contentSelector = ".prose",
  inCard = false,
}: {
  items?: TocItem[];
  contentSelector?: string;
  inCard?: boolean;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [localItems, setLocalItems] = useState<TocItem[] | null>(
    items && items.length ? items : null
  );

  const { headerHeight } = useLayout();

  const hydrated = useMemo(() => {
    const source = localItems ?? items ?? [];
    return source.filter((i) => i.text && (i.level === 2 || i.level === 3));
  }, [localItems, items]);

  useEffect(() => {
    const root = document.querySelector(contentSelector);
    if (!root) return;

    const headings = Array.from(root.querySelectorAll("h2, h3")) as HTMLHeadingElement[];

    const derived: TocItem[] = headings
      .map((h) => {
        const text = (h.textContent || "").trim();
        if (!text) return null;
        const level = h.tagName === "H3" ? 3 : 2;
        return { text, level } as TocItem;
      })
      .filter(Boolean) as TocItem[];

    let raf = 0 as number;
    if ((!items || !items.length) && derived.length) {
      raf = requestAnimationFrame(() => setLocalItems(derived));
    }

    const used = new Map<string, number>();
    headings.forEach((h) => {
      const text = (h.textContent || "").trim();
      if (!text) return;

      const base = slugify(text);
      const count = used.get(base) ?? 0;
      used.set(base, count + 1);

      const id = count === 0 ? base : `${base}-${count + 1}`;
      if (!h.id) h.id = id;
    });

    const observed = headings.filter((h) => !!h.id);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));

        if (visible[0]?.target) {
          setActiveId((visible[0].target as HTMLElement).id);
        }
      },
      { rootMargin: `-${Math.round(headerHeight + 16)}px 0px -70% 0px`, threshold: [0, 1] }
    );

    observed.forEach((h) => io.observe(h));

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items, contentSelector, headerHeight]);

  if (!hydrated.length) {
    const Empty = (
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">Contents</div>
        <div className="mt-[16px] text-sm text-muted">Add a few ## headings in this post to generate a table of contents.</div>
      </div>
    );

    return inCard ? Empty : <aside className="xl:sticky xl:top-24">{Empty}</aside>;
  }

  const Inner = (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-
      muted">Contents</div>

      <nav className="mt-[16px]">
        <ul className="space-y-[12px]">
          {hydrated.map((it) => {
            const id = slugify(it.text);
            const isActive = activeId === id || (activeId?.startsWith(id + "-") ?? false);

            return (
              <li key={`${it.level}-${it.text}`} className={it.level === 3 ? "pl-[16px]" : ""}>
                <a
                  href={`#${id}`}
                    onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(id);
                    if (el) {
                      const offset = headerHeight + 16;
                      const top = window.scrollY + el.getBoundingClientRect().top - offset;
                      window.scrollTo({ top, behavior: "smooth" });
                      if (history.replaceState) history.replaceState(null, "", `#${id}`);
                      setActiveId(id);
                    }
                  }}
                    className={`block text-sm transition-colors ${
                      isActive ? "font-semibold text-text" : "text-muted hover:text-text"
                    }`}
                >
                  {it.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );

  return inCard ? Inner : <aside className="sticky top-24">{Inner}</aside>;
}
