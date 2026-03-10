"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  href?: string;
  label?: string;
  showAfter?: number;
};

export default function HomeScrollCta({
  href = "/pricing",
  label = "Start a project",
  showAfter = 320,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > showAfter);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  return (
    <div
      className={[
        "pointer-events-none fixed inset-x-0 bottom-4 z-[80] flex justify-center px-4",
        "transition-all duration-300 ease-out",
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0",
      ].join(" ")}
      aria-hidden={!isVisible}
    >
      <Link
        href={href}
        className={[
          "pointer-events-auto inline-flex items-center justify-center",
          "h-11 rounded-full px-5",
          "border border-white/15 bg-white/[0.06] backdrop-blur-md",
          "text-small text-text/95 shadow-card",
          "transition hover:bg-white/[0.09] hover:border-white/25",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25",
        ].join(" ")}
      >
        {label}
      </Link>
    </div>
  );
}

HomeScrollCta.displayName = "HomeScrollCta";