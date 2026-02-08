"use client";
import { useEffect, useRef, useCallback } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  a: number;
  tw: number;
  o: number;
  tail?: number;
  vy?: number;
};

export default function StarsBackground({
  density = 0.0009,
  maxRadius = 1.6,
  twinkle = true,
  shootingStars = true,
  className,
}: {
  density?: number;
  maxRadius?: number;
  twinkle?: boolean;
  shootingStars?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const sizeRef = useRef<{ w: number; h: number; dpr: number; pw: number; ph: number } | null>(null);
  const initAttempts = useRef(0);
  const motionOk = useRef(true);
  const shootRef = useRef<{ x: number; y: number; vx: number; vy: number; life: number } | null>(null);
  const DEBUG = false;
  const SPEED_FACTOR = 0.62;
  const DIM_FACTOR = 0.62;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionOk.current = !mq.matches;
    const onChange = () => (motionOk.current = !mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const init = useCallback(function doInit() {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    const rect = cvs.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));

    if ((w === 1 || h === 1) && initAttempts.current < 6) {
      initAttempts.current += 1;
      setTimeout(doInit, 120);
      return;
    }

    cvs.width = Math.floor(w * dpr);
    cvs.height = Math.floor(h * dpr);
    cvs.style.width = `${w}px`;
    cvs.style.height = `${h}px`;

    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    sizeRef.current = { w, h, dpr, pw: cvs.width, ph: cvs.height };
    initAttempts.current = 0;

    const count = Math.max(60, Math.floor(w * h * density));
    const stars: Star[] = new Array(count).fill(0).map(() => {
      const effectiveMax = Math.max(1.6, (maxRadius || 1.6) * 2.2);
      const r = 1.2 + Math.random() * (effectiveMax - 1.2);
      const tail = 0;
      let vy = 6 + Math.random() * 20 + (r - 1) * 6;
      vy = vy * SPEED_FACTOR;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r,
        a: 0.45 + Math.random() * 0.55,
        tw: 0.6 + Math.random() * 1.2,
        o: Math.random() * Math.PI * 2,
        tail,
        vy,
      };
    });

    starsRef.current = stars;
    if (DEBUG) console.log("StarsBackground init ->", { w, h, dpr, count });
  }, [density, maxRadius, DEBUG]);

  useEffect(() => {
    const id = setTimeout(() => init(), 50);
    const onResize = () => init();
    window.addEventListener("resize", onResize);

    const cvs = canvasRef.current;
    let ro: ResizeObserver | null = null;
    if (cvs && typeof ResizeObserver !== "undefined") {
      let observeEl: Element | null = cvs.parentElement;
      try {
        while (observeEl) {
          const pos = window.getComputedStyle(observeEl).position;
          if (pos && pos !== "static") break;
          observeEl = observeEl.parentElement;
        }
      } catch {
        observeEl = cvs.parentElement;
      }

      if (observeEl) {
        ro = new ResizeObserver((entries) => {
          for (const e of entries) {
            const r = e.contentRect;
            if (r.width > 0 && r.height > 0) {
              init();
            }
          }
        });
        ro.observe(observeEl);
      }
    }
    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", onResize);
      if (ro) ro.disconnect();
    };
  }, [init]);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    let last = performance.now();
    let running = true;

    const loop = (t: number) => {
      if (!running) return;
      if (!starsRef.current.length) init();
      const fallbackDpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      const curSize = sizeRef.current;
      const curDpr = curSize?.dpr ?? fallbackDpr;
      const pw = curSize?.pw ?? cvs.width;
      const ph = curSize?.ph ?? cvs.height;
      const logicalW = curSize?.w ?? Math.floor(pw / curDpr);
      const logicalH = curSize?.h ?? Math.floor(ph / curDpr);
      ctx.clearRect(0, 0, pw, ph);

      const elapsed = (t - last) / 1000;
      last = t;

      const twinkleAmt = motionOk.current && twinkle ? 1 : 0;

      for (const s of starsRef.current) {
        const twAlpha = twinkleAmt ? 0.6 * Math.sin(s.tw * t * 0.001 + s.o) : 0;
        let alpha = Math.max(0, Math.min(1, s.a * (0.9 + twAlpha)));
        alpha = alpha * DIM_FACTOR;
        if (motionOk.current && s.vy) {
          s.y -= s.vy * elapsed;
          const wrapMargin = 40;
          if (s.y < -wrapMargin) {
            s.y = logicalH + Math.random() * 40;
          }
        }

        const px = Math.floor(s.x * curDpr);
        const py = Math.floor(s.y * curDpr);
        const size = Math.max(1, Math.round(s.r * curDpr * 1.15));
        const segSize = Math.max(1, size);
        const half = Math.floor(segSize / 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        if (segSize <= 1) {
          ctx.fillRect(px, py, 1, 1);
        } else {
          ctx.fillRect(px - half, py - half, segSize, segSize);
        }
      }

      if (motionOk.current && shootingStars) {
        if (!shootRef.current && Math.random() < 0.003) {
          const fromTop = Math.random() < 0.5;
          const x = fromTop ? Math.random() * logicalW : -40;
          const y = fromTop ? -40 : Math.random() * (logicalH * 0.4);
          shootRef.current = {
            x,
            y,
            vx: 400 + Math.random() * 200,
            vy: 220 + Math.random() * 160,
            life: 0.7 + Math.random() * 0.8,
          };
        }
        if (shootRef.current) {
          const s = shootRef.current;
          s.life -= elapsed;
          s.x += s.vx * elapsed;
          s.y += s.vy * elapsed;
          const sx = Math.floor(s.x * curDpr);
          const sy = Math.floor(s.y * curDpr);
          const ex = Math.floor((s.x - s.vx * 0.02) * curDpr);
          const ey = Math.floor((s.y - s.vy * 0.02) * curDpr);
          ctx.strokeStyle = `rgba(255,255,255,${Math.max(0.2, Math.min(1, s.life))})`;
          ctx.lineWidth = Math.max(1, Math.round(1 * curDpr));
          ctx.beginPath();
          ctx.moveTo(ex, ey);
          ctx.lineTo(sx, sy);
          ctx.stroke();
          if (s.life <= 0 || s.x > logicalW + 80 || s.y > logicalH + 80) {
            shootRef.current = null;
          }
        }
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [twinkle, shootingStars, init]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 block h-full w-full ${className ?? ""}`}
      style={{ background: '#000', transform: 'translateZ(0)', willChange: 'transform, opacity', zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
