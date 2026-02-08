"use client";

import * as React from "react";

export type AccordionItem = {
  heading: string;
  body: string;
  checklist?: string[];
};

export type AccordionSection = {
  title: string;
  items: AccordionItem[];
};

function Divider() {
  return <div className="h-[2px] w-full bg-white/80" />;
}

function useScrollDirection() {
  const [dir, setDir] = React.useState<"up" | "down">("down");
  const lastY = React.useRef(0);

  React.useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const next = y > lastY.current ? "down" : "up";
      if (next !== dir) setDir(next);
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
     
  }, [dir]);

  return dir;
}

export function Accordion({
  sections,
  initialIndex = 0,
  className,
}: {
  sections: AccordionSection[];
  initialIndex?: number;
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = React.useState(initialIndex);

  // NEW: once opened, stays opened (prevents retract / reflow)
  const [openedThrough, setOpenedThrough] = React.useState(initialIndex);

  const dir = useScrollDirection();

  const headerRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const endRefs = React.useRef<Array<HTMLDivElement | null>>([]);

  const lastCommitRef = React.useRef<number>(0);
  const activeIndexRef = React.useRef<number>(activeIndex);

  React.useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const commitIndex = React.useCallback((nextIdx: number) => {
    const now = performance.now();
    if (now - lastCommitRef.current < 140) return; // small debounce to prevent jitter
    lastCommitRef.current = now;

    setActiveIndex((cur) => (cur === nextIdx ? cur : nextIdx));

    // NEW: expand and never retract
    setOpenedThrough((cur) => (nextIdx > cur ? nextIdx : cur));
  }, []);

  React.useEffect(() => {
    const headers = headerRefs.current.filter(Boolean) as HTMLDivElement[];
    const ends = endRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!headers.length || !ends.length) return;

    const band = {
      root: null as Element | null,
      threshold: 0,
      rootMargin: "-35% 0px -45% 0px",
    };

    const endObserver = new IntersectionObserver((entries) => {
      if (dir !== "down") return;

      // If the end of the CURRENT active section hits the band, advance to the next section.
      for (const e of entries) {
        if (!e.isIntersecting) continue;

        const idx = Number((e.target as HTMLElement).dataset.index || 0);
        const cur = activeIndexRef.current;

        if (idx === cur && idx + 1 < sections.length) {
          commitIndex(idx + 1);
        }
      }
    }, band);

    const headerObserver = new IntersectionObserver((entries) => {
      if (dir !== "up") return;

      // When scrolling up, we can still update the "active" highlight
      // BUT sections will not retract because open state is controlled by openedThrough.
      const cur = activeIndexRef.current;

      const candidates = entries
        .filter((e) => e.isIntersecting)
        .map((e) => ({
          idx: Number((e.target as HTMLElement).dataset.index || 0),
          top: e.boundingClientRect.top,
        }))
        .filter((c) => c.idx < cur);

      if (!candidates.length) return;

      candidates.sort((a, b) => Math.abs(a.top) - Math.abs(b.top));
      commitIndex(candidates[0].idx);
    }, band);

    ends.forEach((el) => endObserver.observe(el));
    headers.forEach((el) => headerObserver.observe(el));

    return () => {
      endObserver.disconnect();
      headerObserver.disconnect();
    };
  }, [commitIndex, dir, sections.length]);

  return (
    <div className={["space-y-section", className ?? ""].join(" ")}>
      {sections.map((s, idx) => {
        // NEW: open stays true once it has been opened
        const open = idx <= openedThrough;

        return (
          <div key={s.title} className="rounded-card bg-transparent">
            {/* header sentinel */}
            <div
              ref={(el) => {
                headerRefs.current[idx] = el;
              }}
              data-index={idx}
              className="h-px w-full"
              aria-hidden="true"
            />

            <div className="flex items-end justify-between gap-5">
              <h3
                className={[
                  "text-h3 tracking-tightish",
                  idx === activeIndex ? "text-white/90" : "text-text/70",
                ].join(" ")}
              >
                {s.title}
              </h3>
            </div>

            <div className="mt-3">
              <Divider />
            </div>

            {/* animated content wrapper */}
            <div
              className={[
                "overflow-hidden",
                "transition-[max-height,opacity,transform]",
                "motion-safe:duration-700 motion-safe:ease-out",
                open
                  ? "max-h-[2200px] opacity-100 translate-y-0"
                  : "max-h-0 opacity-0 -translate-y-2",
              ].join(" ")}
            >
              <div className="pt-card space-y-card">
                {s.items.map((it) => (
                  <div key={it.heading} className="space-y-3">
                    <div className="text-xl text-white/85">{it.heading}</div>
                    <p className="text-body text-muted leading-relaxed">
                      {it.body}
                    </p>

                    {it.checklist?.length ? (
                      <ul className="space-y-1 text-body text-muted">
                        {it.checklist.map((c) => (
                          <li key={c} className="flex gap-3">
                            <span className="mt-[0.35rem] h-3 w-3 rounded-[4px] border border-white/15 bg-white/5" />
                            <span className="leading-relaxed">{c}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}

                {/* end sentinel: advancing happens when THIS point enters the band */}
                <div
                  ref={(el) => {
                    endRefs.current[idx] = el;
                  }}
                  data-index={idx}
                  className="h-px w-full"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
