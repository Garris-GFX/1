// lib/content/jsonld.ts

export type JsonLdBaseArgs = {
  url: string;
  title: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
  tags?: string[];
};

export type PersonOrgDefaults = {
  authorName: string;
  authorUrl: string;
  publisherName: string;
  publisherUrl: string;
};

export const DEFAULT_ENTITY: PersonOrgDefaults = {
  authorName: "Noah Hunt",
  authorUrl: "https://garris.graphics",
  publisherName: "Garris Graphics",
  publisherUrl: "https://garris.graphics",
};

export function buildBlogPostingJsonLd(
  args: JsonLdBaseArgs & Partial<PersonOrgDefaults>
) {
  const tags = args.tags?.filter(Boolean) ?? [];
  const entity = { ...DEFAULT_ENTITY, ...args };

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: args.title,
    description: args.description || "",
    datePublished: args.datePublished || undefined,
    dateModified: args.dateModified || args.datePublished || undefined,
    author: { "@type": "Person", name: entity.authorName, url: entity.authorUrl },
    publisher: {
      "@type": "Organization",
      name: entity.publisherName,
      url: entity.publisherUrl,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": args.url },
    url: args.url,
    keywords: tags.length ? tags.join(", ") : undefined,
  };
}

export function buildCreativeWorkJsonLd(
  args: JsonLdBaseArgs & Partial<PersonOrgDefaults>
) {
  const tags = args.tags?.filter(Boolean) ?? [];
  const entity = { ...DEFAULT_ENTITY, ...args };

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: args.title,
    description: args.description || "",
    datePublished: args.datePublished || undefined,
    dateModified: args.dateModified || args.datePublished || undefined,
    author: { "@type": "Person", name: entity.authorName, url: entity.authorUrl },
    publisher: {
      "@type": "Organization",
      name: entity.publisherName,
      url: entity.publisherUrl,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": args.url },
    url: args.url,
    keywords: tags.length ? tags.join(", ") : undefined,
  };
}
