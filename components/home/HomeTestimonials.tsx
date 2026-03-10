"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

type Testimonial = {
  slug: string;
  name: string;
  company?: string;
  role?: string;
  rating?: number;
  source?: string;
  href?: string;
  body: string;
  work?: string;
  tags?: string[];
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "★";
  if (parts.length === 1) return (parts[0][0] || "★").toUpperCase();
  return (
    ((parts[0][0] || "") + (parts[parts.length - 1][0] || "")).toUpperCase()
  );
}

function Stars({ count = 5 }: { count?: number }) {
  const safe = clamp(count, 0, 5);
  const filled = "★★★★★".slice(0, safe);
  const empty = "★★★★★".slice(0, 5 - safe);

  return (
    <div className="text-crumbs uppercase tracking-crumbs">
      <span className="text-yellow-400">{filled}</span>
      <span className="text-muted/35">{empty}</span>
    </div>
  );
}

export default function HomeTestimonials() {
  const [items, setItems] = React.useState<Testimonial[]>([]);
  const [loading, setLoading] = React.useState(true);

  // testimonials per page (NOT columns)
  const [perPage, setPerPage] = React.useState(1);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setItems([]);
        setLoading(false);
      });
  }, []);

  // mobile + tablet = 1 testimonial per page
  // desktop (xl+) = 2 testimonials per page
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const apply = () => setPerPage(mq.matches ? 2 : 1);
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

  React.useEffect(() => {
    if (safeIndex !== index) setIndex(safeIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageCount, perPage]);

  const pages = React.useMemo(() => {
    return Array.from({ length: pageCount }).map((_, page) => {
      const start = page * perPage;
      return items.slice(start, start + perPage);
    });
  }, [items, pageCount, perPage]);

  const canPrev = safeIndex > 0;
  const canNext = safeIndex < pageCount - 1;

  const prev = () => setIndex((i) => clamp(i - 1, 0, pageCount - 1));
  const next = () => setIndex((i) => clamp(i + 1, 0, pageCount - 1));

  const ctaBtn =
    "inline-flex items-center justify-center h-11 px-4 rounded-full border border-white/15 bg-white/[0.03] " +
    "text-small text-text/90 hover:text-text hover:border-white/30 hover:bg-white/[0.05] transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 " +
    "disabled:opacity-40 disabled:cursor-not-allowed";

  const viewLink =
    "inline-flex items-center gap-2 text-small text-text/85 hover:text-text transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 rounded-pill";

  const isMobile = perPage === 1;

  if (loading) {
    return (
      <div className="mt-8 text-muted text-small">Loading testimonials...</div>
    );
  }

  return (
    <section className="w-full">
      <div className="mx-6 md:mx-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <Reveal variant="mask">
              <h2 className="text-h2 font-semibold tracking-tightish">Reviews</h2>
            </Reveal>

            <Reveal variant="mask" delay={80}>
              <p className="text-body text-text/85 max-w-[52ch]">
                Results are one thing - but the experience matters too. Here are
                a few notes from clients about what it was like to work
                together.
              </p>
            </Reveal>
          </div>

          {/* Desktop only buttons */}
          <Reveal variant="fade" delay={120} y={8}>
            <div className={perPage > 1 ? "flex items-center gap-2" : "hidden"}>
              <button
                type="button"
                onClick={prev}
                disabled={!canPrev}
                className={ctaBtn}
                aria-label="Previous testimonials"
              >
                Prev
              </button>

              <button
                type="button"
                onClick={next}
                disabled={!canNext}
                className={ctaBtn}
                aria-label="Next testimonials"
              >
                Next
              </button>
            </div>
          </Reveal>
        </div>

        <div className="mt-4">
          <Reveal variant="fade" delay={120} y={10}>
            <div className="relative">
              {/* desktop-only iPad visual */}
              <div className="pointer-events-none absolute hidden xl:block inset-0 z-0">
                <div className="absolute right-[-300px] bottom-[-220px] w-[1040px] h-[820px]">
                  <Image
                    src="/ipad-resized.png"
                    alt=""
                    fill
                    priority
                    sizes="1100px"
                    style={{ objectFit: "contain", objectPosition: "center" }}
                  />
                </div>
              </div>

              {/* viewport */}
              <div
                className={[
                  "-mx-2 -my-2 px-2 py-2 relative z-10",
                  isMobile
                    ? "ssw-peek flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 pr-8"
                    : "overflow-hidden",
                ].join(" ")}
                style={
                  isMobile
                    ? ({
                        "--page-gap": "16px",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      } as React.CSSProperties)
                    : ({ "--page-gap": "16px" } as React.CSSProperties)
                }
              >
                {isMobile ? (
                  items.map((t) => (
                    <div
                      key={t.slug}
                      className="snap-start shrink-0 w-[92%] max-w-[520px]"
                    >
                      <TestimonialCard t={t} viewLink={viewLink} />
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
                          {chunk.map((t) => (
                            <TestimonialCard
                              key={t.slug}
                              t={t}
                              viewLink={viewLink}
                            />
                          ))}

                          {/* reserve the 3rd column on desktop */}
                          <div className="hidden xl:block" />

                          {/* if a page has only 1 testimonial on desktop, keep stable */}
                          {perPage > 1 && chunk.length < perPage ? (
                            <div className="hidden xl:block" />
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* global scrollbar removal for WebKit */}
              {isMobile ? (
                <style jsx global>{`
                  .ssw-peek::-webkit-scrollbar {
                    width: 0 !important;
                    height: 0 !important;
                    display: none !important;
                  }
                  .ssw-peek::-webkit-scrollbar-thumb {
                    background: transparent !important;
                  }
                  .ssw-peek::-webkit-scrollbar-track {
                    background: transparent !important;
                  }
                `}</style>
              ) : null}
            </div>
          </Reveal>
        </div>

        {items.length === 0 ? (
          <div className="mt-8 p-px">
            <div className="relative rounded-card overflow-hidden bg-white/[0.03] border border-white/15 shadow-card">
              <div className="relative p-6 md:p-7 text-small text-muted">
                No testimonials found. Add MDX files in{" "}
                <code className="text-text/80">content/testimonials/</code>.
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function TestimonialCard({
  t,
  viewLink,
}: {
  t: Testimonial;
  viewLink: string;
}) {
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
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="inline-flex items-center justify-center size-8 rounded-full bg-white/10 text-[11px] text-text/80 shrink-0">
              {initialsFromName(t.name)}
            </span>

            <div className="min-w-0">
              <div className="text-small text-text">
                {t.name}
                {t.company ? (
                  <span className="text-muted"> · {t.company}</span>
                ) : null}
              </div>

              <div className="mt-1">
                <Stars count={t.rating ?? 5} />
              </div>
            </div>
          </div>
        </div>

        <p className="mt-5 text-small text-muted leading-relaxed line-clamp-6">
          {t.body}
        </p>

        <div className="mt-auto pt-6">
          <div className="h-px bg-white/12" />

          <div className="pt-4 space-y-3">
            {t.work ? (
              <p className="text-small text-muted leading-relaxed">
                <span className="text-text/85">What we did:</span> {t.work}
              </p>
            ) : null}

            {t.href ? (
              <Link href={t.href} className={viewLink}>
                View this review <span aria-hidden="true">→</span>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}