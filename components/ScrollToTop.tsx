"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    // Ensure we land at the very top when a new slug mounts.
    // Use a small timeout to run after hydration/layout.
    const t = setTimeout(() => {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      } catch {
        // ignore
      }
    }, 0);

    return () => clearTimeout(t);
  }, []);

  return null;
}
