"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { useEffect, useMemo, useRef, useState } from "react";

export type ScreenSwapItem = {
  id: string;
  title: string;
  href: string; // internal case study route (/work/slug)
  src: string;
  excerpt?: string;
  alt?: string;
  projectUrl?: string; // external URL to display in the fake browser bar
};

type Props = {
  items: ScreenSwapItem[];
  title?: string;
  description?: string;
  className?: string;
  initialIndex?: number;
};

function displayUrl(projectUrl?: string) {
  if (!projectUrl) return "www.example.com";
  try {
    const u = new URL(projectUrl);
    const path = (u.pathname + u.search + u.hash).replace(/\/$/, "");
    const host = u.host.startsWith("www.") ? u.host : `www.${u.host}`;
    return `${host}${path || ""}`;
  } catch {
    return projectUrl.replace(/^https?:\/\//, "");
  }
}

export default function ScreenSwap({
  items,
  title,
  description,
  className,
  initialIndex = 0,
}: Props) {
  const safeItems = useMemo(() => items.filter((x) => x?.src), [items]);
  const total = safeItems.length;

  const [index, setIndex] = useState(() =>
    total ? Math.min(initialIndex, total - 1) : 0
  );
  const [isMobile, setIsMobile] = useState(false);
  const [mobileFace, setMobileFace] = useState<"screen" | "details">("screen");
  const touchStartX = useRef<number | null>(null);

  // one uniform sweep: replay on nav + every few seconds
  const [sweepNonce, setSweepNonce] = useState(0);

  useEffect(() => {
    // Treat tablets (iPads, including iPadOS reporting as Mac) as "mobile"
    // so they use the flip UI (and keep the Details/Screen toggle visible).
    const mq = window.matchMedia("(max-width: 1023px)");

    const isIpad = () => {
      const ua = navigator.userAgent || "";
      const platform = (navigator as any).platform || "";
      const maxTouchPoints = (navigator as any).maxTouchPoints || 0;

      // Classic iPad UA OR iPadOS masquerading as Mac (MacIntel + touch)
      return /iPad/.test(ua) || (platform === "MacIntel" && maxTouchPoints > 1);
    };

    const apply = () => setIsMobile(mq.matches || isIpad());

    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  useEffect(() => {
    setIndex((i) => (total ? Math.min(i, total - 1) : 0));
  }, [total]);

  useEffect(() => {
    setSweepNonce((n) => n + 1); // sweep when slide changes
  }, [index]);

  useEffect(() => {
    // periodic sweep
    const id = window.setInterval(() => setSweepNonce((n) => n + 1), 5200);
    return () => window.clearInterval(id);
  }, []);

  if (!total) return null;

  const active = safeItems[index];
  const canNav = total > 1;
  const progress = (index + 1) / total;

  const go = (dir: 1 | -1) => {
    if (!canNav) return;
    setIndex((i) => (i + dir + total) % total);
    setSweepNonce((n) => n + 1); // sweep immediately on button nav
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;

    if (canNav && Math.abs(delta) > 40) {
      delta < 0 ? go(1) : go(-1);
    }

    touchStartX.current = null;
  };

  const ctaBtn =
    "inline-flex items-center justify-center h-11 px-4 rounded-full border border-white/15 bg-white/[0.03] " +
    "text-small text-text/90 hover:text-text hover:border-white/30 hover:bg-white/[0.05] transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 " +
    "disabled:opacity-40 disabled:cursor-not-allowed";

  const smallBtn =
    "inline-flex items-center justify-center h-10 px-4 rounded-full border border-white/15 bg-white/[0.04] " +
    "text-small text-text/90 hover:text-text hover:border-white/30 hover:bg-white/[0.06] transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25";

  const viewLink =
    "inline-flex items-center gap-2 text-small text-text/85 hover:text-text transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 rounded-pill";

  const InfoCard = ({ compact }: { compact?: boolean }) => (
    <article
      className={
        "relative h-full rounded-card overflow-hidden bg-white/[0.03] border border-white/15 shadow-card " +
        (compact ? "" : "")
      }
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 240px at 30% 0%, rgba(255,255,255,0.06), transparent 55%)",
          opacity: 0.9,
        }}
      />
      <div className="relative p-6 md:p-7 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link
              href={active.href}
              className="inline-block text-h3 font-semibold text-text hover:opacity-90 transition"
            >
              {active.title}
            </Link>
          </div>

          <div className="text-crumbs uppercase tracking-crumbs text-muted shrink-0">
            {index + 1}/{total}
          </div>
        </div>

        {active.excerpt && (
          <p className="mt-5 text-small text-muted leading-relaxed">
            {active.excerpt}
          </p>
        )}

        <div className="mt-6 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-white/50"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>

        <div className="mt-6">
          <Link href={active.href} className={viewLink}>
            View case study <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );

  return (
    <section className={"ssw-root w-full overflow-x-clip " + (className ?? "")}>
      {(title || description) && (
        <div className="mx-6 md:mx-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              {title && (
                <Reveal variant="mask" maskTone="page">
                  <h2 className="text-h2 font-semibold tracking-tightish">
                    {title}
                  </h2>
                </Reveal>
              )}
              {description && (
                <Reveal variant="mask" maskTone="page" delay={80}>
                  <p className="text-body text-text/85 max-w-[52ch]">
                    {description}
                  </p>
                </Reveal>
              )}
            </div>

            <Reveal variant="fade" delay={120} y={8}>
              <div className="hidden md:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  disabled={!canNav}
                  className={ctaBtn}
                  aria-label="Previous project"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  disabled={!canNav}
                  className={ctaBtn}
                  aria-label="Next project"
                >
                  Next
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      )}

      <div className="mx-6 md:mx-12 mt-4 md:mt-8">
        {/* MOBILE: flip stage (screen <-> details) */}
        {isMobile ? (
          <Reveal variant="fade" delay={120} y={10}>
            <div className="ssw-flipStage">
              <div
                className={
                  "ssw-flipInner " +
                  (mobileFace === "details" ? "is-flipped" : "")
                }
              >
                {/* FRONT: screen */}
                <div
                  className="ssw-face ssw-face--front"
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
                  style={{ touchAction: "pan-y" }}
                >
                  <div className="relative group">
                    <div className="ssw-window">
                      <div className="ssw-chrome">
                        <div className="ssw-dots" aria-hidden="true">
                          <span className="ssw-dot ssw-dot--red" />
                          <span className="ssw-dot ssw-dot--yellow" />
                          <span className="ssw-dot ssw-dot--green" />
                        </div>

                        <div className="ssw-addressRow">
                          <div className="ssw-address" aria-label="Address bar">
                            <span className="ssw-url">
                              {displayUrl(active.projectUrl)}
                            </span>
                          </div>

                          <div
                            className="ssw-mobileNav"
                            aria-label="Project navigation"
                          >
                            <button
                              type="button"
                              onClick={() => go(-1)}
                              disabled={!canNav}
                              className="ssw-navBtn"
                              aria-label="Previous project"
                            >
                              ‹
                            </button>
                            <button
                              type="button"
                              onClick={() => go(1)}
                              disabled={!canNav}
                              className="ssw-navBtn"
                              aria-label="Next project"
                            >
                              ›
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="ssw-viewport">
                        <div
                          className="ssw-slides"
                          style={{ transform: `translateX(-${index * 100}%)` }}
                        >
                          {safeItems.map((item) => (
                            <div key={item.id} className="ssw-slide">
                              <Image
                                src={item.src}
                                alt={item.alt || item.title}
                                fill
                                style={{
                                  objectFit: "cover",
                                  objectPosition: "center",
                                }}
                                className="bg-page"
                                sizes="100vw"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="pointer-events-none absolute inset-0 overflow-hidden">
                          <div key={sweepNonce} className="ssw-sweep" />
                          <div className="ssw-soft" />
                        </div>

                        {/* mobile flip control */}
                        <div className="absolute bottom-4 right-4 z-20">
                          <button
                            type="button"
                            className={smallBtn}
                            onClick={() => {
                              setMobileFace("details");
                            }}
                            aria-label="Show details"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BACK: details card */}
                <div className="ssw-face ssw-face--back">
                  <div className="relative">
                    <div className="ssw-cardShell">
                      <InfoCard compact />
                      <div className="absolute bottom-4 right-4">
                        <button
                          type="button"
                          className={smallBtn}
                          onClick={() => setMobileFace("screen")}
                          aria-label="Show screen"
                        >
                          Screen
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ) : (
          // DESKTOP: original grid (screen spans 2 cols)
          <Reveal variant="fade" delay={120} y={10}>
            <div className="flex flex-col gap-10 md:grid md:grid-cols-3 md:gap-6 md:items-start">
              {/* RIGHT: fake window */}
              <div
                className="relative z-30 group md:col-span-2 order-1 md:order-2"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                style={{ touchAction: "pan-y" }}
              >
                <div className="ssw-window">
                  <div className="ssw-chrome">
                    <div className="ssw-dots" aria-hidden="true">
                      <span className="ssw-dot ssw-dot--red" />
                      <span className="ssw-dot ssw-dot--yellow" />
                      <span className="ssw-dot ssw-dot--green" />
                    </div>
                    <div className="ssw-address" aria-label="Address bar">
                      <span className="ssw-lock" aria-hidden="true">
                        ⌁
                      </span>
                      <span className="ssw-url">
                        {displayUrl(active.projectUrl)}
                      </span>
                    </div>
                  </div>

                  <div className="ssw-viewport">
                    <div
                      className="ssw-slides"
                      style={{ transform: `translateX(-${index * 100}%)` }}
                    >
                      {safeItems.map((item) => (
                        <div key={item.id} className="ssw-slide">
                          <Image
                            src={item.src}
                            alt={item.alt || item.title}
                            fill
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                            className="bg-page"
                            sizes="(min-width: 768px) 66vw, 100vw"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                      <div key={sweepNonce} className="ssw-sweep" />
                      <div className="ssw-soft" />
                    </div>
                  </div>
                </div>
              </div>

              {/* LEFT: info */}
              <div className="relative z-20 order-2 md:order-1">
                <InfoCard />
              </div>
            </div>
          </Reveal>
        )}
      </div>

      <style jsx>{`
        :global(.ssw-root) {
          --radius: 22px;
          --chromeH: 52px;
          --stageH: clamp(360px, 44vw, 520px);
        }
        @media (max-width: 767px) {
          :global(.ssw-root) {
            --chromeH: 50px;
            --stageH: auto;
          }
        }

        .ssw-window {
          height: var(--stageH);
          border-radius: var(--radius);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.035);
        }
        @media (max-width: 767px) {
          .ssw-window {
            height: auto;
          }
        }

        .ssw-chrome {
          height: var(--chromeH);
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 12px;
          align-items: center;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        }

        .ssw-dots {
          display: inline-flex;
          gap: 7px;
          align-items: center;
          padding-left: 2px;
        }
        .ssw-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          opacity: 0.9;
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        }
        .ssw-dot--red {
          background: rgba(255, 90, 90, 0.95);
        }
        .ssw-dot--yellow {
          background: rgba(255, 204, 90, 0.95);
        }
        .ssw-dot--green {
          background: rgba(110, 255, 160, 0.9);
        }

        .ssw-address {
          min-width: 0;
          height: 32px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.04);
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 12px;
        }

        .ssw-addressRow {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ssw-addressRow .ssw-address {
          flex: 1 1 auto;
        }

        .ssw-mobileNav {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          flex: 0 0 auto;
        }

        .ssw-navBtn {
          width: 32px;
          height: 32px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.78);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          line-height: 1;
          transition:
            background 180ms ease,
            border-color 180ms ease,
            color 180ms ease,
            opacity 180ms ease;
        }

        .ssw-navBtn:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.95);
        }

        .ssw-navBtn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .ssw-url {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
          letter-spacing: 0.01em;
        }

        .ssw-viewport {
          position: relative;
          height: calc(100% - var(--chromeH));
          overflow: hidden;
          background: rgba(0, 0, 0, 0.25);
        }
        @media (max-width: 767px) {
          .ssw-viewport {
            height: auto;
            aspect-ratio: 16 / 10;
          }
        }

        .ssw-slides {
          height: 100%;
          display: flex;
          transition: transform 500ms ease-out;
        }
        .ssw-slide {
          min-width: 100%;
          height: 100%;
          position: relative;
        }

        /* one uniform sweep */
        .ssw-sweep {
          position: absolute;
          top: -40%;
          left: -80%;
          width: 55%;
          height: 200%;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255, 255, 255, 0.08) 42%,
            rgba(255, 255, 255, 0.22) 50%,
            rgba(255, 255, 255, 0.08) 58%,
            transparent 100%
          );
          transform: rotate(14deg);
          animation: sswSweepOnce 950ms ease-in-out both;
          opacity: 0;
          mix-blend-mode: screen;
          filter: blur(0.5px);
        }

        .ssw-soft {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              120% 80% at 60% 30%,
              rgba(255, 255, 255, 0.04),
              transparent 55%
            ),
            radial-gradient(
              120% 90% at 35% 70%,
              rgba(255, 255, 255, 0.03),
              transparent 60%
            );
          opacity: 0.8;
          mix-blend-mode: screen;
        }

        @keyframes sswSweepOnce {
          0% {
            transform: translateX(0) rotate(14deg);
            opacity: 0;
          }
          12% {
            opacity: 0.25;
          }
          55% {
            opacity: 0.25;
          }
          100% {
            transform: translateX(260%) rotate(14deg);
            opacity: 0;
          }
        }

        /* -------------------------- */
        /* Mobile flip (fix bleed-thru) */
        /* -------------------------- */
        .ssw-flipStage {
          position: relative;
          width: 100%;
          perspective: 1400px;
          -webkit-perspective: 1400px;
        }

        .ssw-flipInner {
          position: relative;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
          transition: transform 520ms cubic-bezier(0.2, 0.9, 0.2, 1);
        }

        .ssw-flipInner.is-flipped {
          transform: rotateY(180deg);
        }

        .ssw-face {
          position: relative;
          width: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translateZ(0.001px);
          -webkit-transform: translateZ(0.001px);
        }

        .ssw-face--back {
          position: absolute;
          inset: 0;
          transform: rotateY(180deg);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .ssw-cardShell {
          position: relative;
          border-radius: var(--radius);
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}

ScreenSwap.displayName = "ScreenSwap";