"use client";

import type { CSSProperties, ReactNode } from "react";
import * as React from "react";
import { usePathname } from "next/navigation";
import AnnouncementBar from "./AnnouncementBar";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import FloatingLogo from "./FloatingLogo";

/**
 * Fix for "frame moves up when bar disappears":
 * The issue was timing - `--railTop` was jumping instantly (40 -> 0) while the spacer/bar were animating,
 * so the knockout hole moved early. Here we animate `--railTop` in JS (rAF) over the same duration/ease
 * as the AnnouncementBar height transition. That keeps the frame + content + sticky header locked together.
 *
 * Visual styles unchanged.
 */

function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  // Returns y for a given x in [0,1] for the cubic-bezier curve.
  // Uses Newton-Raphson to invert x(t) = x, then compute y(t).
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

    // Initial guess
    let t = x;
    // Newton-Raphson iterations
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
  const isHome = pathname === "/";

  const BASE_ANNOUNCE_H = 40;
  const frame = 8;
  const panelRadius = 28;

  // Target from AnnouncementBar (0 or 40)
  const [announceTarget, setAnnounceTarget] = React.useState<number>(BASE_ANNOUNCE_H);

  // Animated rail height used everywhere (frame hole, spacer, sticky header top)
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

  const barInnerClass = isHome ? "w-full px-[var(--frame)]" : "mx-auto w-full px-4";

  return (
    <div
      className="min-h-screen bg-bg text-text relative"
      style={
        {
          "--frame": `${frame}px`,
          "--railTop": `${railTop}px`,
        } as CSSProperties
      }
    >
      {/* Fixed announcement bar (its own height animation stays in AnnouncementBar) */}
      <div className="fixed inset-x-0 top-0 z-[90] bg-bg">
        <AnnouncementBar
          innerClass={barInnerClass}
          height={announceTarget}
          baseHeight={BASE_ANNOUNCE_H}
          onHeightChange={setAnnounceTarget}
        />
      </div>

      {/* Knockout overlay: DO NOT transform this. Its hole tracks the animated --railTop. */}
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

          <rect x="0" y="0" width="100%" height="100%" fill="black" mask="url(#knockout-mask)" />
        </svg>
      </div>

      {/* Spacer pushes the document down/up (sticky header works). No CSS transition needed now. */}
      <div aria-hidden="true" style={{ height: "var(--railTop)" }} />

      {/* Page shell (normal flow) */}
      <div className="px-[var(--frame)] py-[var(--frame)]">
        <div className="w-full rounded-panel bg-page shadow-panel">
          <SiteHeader />
          <main>{children}</main>
        </div>
      </div>

      {/* Footer above overlay */}
      <div className="relative z-[70] bg-bg">
        <SiteFooter constrain={!isHome} />
      </div>

      {/* Floating logo bottom-right */}
      <div className="relative z-[80]">
        <FloatingLogo ariaHidden={false} />
      </div>
    </div>
  );
}
