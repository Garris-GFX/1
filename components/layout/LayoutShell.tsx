"use client";

import type { CSSProperties, ReactNode } from "react";
import * as React from "react";
import AnnouncementBar from "./AnnouncementBar";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import HomeScrollCta from "@/components/home/HomeScrollCta";
import { usePathname } from "next/navigation";

function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  const cx = 3 * p1x;
  const bx = 3 * (p2x - p1x) - cx;
  const ax = 1 - cx - bx;

  const cy = 3 * p1y;
  const by = 3 * (p2y - p1y) - cy;
  const ay = 1 - cy - by;

  function sampleX(t: number) {
    return ((ax * t + bx) * t + cx) * t;
  }
  function sampleY(t: number) {
    return ((ay * t + by) * t + cy) * t;
  }
  function sampleDerivX(t: number) {
    return (3 * ax * t + 2 * bx) * t + cx;
  }

  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;

    let t = x;
    for (let i = 0; i < 6; i++) {
      const xEst = sampleX(t) - x;
      const dEst = sampleDerivX(t);
      if (Math.abs(xEst) < 1e-6) break;
      if (Math.abs(dEst) < 1e-6) break;
      t = t - xEst / dEst;
      if (t < 0) t = 0;
      if (t > 1) t = 1;
    }

    return sampleY(t);
  };
}

export default function LayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const BASE_ANNOUNCE_H = 40;
  const frame = 8;
  const panelRadius = 28;

  const [announceTarget, setAnnounceTarget] = React.useState<number>(
    BASE_ANNOUNCE_H
  );

  const [railTop, setRailTop] = React.useState<number>(BASE_ANNOUNCE_H);
  const railTopRef = React.useRef<number>(BASE_ANNOUNCE_H);

  React.useEffect(() => {
    setAnnounceTarget(BASE_ANNOUNCE_H);
    setRailTop(BASE_ANNOUNCE_H);
    railTopRef.current = BASE_ANNOUNCE_H;
  }, [pathname]);

  const ease = React.useMemo(() => cubicBezier(0.2, 0.8, 0.2, 1), []);
  const DURATION = 220;

  React.useEffect(() => {
    const from = railTopRef.current;
    const to = announceTarget;

    if (from === to) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const p = ease(t);
      const next = from + (to - from) * p;
      railTopRef.current = next;
      setRailTop(next);

      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [announceTarget, ease]);

  const barInnerClass = "mx-auto w-full px-4";

  return (
    <div
      className="relative min-h-screen bg-bg text-text"
      style={
        {
          "--frame": `${frame}px`,
          "--railTop": `${railTop}px`,
        } as CSSProperties
      }
    >
      <div className="fixed inset-x-0 top-0 z-[90] bg-bg">
        <AnnouncementBar
          innerClass={barInnerClass}
          height={announceTarget}
          baseHeight={BASE_ANNOUNCE_H}
          onHeightChange={setAnnounceTarget}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 bottom-[-2px] z-[60]"
        style={{
          height: "calc(100dvh + 2px)",
          minHeight: "calc(100vh + 2px)",
          width: "100vw",
        }}
      >
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <mask id="knockout-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <rect
                x={frame}
                y={`calc(${railTop}px + ${frame}px - 1px)`}
                width={`calc(100% - ${frame * 2}px)`}
                height={`calc(100% - ${frame * 2}px - ${railTop}px + 2px)`}
                rx={panelRadius}
                ry={panelRadius}
                fill="black"
              />
            </mask>
          </defs>

          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="black"
            mask="url(#knockout-mask)"
          />
        </svg>
      </div>

      <div aria-hidden="true" style={{ height: "var(--railTop)" }} />

      <div className="px-[var(--frame)] py-[var(--frame)]">
        <div className="w-full overflow-x-clip rounded-panel bg-page shadow-panel">
          <SiteHeader />

          <main className="shell-main w-full">
            {children}
          </main>
        </div>
      </div>

      {pathname === "/" ? <HomeScrollCta /> : null}

      <div className="relative z-[70] bg-bg">
        <SiteFooter />
      </div>
    </div>
  );
}