"use client";

import * as React from "react";

type Props = {
  /** Inner layout class (controls constrained vs full-bleed padding) */
  innerClass: string;
  /** Current bar height in px (used for smooth collapse) */
  height: number;
  /** Base height when visible */
  baseHeight?: number;
  /** Called whenever the bar should change height */
  onHeightChange: (next: number) => void;
  /** Optional scroll container (if your page uses an inner scroll area) */
  scrollEl?: HTMLElement | null;
  /** If true, the bar reappears when scrolling up */
  showOnScrollUp?: boolean;
  /** Content */
  text?: string;
  ctaText?: string;
};

export default function AnnouncementBar({
  innerClass,
  height,
  baseHeight = 40,
  onHeightChange,
  scrollEl = null,
  showOnScrollUp = true,
  text = "Site under construction.",
  ctaText = "Learn more →",
}: Props) {
  const lastY = React.useRef<number>(0);
  const lastApplied = React.useRef<number>(-1);

  React.useEffect(() => {
    const getY = () => {
      if (scrollEl) return scrollEl.scrollTop || 0;
      return window.scrollY || document.documentElement.scrollTop || 0;
    };

    // Hysteresis to prevent flicker
    const DOWN_HIDE_DELTA = 6;   // px moved down before we hide
    const UP_SHOW_DELTA = 12;    // px moved up before we show (if enabled)

    const apply = (next: number) => {
      if (lastApplied.current !== next) {
        lastApplied.current = next;
        onHeightChange(next);
      }
    };

    const update = () => {
      const y = getY();
      const prev = lastY.current;
      lastY.current = y;

      // Always show at the very top
      if (y <= 0) {
        apply(baseHeight);
        return;
      }

      const dy = y - prev;

      // Scrolling down: hide
      if (dy > DOWN_HIDE_DELTA) {
        apply(0);
        return;
      }

      // Scrolling up: show (optional)
      if (showOnScrollUp && dy < -UP_SHOW_DELTA) {
        apply(baseHeight);
        return;
      }

      // Otherwise keep whatever state we're in (no-op)
    };

    // Initialize
    lastY.current = getY();
    update();

    const opts: AddEventListenerOptions = { passive: true };
    if (scrollEl) {
      scrollEl.addEventListener("scroll", update, opts);
    } else {
      window.addEventListener("scroll", update, opts);
    }
    window.addEventListener("resize", update);

    return () => {
      if (scrollEl) {
        scrollEl.removeEventListener("scroll", update, opts);
      } else {
        window.removeEventListener("scroll", update, opts);
      }
      window.removeEventListener("resize", update);
    };
  }, [baseHeight, onHeightChange, scrollEl, showOnScrollUp]);

  const isHidden = height <= 0;

  return (
    <div
      style={{
        height: `${height}px`,
        transitionProperty: "height",
        transitionDuration: "220ms",
        transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    >
      <div
        className={[
          innerClass,
          "flex h-full items-center justify-between text-crumbs uppercase tracking-crumbs",
          "transition-[opacity,transform] duration-[220ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]",
          isHidden ? "pointer-events-none opacity-0 -translate-y-1" : "opacity-100 translate-y-0",
        ].join(" ")}
      >
        <div className="flex items-center gap-4 text-text/80">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_0_3px_rgba(251,191,36,0.18)]"
          />
          <span>{text}</span>
        </div>

        <span className="hidden sm:inline text-text/70">{ctaText}</span>
      </div>
    </div>
  );
}
