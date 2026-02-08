"use client";

import { useEffect, useState } from "react";

type Props = {
  // Element that represents the "hero" section.
  // Progress bar fades in once the user scrolls past it.
  heroSelector?: string;
};

export default function ReadingProgress({ heroSelector = "[data-hero]" }: Props) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const getHeaderOffset = () => {
      const railTop =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--railTop")
        ) || 0;

      const headerH =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--headerH")
        ) || 96;

      return railTop + headerH;
    };

    const onScroll = () => {
      // progress
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const scrollHeight = doc.scrollHeight || 0;
      const height = window.innerHeight || 1;

      const total = Math.max(1, scrollHeight - height);
      const pct = Math.min(1, Math.max(0, scrollTop / total));
      setProgress(pct);

      // visibility: show after hero is scrolled past
      const hero = document.querySelector(heroSelector) as HTMLElement | null;
      if (!hero) {
        // if hero isn't found, just show once user scrolls a bit
        setIsVisible(scrollTop > 40);
        return;
      }

      const headerOffset = getHeaderOffset();
      const rect = hero.getBoundingClientRect();
      const heroBottomInViewport = rect.bottom;

      // When the hero bottom is above the header bottom line, show the bar
      setIsVisible(heroBottomInViewport <= headerOffset);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [heroSelector]);

  return (
    <div
      className={[
        "pointer-events-none fixed left-0 right-0 z-50 h-[3px] bg-white/15",
        "transition-opacity duration-200",
        isVisible ? "opacity-100" : "opacity-0",
      ].join(" ")}
      style={{
        top: "calc(var(--railTop, 0px) + var(--headerH, 96px))",
      }}
      aria-hidden="true"
    >
      <div className="h-full bg-white" style={{ width: `${progress * 100}%` }} />
    </div>
  );
}
