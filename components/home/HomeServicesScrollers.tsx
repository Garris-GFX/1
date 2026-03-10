"use client";

import { useEffect, useMemo, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import ToolIcons from "../ToolIcons";

type ServiceItem = {
  id: string;
  title: string;
  promise: string;
  description: string;
  tools: string[];
};

const SERVICES: ServiceItem[] = [
  {
    id: "websites",
    title: "Websites + Systems",
    promise: "Fast, scalable Next.js builds that look premium.",
    description:
      "Design and development for marketing sites and content systems. Clean layouts, strong typography, and real-world performance so it feels as good as it looks.",
    tools: ["Next.js", "Tailwind", "Vercel", "TypeScript"],
  },
  {
    id: "branding",
    title: "Brand Identity",
    promise: "A visual system you can actually use everywhere.",
    description:
      "Logos, type, color, and layout rules that stay consistent across web, social, and print - plus the files and guidance to keep it clean long-term.",
    tools: ["Figma", "Illustrator", "Photoshop", "InDesign"],
  },
  {
    id: "seo",
    title: "SEO + Content",
    promise: "Structure that helps Google (and people) find you.",
    description:
      "Metadata, sitemaps, structured data, and clean content templates. Make publishing easy and keep your site discoverable without adding bloat.",
    tools: ["GA4", "Search Console"],
  },
  {
    id: "support",
    title: "Design Support",
    promise: "A reliable partner for ongoing upgrades.",
    description:
      "Iterate on pages, add features, ship improvements, and keep everything consistent. Ideal when you want momentum without hiring full-time.",
    tools: ["Notion", "Slack", "GitHub", "Linear"],
  },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function HomeServicesScrollers() {
  const items = SERVICES;

  // services per page (NOT columns)
  const [perPage, setPerPage] = useState(1);
  const [index, setIndex] = useState(0);

  // mobile + tablet = 1 service per page
  // desktop (xl+) = 3 services per page
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const apply = () => setPerPage(mq.matches ? 3 : 1);
    apply();

    if (mq.addEventListener) mq.addEventListener("change", apply);
    else mq.addListener(apply);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else mq.removeListener(apply);
    };
  }, []);

  const pageCount = Math.max(1, Math.ceil(items.length / perPage));
  const safeIndex = clamp(index, 0, pageCount - 1);

  useEffect(() => {
    if (safeIndex !== index) setIndex(safeIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageCount, perPage]);

  const pages = useMemo(
    () =>
      Array.from({ length: pageCount }).map((_, page) => {
        const start = page * perPage;
        return items.slice(start, start + perPage);
      }),
    [items, pageCount, perPage]
  );

  const canPrev = safeIndex > 0;
  const canNext = safeIndex < pageCount - 1;

  const prev = () => setIndex((i) => clamp(i - 1, 0, pageCount - 1));
  const next = () => setIndex((i) => clamp(i + 1, 0, pageCount - 1));

  const ctaBtn =
    "inline-flex items-center justify-center h-11 px-4 rounded-full border border-white/15 bg-white/[0.03] " +
    "text-small text-text/90 hover:text-text hover:border-white/30 hover:bg-white/[0.05] transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 " +
    "disabled:opacity-40 disabled:cursor-not-allowed";

  const isMobile = perPage === 1;

  return (
    <section className="w-full">
      <div className="mx-6 md:mx-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <Reveal variant="mask">
              <h2 className="text-h2 font-semibold tracking-tightish">
                Services
              </h2>
            </Reveal>

            <Reveal variant="mask" delay={80}>
              <p className="text-body text-text/85 max-w-[52ch]">
                Pick the lane you need most - each service is built to ship
                fast, look premium, and stay maintainable.
              </p>
            </Reveal>
          </div>

          {/* Desktop only buttons */}
          <Reveal variant="fade" delay={120} y={8}>
            <div className={perPage > 1 ? "flex items-center gap-2" : "hidden"}>
              <button
                onClick={prev}
                disabled={!canPrev}
                className={ctaBtn}
                type="button"
                aria-label="Previous services"
              >
                Prev
              </button>
              <button
                onClick={next}
                disabled={!canNext}
                className={ctaBtn}
                type="button"
                aria-label="Next services"
              >
                Next
              </button>
            </div>
          </Reveal>
        </div>

        <div className="mt-4">
          <Reveal variant="fade" delay={120} y={10}>
            {/* viewport */}
            <div
              className={[
                "-mx-2 -my-2 px-2 py-2",
                isMobile
                  ? "ssw-peek flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 pr-8"
                  : "overflow-hidden",
              ].join(" ")}
              style={{ "--page-gap": "16px" } as React.CSSProperties}
            >
              {isMobile ? (
                items.map((s) => (
                  <div
                    key={s.id}
                    className="snap-start shrink-0 w-[92%] max-w-[440px]"
                  >
                    <ServiceCard s={s} />
                  </div>
                ))
              ) : (
                <div
                  className="flex gap-[var(--page-gap)] transition-transform duration-500 ease-out will-change-transform"
                  style={{
                    transform: `translateX(calc(-${safeIndex} * (100% + var(--page-gap))))`,
                  }}
                >
                  {pages.map((chunk, pageIdx) => (
                    <div key={pageIdx} className="w-full shrink-0">
                      <div className="grid gap-6 xl:grid-cols-3 items-stretch">
                        {chunk.map((s) => (
                          <ServiceCard key={s.id} s={s} />
                        ))}

                        {/* keep grid shape stable on last page */}
                        {perPage > 1 && chunk.length < perPage
                          ? Array.from({ length: perPage - chunk.length }).map(
                              (_, i) => (
                                <div
                                  key={`spacer-${pageIdx}-${i}`}
                                  className="hidden xl:block"
                                />
                              )
                            )
                          : null}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <style jsx global>{`
              .ssw-peek {
                scrollbar-width: none;
                -ms-overflow-style: none;
              }
              .ssw-peek::-webkit-scrollbar {
                width: 0 !important;
                height: 0 !important;
                display: none !important;
              }
            `}</style>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s }: { s: ServiceItem }) {
  return (
    <article className="relative h-full rounded-card overflow-hidden bg-white/[0.03] border border-white/15 shadow-card">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 240px at 30% 0%, rgba(255,255,255,0.06), transparent 55%)",
          opacity: 0.9,
        }}
      />
      <div className="relative p-6 md:p-7 flex h-full flex-col">
        <div className="text-h3 font-semibold text-text">{s.title}</div>

        <div className="mt-2 text-small text-text/80">{s.promise}</div>

        <p className="mt-4 text-small text-muted leading-relaxed">
          {s.description}
        </p>

        <div className="mt-auto pt-6">
          <div className="h-px bg-white/12" />

          <div className="pt-4">
            <div className="text-crumbs uppercase tracking-crumbs text-muted mb-3">
              Tools
            </div>

            <ToolIcons
              tools={s.tools}
              variant="tiles"
              size={18}
              tileSize={32}
              className="flex flex-wrap gap-2 pb-1"
              tileRadiusClass="rounded-[10px]"
            />
          </div>
        </div>
      </div>
    </article>
  );
}