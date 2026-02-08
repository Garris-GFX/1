type HeadMetaProps = {
  title?: string;
  description?: string | null;
  canonical?: string;
  jsonLd?: unknown;
};

export default function HeadMeta({ title, description, canonical, jsonLd }: HeadMetaProps) {
  return (
    <>
      {title ? <meta name="title" content={title} /> : null}
      {description ? <meta name="description" content={description} /> : null}
      {canonical ? <link rel="canonical" href={canonical} /> : null}

      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
    </>
  );
}
