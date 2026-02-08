"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scrollLock";

function clsx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

function lockScroll() {
  lockBodyScroll();
  return () => unlockBodyScroll();
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

type Props = {
  src: string;
  alt: string;
  caption?: string;
  zoom?: boolean;
  priority?: boolean;
  className?: string;
  inline?: boolean;
  ratio?: "auto" | "video";
  fit?: "contain" | "cover";
};

export default function MDXImage({
  src,
  alt,
  caption,
  zoom = true,
  priority = false,
  className,
  inline = false,
  ratio = "auto",
  fit = "contain",
}: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const restoreScrollRef = useRef<null | (() => void)>(null);

  const safeSrc = useMemo(() => (typeof src === "string" ? src : ""), [src]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // ----- Overlay zoom/pan state (pinch + pan) -----
  const stageRef = useRef<HTMLDivElement | null>(null);
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const startRef = useRef<{
    mode: "pan" | "pinch" | null;
    startX: number;
    startY: number;
    startTx: number;
    startTy: number;
    startDist: number;
    startScale: number;
  }>({
    mode: null,
    startX: 0,
    startY: 0,
    startTx: 0,
    startTy: 0,
    startDist: 0,
    startScale: 1,
  });

  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);

  const resetView = () => {
    setScale(1);
    setTx(0);
    setTy(0);
  };

  useEffect(() => {
    window.dispatchEvent(new Event(open ? "mdximage:open" : "mdximage:close"));
    if (!open) return;

    // Reset zoom each open (defer to next frame to avoid sync setState in effect)
    let rafId: number | null = null;
    rafId = requestAnimationFrame(() => resetView());

    restoreScrollRef.current = lockScroll();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("keydown", onKeyDown);
      restoreScrollRef.current?.();
      restoreScrollRef.current = null;
      window.dispatchEvent(new Event("mdximage:close"));
    };
  }, [open]);

  const getDistance = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    Math.hypot(a.x - b.x, a.y - b.y);

  const objectClass = fit === "cover" ? "object-cover" : "object-contain";

  // ----- Inline rendering (always visible + fits nicely) -----
  // Key: width/height ensures the image always renders; max-h keeps it from feeling huge.
  const inlineImage = (
    <figure className={clsx(!inline && "my-6", className)}>
      <div
        className={clsx(
          "relative overflow-hidden rounded-card border border-stroke bg-surface",
          zoom && "cursor-zoom-in",
          ratio === "video" && "aspect-video"
        )}
        onClick={() => zoom && setOpen(true)}
        role={zoom ? "button" : undefined}
        tabIndex={zoom ? 0 : undefined}
        onKeyDown={(e) => {
          if (!zoom) return;
          if (e.key === "Enter" || e.key === " ") setOpen(true);
        }}
        aria-label={zoom ? "Open image fullscreen" : undefined}
      >
        {ratio === "video" ? (
          <Image
            src={safeSrc}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 980px"
            className={clsx(objectClass, zoom && "select-none")}
          />
        ) : (
          <div className="flex items-center justify-center">
            <Image
              src={safeSrc}
              alt={alt}
              width={1800}
              height={1200}
              priority={priority}
              sizes="(max-width: 1024px) 100vw, 980px"
              className={clsx(
                "w-full h-auto object-contain max-h-[520px]",
                zoom && "select-none"
              )}
            />
          </div>
        )}
      </div>

      {caption ? <figcaption className="mt-2 text-sm text-muted">{caption}</figcaption> : null}
    </figure>
  );

  // ----- Overlay (dark backdrop + pinch zoom) -----
  const overlay = open ? (
    <div
      className="fixed inset-0 z-[9999] bg-bg backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={() => setOpen(false)}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={() => setOpen(false)}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
        style={{ top: "calc(env(safe-area-inset-top) + 12px)" }}
      >
        ✕
      </button>

      <div className="absolute inset-0 flex flex-col">
        <div
          ref={stageRef}
          className="relative flex-1 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          style={{ touchAction: "none" }}
          onPointerDown={(e) => {
            const stage = stageRef.current;
            if (!stage) return;

            stage.setPointerCapture(e.pointerId);
            pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

            const pts = Array.from(pointersRef.current.values());
            if (pts.length === 1) {
              startRef.current = {
                mode: "pan",
                startX: e.clientX,
                startY: e.clientY,
                startTx: tx,
                startTy: ty,
                startDist: 0,
                startScale: scale,
              };
            } else if (pts.length >= 2) {
              const d = getDistance(pts[0], pts[1]);
              startRef.current = {
                mode: "pinch",
                startX: 0,
                startY: 0,
                startTx: tx,
                startTy: ty,
                startDist: d,
                startScale: scale,
              };
            }
          }}
          onPointerMove={(e) => {
            if (!pointersRef.current.has(e.pointerId)) return;

            pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
            const pts = Array.from(pointersRef.current.values());
            const s = startRef.current;

            if (pts.length >= 2) {
              const d = getDistance(pts[0], pts[1]);
              const nextScale = clamp((s.startScale * d) / Math.max(1, s.startDist), 1, 4);
              setScale(nextScale);
              startRef.current.mode = "pinch";
              return;
            }

            if (s.mode === "pan" && scale > 1) {
              const dx = e.clientX - s.startX;
              const dy = e.clientY - s.startY;
              setTx(s.startTx + dx);
              setTy(s.startTy + dy);
            }
          }}
          onPointerUp={(e) => {
            pointersRef.current.delete(e.pointerId);
            if (pointersRef.current.size === 0) startRef.current.mode = null;
          }}
          onPointerCancel={(e) => {
            pointersRef.current.delete(e.pointerId);
            if (pointersRef.current.size === 0) startRef.current.mode = null;
          }}
          onDoubleClick={() => {
            if (scale === 1) {
              setScale(2);
              setTx(0);
              setTy(0);
            } else {
              resetView();
            }
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative h-full w-full"
              style={{
                transform: `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`,
                transformOrigin: "center center",
                willChange: "transform",
              }}
            >
              <Image
                src={safeSrc}
                alt={alt}
                fill
                priority
                sizes="100vw"
                className="object-contain select-none"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {caption ? (
          <div
            className="w-full px-4 py-3 text-right text-sm text-white/75"
            onClick={(e) => e.stopPropagation()}
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)" }}
          >
            {caption}
          </div>
        ) : (
          <div style={{ height: "calc(env(safe-area-inset-bottom) + 12px)" }} />
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      {inlineImage}
      {mounted && overlay ? createPortal(overlay, document.body) : null}
    </>
  );
}
