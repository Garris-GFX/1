"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import MDXImage from "@/components/mdx/MDXImage";

export type GalleryCarouselItem = {
  src: string;
  alt: string;
  caption?: string;
  zoom?: boolean;
};

type Props = {
  items?: GalleryCarouselItem[];
  children?: React.ReactNode;

  zoom?: boolean;
  captions?: boolean;
  start?: number;
  className?: string;

  dots?: boolean;
};

function clampIndex(i: number, len: number) {
  if (len <= 0) return 0;
  return Math.max(0, Math.min(len - 1, i));
}

export default function GalleryCarousel({
  items,
  children,
  zoom = true,
  captions = true,
  start = 0,
  className = "",
  dots = true,
}: Props) {
  const normalized = useMemo(() => {
    if (items?.length) return items;
    return extractItemsFromChildren(children);
  }, [items, children]);

  const len = normalized.length;

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [index, setIndex] = useState(() => clampIndex(start, len));

  useEffect(() => {
    setIndex((prev) => clampIndex(prev, len));
  }, [len]);

  const scrollToIndex = (i: number, opts?: { instant?: boolean }) => {
    const node = slideRefs.current[i];
    if (!node) return;

    node.scrollIntoView({
      behavior: opts?.instant ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  useEffect(() => {
    if (!len) return;
    requestAnimationFrame(() => {
      scrollToIndex(clampIndex(start, len), { instant: true });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [len]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || !len) return;

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const containerRect = el.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;

        let best = 0;
        let bestDist = Number.POSITIVE_INFINITY;

        for (let i = 0; i < len; i++) {
          const slide = slideRefs.current[i];
          if (!slide) continue;

          const r = slide.getBoundingClientRect();
          const slideCenter = r.left + r.width / 2;
          const d = Math.abs(slideCenter - centerX);

          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        }

        setIndex(best);
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
  }, [len]);

  if (!len) return null;

  return (
    <div className={`my-8 ${className}`}>
      <div
        ref={scrollerRef}
        className="
          relative mx-auto max-w-[980px]
          overflow-x-auto overscroll-x-contain
          scroll-smooth
          [scrollbar-width:none]
          [-ms-overflow-style:none]
          ggx-hide-scrollbar
        "
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <style>{`
          .ggx-hide-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>

        <div className="flex gap-4 px-2 snap-x snap-mandatory">
          {normalized.map((it, i) => (
            <div
              key={`${it.src}::${it.alt}::${i}`}
              ref={(node) => {
                slideRefs.current[i] = node;
              }}
              className="w-[92%] sm:w-[86%] md:w-[80%] shrink-0 snap-center"
            >
              {/* ✅ Fixed frame + fill (no letterboxing) */}
              <MDXImage
                src={it.src}
                alt={it.alt}
                caption={captions ? it.caption : undefined}
                zoom={it.zoom ?? zoom}
                inline
                ratio="video"
                fit="cover"
              />
            </div>
          ))}
        </div>
      </div>

      {dots && len > 1 ? (
        <div className="mt-4 flex justify-center gap-2">
          {normalized.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={`h-2 w-2 rounded-full bg-white transition-opacity ${
  i === index ? "opacity-100" : "opacity-30 hover:opacity-60"
}`}

            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function extractItemsFromChildren(children: React.ReactNode): GalleryCarouselItem[] {
  const nodes = React.Children.toArray(children).filter(Boolean);
  const out: GalleryCarouselItem[] = [];

  type ImgLikeProps = {
    src?: unknown;
    alt?: unknown;
    title?: unknown;
    caption?: unknown;
    zoom?: unknown;
    [k: string]: unknown;
  };

  for (const node of nodes) {
    if (!React.isValidElement(node)) continue;

    const props = (node.props ?? {}) as ImgLikeProps;

    if (typeof node.type === "string" && node.type === "img") {
      const src = String(props.src ?? "");
      const alt = String(props.alt ?? "");
      const caption =
        (props["data-caption"] as string | undefined) ??
        (props.title as string | undefined);

      if (src) out.push({ src, alt, caption });
      continue;
    }

    if (props?.src) {
      out.push({
        src: String(props.src),
        alt: String(props.alt ?? ""),
        caption: props.caption ? String(props.caption) : undefined,
        zoom: typeof props.zoom === "boolean" ? (props.zoom as boolean) : undefined,
      });
    }
  }

  return out;
}
