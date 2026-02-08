"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import type { BlogMeta } from "@/lib/resources";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

type SortMode = "newest" | "oldest";

const PAGE_SIZE = 15;

const normalize = (s: unknown) => String(s ?? "").toLowerCase().trim();
const titleCase = (label: string) =>
  !label
    ? label
    : label
        .split(" ")
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

const safeTime = (d?: string) => {
  if (!d) return -Infinity;
  const t = new Date(d).getTime();
  return Number.isFinite(t) ? t : -Infinity;
};

function pickFeaturedThree(items: BlogMeta[]) {
  const tagged = items.filter((p) => p.tags?.some((t) => normalize(t) === "featured"));
  const base = tagged.length ? tagged : items;
  return base.slice(0, 3);
}

function getPillsForResource(p: BlogMeta) {
  return p.tags?.length ? p.tags.map(String) : [];
}

function resourceMatchesPill(p: BlogMeta, pill: string) {
  const target = normalize(pill);
  const tags = p.tags?.map((t) => normalize(t)) ?? [];
  return tags.includes(target);
}

function resourceSearchText(p: BlogMeta) {
  return [p.title, p.excerpt, ...(p.tags ?? []), p.date].filter(Boolean).join(" ");
}

export default function ResourcesGrid({ posts }: { posts: BlogMeta[] }) {
  const featured = useMemo(() => pickFeaturedThree(posts), [posts]);
  const featScrollerRef = useRef<HTMLDivElement | null>(null);
  const featSlideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [featIndex, setFeatIndex] = useState(0);

  const pills = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((it) => getPillsForResource(it).forEach((p) => set.add(String(p))));
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [posts]);

  const [activePill, setActivePill] = useState("All");
  const pillRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusPill = (i: number) => requestAnimationFrame(() => pillRefs.current[i]?.focus());

  const selectPillByIndex = (i: number) => {
    const next = pills[i];
    if (!next) return;
    setActivePill(next);
    focusPill(i);
  };

  const handlePillKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = pills.length - 1;

    if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "Home" || e.key === "End") {
      e.preventDefault();

      let nextIndex = index;
      if (e.key === "ArrowRight") nextIndex = index === last ? 0 : index + 1;
      if (e.key === "ArrowLeft") nextIndex = index === 0 ? last : index - 1;
      if (e.key === "Home") nextIndex = 0;
      if (e.key === "End") nextIndex = last;

      selectPillByIndex(nextIndex);
      return;
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActivePill(pills[index]);
    }
  };

  const handleSelectPill = (pill: string, index?: number) => {
    setActivePill(pill);
    if (typeof index === "number") focusPill(index);
  };

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("newest");

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const mobileInputRef = useRef<HTMLInputElement | null>(null);
  const desktopInputRef = useRef<HTMLInputElement | null>(null);

  const stickyBarRef = useRef<HTMLDivElement | null>(null);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const filteredAndSorted = useMemo(() => {
    const q = normalize(query);

    let list = posts;

    if (activePill !== "All") list = list.filter((it) => resourceMatchesPill(it, activePill));

    if (q) list = list.filter((it) => normalize(resourceSearchText(it)).includes(q));

    return [...list].sort((a, b) => (sort === "oldest" ? safeTime(a.date) - safeTime(b.date) : safeTime(b.date) - safeTime(a.date)));
  }, [posts, activePill, query, sort]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisibleCount(PAGE_SIZE));
    return () => cancelAnimationFrame(id);
  }, [activePill, query, sort]);

  const totalItems = filteredAndSorted.length;
  const visibleItems = filteredAndSorted.slice(0, Math.min(visibleCount, totalItems));
  const showingFrom = totalItems ? 1 : 0;
  const showingTo = Math.min(visibleItems.length, totalItems);
  const sectionTitle = activePill === "All" ? "All posts" : titleCase(activePill);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisibleCount((c) => Math.min(totalItems, c + PAGE_SIZE));
      },
      { rootMargin: "600px 0px" }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [totalItems]);

  useEffect(() => {
    const el = featScrollerRef.current;
    if (!el || featured.length <= 1) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const { left, width } = el.getBoundingClientRect();
        const center = left + width / 2;

        let best = 0;
        let bestDist = Infinity;

        featSlideRefs.current.forEach((slide, i) => {
          if (!slide) return;
          const r = slide.getBoundingClientRect();
          const d = Math.abs(r.left + r.width / 2 - center);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });

        setFeatIndex(best);
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
  }, [featured.length]);

  const scrollFeaturedTo = (i: number) => {
    const node = featSlideRefs.current[i];
    if (!node) return;
    node.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const [barTop, setBarTop] = useState(64);

  useEffect(() => {
    const compute = () => {
      const headerEl = document.querySelector<HTMLElement>(".site-header");
      const headerH = headerEl?.offsetHeight ?? 64;
      setBarTop(headerH);
    };

    compute();

    const ro = new ResizeObserver(compute);
    const headerEl = document.querySelector(".site-header");
    if (headerEl) ro.observe(headerEl as Element);
    if (stickyBarRef.current) ro.observe(stickyBarRef.current);

    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  const showFeatured = activePill === "All" && query.trim() === "";

  const pillBase =
    "inline-flex h-9 items-center rounded-pill px-4 text-small font-semibold transition " +
    "border border-white/10 bg-white/5 text-text hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/15";

  const pillActive = "bg-white text-black border-white hover:bg-white";

  const inputBase =
    "h-11 w-full rounded-pill bg-surface px-4 text-body text-text placeholder:text-muted/70 " +
    "border border-white/10 outline-none focus-visible:ring-2 focus-visible:ring-white/15";

  return (
    <main>
      <Container className="py-section">
        <div className="space-y-card">
          <Breadcrumbs className="text-text/60" items={[{ label: "Resources" }]} />

          <div className="space-y-tile">
            <h1 className="text-h1 tracking-tightish text-white">Resources</h1>
            <p className="text-body text-muted max-w-[70ch]">
              Practical articles and guides on branding, design, and building better websites.
            </p>
          </div>

          <div
            ref={stickyBarRef}
            className="sticky z-30 rounded-panel bg-bg/70 backdrop-blur border border-white/10 shadow-tile"
            style={{ top: barTop }}
          >
            <div className="p-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-pill border border-white/10 bg-surface text-text hover:bg-white/5"
                  aria-label={mobileSearchOpen ? "Close search" : "Open search"}
                  onClick={() => {
                    setMobileSearchOpen((v) => !v);
                    setTimeout(() => mobileInputRef.current?.focus(), 0);
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </button>

                <div className="hidden md:block w-[320px] relative">
                  <input
                    ref={desktopInputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Escape" && setQuery("")}
                    placeholder="Search posts..."
                    aria-label="Search posts..."
                    className={inputBase}
                  />
                  {query ? (
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-pill text-text hover:bg-white/5"
                      onClick={() => {
                        setQuery("");
                        desktopInputRef.current?.focus();
                      }}
                      aria-label="Clear search"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </button>
                  ) : null}
                </div>

                <div className={`md:hidden flex-1 ${mobileSearchOpen ? "block" : "hidden"}`}>
                  <div className="relative">
                    <input
                      ref={mobileInputRef}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          setQuery("");
                          setMobileSearchOpen(false);
                        }
                      }}
                      placeholder="Search..."
                      aria-label="Search posts..."
                      className={inputBase}
                    />
                    {query ? (
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-pill text-text hover:bg-white/5"
                        onClick={() => {
                          setQuery("");
                          mobileInputRef.current?.focus();
                        }}
                        aria-label="Clear search"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </button>
                    ) : null}
                  </div>
                </div>

                <div className="flex-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none]" aria-label="Filter">
                  <style>{`._hide::-webkit-scrollbar{display:none;}`}</style>
                  <div className="_hide flex items-center gap-2 whitespace-nowrap pr-1">
                    {pills.map((p, i) => {
                      const active = p === activePill;
                      return (
                        <button
                          key={p}
                          ref={(el) => {
                            pillRefs.current[i] = el;
                          }}
                          type="button"
                          onClick={() => handleSelectPill(p, i)}
                          onKeyDown={(e) => handlePillKeyDown(e, i)}
                          className={`${pillBase} ${active ? pillActive : ""}`}
                          aria-pressed={active}
                          tabIndex={active ? 0 : -1}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[22px]">
            {showFeatured && featured.length ? (
              <section>
                <div className="mb-4 flex items-end justify-between">
                  <h2 className="text-lg font-semibold tracking-tight text-white">Featured</h2>
                  <span className="text-sm text-muted">Curated picks</span>
                </div>

                <div
                  ref={featScrollerRef}
                  className="relative overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]"
                  style={{ WebkitOverflowScrolling: "touch" }}
                  aria-label="Featured carousel"
                >
                  <style>{`.ggx-hide-scrollbar::-webkit-scrollbar{display:none;}`}</style>
                  <div className="ggx-hide-scrollbar flex gap-4 px-2 snap-x snap-mandatory">
                    {featured.map((it, idx) => (
                      <div
                        key={it.slug}
                        ref={(el) => {
                          featSlideRefs.current[idx] = el;
                          featSlideRefs.current.length = featured.length;
                        }}
                        className="w-[92%] sm:w-[86%] md:w-[80%] shrink-0 snap-center"
                      >
                        <FeaturedCard item={it} href={`/resources/${it.slug}`} />
                      </div>
                    ))}
                  </div>
                </div>

                {featured.length > 1 ? (
                  <div className="mt-3 flex justify-center gap-2">
                    {featured.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Go to featured ${i + 1}`}
                        onClick={() => scrollFeaturedTo(i)}
                        className={`h-2 w-2 rounded-full bg-white transition-opacity ${
                          i === featIndex ? "opacity-100" : "opacity-30 hover:opacity-60"
                        }`}
                      />
                    ))}
                  </div>
                ) : null}
              </section>
            ) : null}

            <section>
              <div className="mb-4 mt-0 flex items-end justify-between">
                <h2 className="text-lg font-semibold tracking-tight text-white">{sectionTitle}</h2>

                <div className="relative inline-flex items-center">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortMode)}
                    aria-label="Sort by"
                    className="bg-transparent text-sm text-muted outline-none"
                    style={{ WebkitAppearance: "none", appearance: "none", paddingRight: 32, paddingLeft: 8 }}
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                  </select>
                  <svg className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-muted/70" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5">
                {visibleItems.map((it) => (
                  <GridCard key={it.slug} item={it} href={`/resources/${it.slug}`} />
                ))}
              </div>

              <div className="mt-7">
                <div className="text-sm text-muted">
                  Showing <span className="font-semibold text-text">{showingFrom}</span>-
                  <span className="font-semibold text-text">{showingTo}</span> of <span className="font-semibold text-text">{totalItems}</span>
                </div>
                <div ref={sentinelRef} className="h-10" />
              </div>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}

function FeaturedCard({ item, href }: { item: BlogMeta; href: string }) {
  return (
    <Link href={href} className="group block">
      <div className="relative overflow-hidden rounded-tile bg-black aspect-[16/10] sm:aspect-[21/9] shadow-tile border border-white/10">
        {item.thumbnail ? (
          <Image src={item.thumbnail} alt={item.title} fill sizes="(max-width: 768px) 100vw, 70vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" priority />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0" />
        )}

        <div className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:block">
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="text-sm font-semibold leading-snug">{item.title}</div>
            {item.excerpt ? <div className="mt-2 text-xs leading-snug text-white/85">{item.excerpt}</div> : null}
          </div>
        </div>
      </div>

      <div className="mt-2 md:hidden">
        <div className="text-sm font-semibold leading-snug text-white">{item.title}</div>
      </div>
    </Link>
  );
}

function GridCard({ item, href }: { item: BlogMeta; href: string }) {
  return (
    <Link href={href} className="group block">
      <div className="relative overflow-hidden rounded-tile bg-black aspect-square sm:aspect-[4/3] shadow-tile border border-white/10">
        {item.thumbnail ? (
          <Image src={item.thumbnail} alt={item.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0" />
        )}

        <div className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:block">
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="text-sm font-semibold leading-snug">{item.title}</div>
          </div>
        </div>
      </div>

      <div className="mt-2 md:hidden">
        <div className="text-sm font-semibold leading-snug text-white">{item.title}</div>
      </div>
    </Link>
  );
}

