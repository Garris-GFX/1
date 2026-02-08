import MDXImage from "@/components/mdx/MDXImage";

export default function Figure({
  src,
  alt,
  caption,
  zoom = true,
}: {
  src: string;
  alt: string;
  caption?: string;
  zoom?: boolean;
}) {
  return <MDXImage src={src} alt={alt} caption={caption} zoom={zoom} />;
}
