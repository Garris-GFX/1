"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { IBM_Plex_Mono } from "next/font/google";
import ToolIcons from "@/components/ToolIcons";

const SERVICES = [
  "Branding",
  "Websites",
  "Graphics",
  "Systems",
  "Hosting",
  "Support",
] as const;

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
});

function useRotatingWord(words: readonly string[], ms = 2200) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!words.length) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, ms);
    return () => window.clearInterval(id);
  }, [words, ms]);

  return words[index] ?? "";
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function ToolMarquee() {
  const tools = useMemo(
    () => [
      "Figma",
      "Illustrator",
      "Photoshop",
      "InDesign",
      "After Effects",
      "Premiere Pro",
      "Next.js",
      "Tailwind",
      "TypeScript",
      "Vercel",
      "GitHub",
      "Notion",
      "Linear",
      "Slack",
      "GA4",
      "Search Console",
    ],
    []
  );

  const loop = useMemo(() => [...tools, ...tools], [tools]);

  return (
    <div className="mt-8">
      <div className="ssw-marqueeMask relative overflow-hidden">
        <div className="ssw-marquee">
          <div className="ssw-marqueeTrack">
            <ToolIcons
              tools={loop}
              variant="tiles"
              tileSize={40}
              tileRadiusClass="rounded-pill"
              className="gap-3"
              useBrandColors={true}
              showLabels={true}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .ssw-marqueeMask {
          width: 100%;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .ssw-marquee {
          width: 100%;
        }

        .ssw-marqueeTrack {
          display: inline-flex;
          align-items: center;
          width: max-content;
          animation: sswMarquee 40s linear infinite;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .ssw-marqueeTrack {
            animation: none;
          }
        }

        @keyframes sswMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

export default function HomeHero() {
  const prefersReducedMotion = useReducedMotion();
  const word = useRotatingWord(SERVICES, 2200);

  const sectionRef = useRef<HTMLElement | null>(null);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const [videoHeight, setVideoHeight] = useState(520);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const mobile = window.innerWidth < 768;

      const nextVideoHeight = mobile ? 660 : 800;
      const fadeDistance = mobile ? 300 : 420;

      setVideoHeight(nextVideoHeight);

      const scrolledPastHeroTop = clamp(-rect.top, 0, fadeDistance);
      const nextOpacity = 1 - scrolledPastHeroTop / fadeDistance;

      setVideoOpacity(clamp(nextOpacity, 0, 1));
    };

    const requestUpdate = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate -mt-24"
      style={{
        paddingTop: "clamp(6rem, 8vw, 11rem)",
        paddingBottom: "clamp(5rem, 10vw, 10rem)",
      }}
    >
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-0 overflow-hidden"
        style={{
          height: `${videoHeight}px`,
          opacity: videoOpacity,
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          >
            <source src="/video1.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="absolute inset-0 bg-black/64" />

        <div
          className="absolute inset-x-0 top-0 h-40 md:h-52"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.10), rgba(255,255,255,0.04) 42%, rgba(255,255,255,0) 100%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 34%, rgba(255,255,255,0.08), transparent 60%)",
          }}
        />

        <div
          className="absolute inset-x-0 bottom-0 h-32 md:h-40"
          style={{
            background:
              "linear-gradient(to bottom, rgba(30,30,30,0) 0%, rgba(30,30,30,0.55) 55%, rgba(30,30,30,0.92) 82%, #1e1e1e 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-6 md:mx-12">
        <div className="max-w-[1080px]">
          <motion.h1 layout className="text-h1 tracking-tight text-white">
            I design and build{" "}
            {prefersReducedMotion ? (
              <>
                <span
                  className={`${plexMono.className} inline-block font-medium tracking-[-0.03em] text-amber-400`}
                >
                  {word}
                </span>{" "}
                that actually ship.
              </>
            ) : (
              <>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={word}
                    layout
                    initial={{ y: 10, opacity: 0, filter: "blur(6px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -10, opacity: 0, filter: "blur(6px)" }}
                    transition={{
                      duration: 0.35,
                      ease: "easeOut",
                      layout: { duration: 0.35, ease: "easeOut" },
                    }}
                    className={`${plexMono.className} inline-block font-medium tracking-[-0.03em] text-amber-400`}
                  >
                    {word}
                  </motion.span>
                </AnimatePresence>

                <motion.span
                  layout
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {" "}
                  that actually ship.
                </motion.span>
              </>
            )}
          </motion.h1>

          <p className="mt-6 max-w-[720px] text-body text-white/72">
            Clean design, tight systems, and production-ready builds. From a
            logo and brand kit to a full website with hosting and ongoing
            support.
          </p>

          <ToolMarquee />

          <div className="mt-10 flex flex-wrap items-center gap-3 text-small text-white/72">
            <span className="rounded-pill border border-white/14 bg-white/6 px-3 py-1">
              Fast turnaround
            </span>
            <span className="rounded-pill border border-white/14 bg-white/6 px-3 py-1">
              Built in Next.js
            </span>
            <span className="rounded-pill border border-white/14 bg-white/6 px-3 py-1">
              Hosting + maintenance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}