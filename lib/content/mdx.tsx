import React from "react";
import MDXImage from "@/components/mdx/MDXImage";
import Gallery from "@/components/mdx/Gallery";
import GalleryCarousel from "@/components/mdx/GalleryCarousel";

export function isBlockish(child: unknown) {
  if (child == null || child === false) return false;
  if (typeof child === "string" || typeof child === "number") return false;

  // If it's an element, inspect its `type` value
  if (React.isValidElement(child)) {
    const t = (child as React.ReactElement).type;
    if (typeof t === "string") {
      return [
        "div",
        "section",
        "figure",
        "article",
        "aside",
        "nav",
        "header",
        "footer",
        "ul",
        "ol",
        "li",
        "pre",
        "table",
        "thead",
        "tbody",
        "tr",
        "td",
        "th",
        "blockquote",
        "hr",
      ].includes(t);
    }
    return true;
  }

  return false;
}

export function MdxP(props: React.HTMLAttributes<HTMLParagraphElement>) {
  const children = React.Children.toArray(props.children);
  const hasBlock = children.some(isBlockish);

  if (hasBlock) return <div className="my-4">{props.children}</div>;
  return <p {...props} />;
}

export function getBaseMdxComponents() {
  return {
    p: MdxP,

    img: (props: { src?: unknown; alt?: unknown; title?: unknown; [k: string]: unknown }) => {
      const src = String(props?.src ?? "");
      const alt = String(props?.alt ?? "");

      const caption =
        (props?.["data-caption"] as string | undefined) ??
        (props?.title as string | undefined) ??
        (alt || undefined); // ✅ fallback to alt text

      return <MDXImage src={src} alt={alt} caption={caption} zoom />;
    },

    Gallery,
    GalleryCarousel,
  } as const;
}
