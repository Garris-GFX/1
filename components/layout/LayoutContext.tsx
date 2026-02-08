"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type LayoutState = {
  headerHeight: number;
};

const LayoutContext = createContext<LayoutState>({ headerHeight: 64 });

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [headerHeight, setHeaderHeight] = useState<number>(64);

  useEffect(() => {
    const compute = () => {
      const headerEl = document.querySelector<HTMLElement>(".site-header");
      const h = headerEl?.offsetHeight ?? 64;
      setHeaderHeight(h);
    };

    compute();

    const ro = new ResizeObserver(compute);
    const headerEl = document.querySelector(".site-header");
    if (headerEl) ro.observe(headerEl as Element);

    window.addEventListener("resize", compute, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <LayoutContext.Provider value={{ headerHeight }}>{children}</LayoutContext.Provider>
  );
}

export function useLayout() {
  return useContext(LayoutContext);
}
