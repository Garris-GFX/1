"use client";

import * as React from "react";

type MaskTone = "page" | "surface";

type RevealProps = {
  children: React.ReactNode;
  className?: string;

  /** "fade" = simple fade/slide up, "mask" = text comes from under a subtle gradient mask */
  variant?: "fade" | "mask";

  /** IntersectionObserver threshold */
  threshold?: number;

  /** Root margin for earlier/later trigger (ex: "0px 0px -10% 0px") */
  rootMargin?: string;

  /** If true, only animates the first time it enters view */
  once?: boolean;

  /** Delay in ms */
  delay?: number;

  /** Duration in ms */
  duration?: number;

  /** For mask variant: what background tone should the mask use? */
  maskTone?: MaskTone;

  /** A little slide distance (px) */
  y?: number;
};

function toneToRgbVar(tone: MaskTone) {
  return tone === "surface" ? "--color-surface-rgb" : "--color-page-rgb";
}

export default function Reveal({
  children,
  className,
  variant = "mask",
  threshold = 0.2,
  rootMargin = "0px 0px -10% 0px",
  once = true,
  delay = 0,
  duration = 700,
  maskTone = "page",
  y = 10,
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReduced) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  const rgbVar = toneToRgbVar(maskTone);

  return (
    <div
      ref={ref}
      data-reveal={variant}
      data-inview={inView ? "true" : "false"}
      className={className}
      style={
        {
          // timings
          ["--rv-delay" as any]: `${delay}ms`,
          ["--rv-duration" as any]: `${duration}ms`,
          ["--rv-y" as any]: `${y}px`,
          // mask tone
          ["--rv-mask-rgb" as any]: `var(${rgbVar})`,
        } as React.CSSProperties
      }
    >
      {children}

      {/* Global styles for the Reveal system (loaded once wherever component is used) */}
      <style jsx global>{`
        /* Base */
        [data-reveal] {
          --_rv-ease: cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        /* Fade/slide */
        [data-reveal="fade"] {
          opacity: 0;
          transform: translateY(var(--rv-y));
          transition:
            opacity var(--rv-duration) var(--_rv-ease) var(--rv-delay),
            transform var(--rv-duration) var(--_rv-ease) var(--rv-delay);
          will-change: opacity, transform;
        }
        [data-reveal="fade"][data-inview="true"] {
          opacity: 1;
          transform: translateY(0);
        }

        /* Mask reveal
           Wrap your text block directly with <Reveal variant="mask">.
           This treats the wrapper as the clipping container and animates its contents in.
        */
        [data-reveal="mask"] {
          position: relative;
          overflow: hidden;
        }

        /* The content comes up slightly + fades in */
        [data-reveal="mask"] > * {
          opacity: 0;
          transform: translateY(var(--rv-y));
          transition:
            opacity var(--rv-duration) var(--_rv-ease) var(--rv-delay),
            transform var(--rv-duration) var(--_rv-ease) var(--rv-delay);
          will-change: opacity, transform;
        }

        [data-reveal="mask"][data-inview="true"] > * {
          opacity: 1;
          transform: translateY(0);
        }

        /* The actual mask: a soft gradient using the CONTAINER tone (page/surface),
           so it looks like it's emerging from the slab rather than the global bg. */
        [data-reveal="mask"]::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;

          /* A subtle "cover" that fades away upward */
          background: linear-gradient(
            to top,
            rgb(var(--rv-mask-rgb) / 1) 0%,
            rgb(var(--rv-mask-rgb) / 0.96) 25%,
            rgb(var(--rv-mask-rgb) / 0.65) 55%,
            rgb(var(--rv-mask-rgb) / 0) 100%
          );

          transform: translateY(0);
          opacity: 1;

          transition:
            transform var(--rv-duration) var(--_rv-ease) var(--rv-delay),
            opacity var(--rv-duration) var(--_rv-ease) var(--rv-delay);
          will-change: transform, opacity;
        }

        [data-reveal="mask"][data-inview="true"]::after {
          transform: translateY(-35%);
          opacity: 0;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          [data-reveal="fade"],
          [data-reveal="mask"] > * {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          [data-reveal="mask"]::after {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}