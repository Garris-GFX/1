import React from "react";
import MDXImage from "@/components/mdx/MDXImage";

export type GalleryItem = {
  src: string;
  alt: string;
  caption?: string;
  /** Override gallery-level zoom for this image */
  zoom?: boolean;
};

type Props = {
  /** Children-based API (preferred for MDX) */
  children?: React.ReactNode;

  /** Backward-compatible props API */
  items?: GalleryItem[];

  cols?: 2 | 3;
  /** Tailwind gap scale number (e.g., 3, 4, 6). Default: 4 */
  gap?: 3 | 4 | 5 | 6 | 8;
  /** Default zoom behavior for images */
  zoom?: boolean;
  className?: string;
};

/**
 * Gallery (MDX primitive)
 *
 * Preferred MDX usage:
 * <Gallery cols={3}>
 *   <img src="/a.jpg" alt="..." />
 *   <img src="/b.jpg" alt="..." data-caption="Optional caption" />
 * </Gallery>
 *
 * Backward compatible usage:
 * <Gallery items={[{ src, alt, caption }]} />
 */
export default function Gallery({
  children,
  items,
  cols = 2,
  gap = 4,
  zoom = true,
  className = "",
}: Props) {
  const gridCols = cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  const gridGap =
    gap === 3
      ? "gap-3"
      : gap === 5
      ? "gap-5"
      : gap === 6
      ? "gap-6"
      : gap === 8
      ? "gap-8"
      : "gap-4";

  // Normalize either API to a render list
  const rendered =
    items?.length ? (
      items.map((it) => (
        <MDXImage
          key={`${it.src}::${it.alt}`}
          src={it.src}
          alt={it.alt}
          caption={it.caption}
          zoom={it.zoom ?? zoom}
          inline
        />
      ))
    ) : (
      <GalleryChildren zoom={zoom}>{children}</GalleryChildren>
    );

  // Nothing to render
  if (!rendered) return null;

  return (
    <div className={`my-6 grid ${gridGap} ${gridCols} ${className}`}>
      {rendered}
    </div>
  );
}

function GalleryChildren({
  children,
  zoom,
}: {
  children?: React.ReactNode;
  zoom: boolean;
}) {
  type ImgLikeProps = {
    src?: unknown;
    alt?: unknown;
    title?: unknown;
    [key: string]: unknown;
  };

  const nodes = React.Children.toArray(children).filter(Boolean);
  if (!nodes.length) return null;

  return (
    <>
      {nodes.map((child, idx) => {
        if (!React.isValidElement(child)) return null;

        const t = child.type;

        // Case 1: raw <img> tag in MDX
        if (typeof t === "string" && t === "img") {
          const props = (child.props ?? {}) as ImgLikeProps;
          const src = String(props.src ?? "");
          const alt = String(props.alt ?? "");
          const caption =
            (props["data-caption"] as string | undefined) ??
            (props.title as string | undefined);

          if (!src) return null;

          return (
            <MDXImage
              key={`${src}::${alt || idx}`}
              src={src}
              alt={alt}
              caption={caption}
              zoom={zoom}
              inline
            />
          );
        }

        // Case 2: already a <MDXImage /> (most likely)
        const existingProps = (child.props ?? {}) as ImgLikeProps;
        const key =
          child.key ??
          (existingProps.src
            ? `${String(existingProps.src)}::${String(existingProps.alt ?? "")}`
            : idx);

        return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
          key,
          inline: true,
          zoom: (existingProps.zoom as boolean) ?? zoom,
        });
      })}
    </>
  );
}
