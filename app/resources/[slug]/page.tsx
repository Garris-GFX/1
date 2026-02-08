import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

import ScrollToTop from "@/components/ScrollToTop";
import PostToc from "@/components/PostToc";
import HeadMeta from "@/components/layout/HeadMeta";

import { getAllPostsMeta, getPostBySlug } from "@/lib/resources";

// MDX blocks (shared)
import Callout from "@/components/mdx/Callout";
import Figure from "@/components/mdx/Figure";
import Gallery from "@/components/mdx/Gallery";
import ButtonLink from "@/components/mdx/ButtonLink";
import Checklist from "@/components/mdx/Checklist";
import ProcessStep from "@/components/mdx/ProcessStep";

// Shared helpers
import { getReadingTime } from "@/lib/content/readingTime";
import { getPrevNextBySlug } from "@/lib/content/navigation";
import { getTocItemsFromSlugDir } from "@/lib/content/toc";
import { buildBlogPostingJsonLd } from "@/lib/content/jsonld";
import { getBaseMdxComponents } from "@/lib/content/mdx";

// UI
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge, Divider, Panel } from "@/components/ui";
import ReadingProgress from "@/components/ReadingProgress";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const posts = await getAllPostsMeta();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPostBySlug(decodeURIComponent(slug));
  if (!post) return {};

  const title = `${post.meta.title} - Resources - Garris Graphics`;
  const description =
    (post.meta.excerpt && String(post.meta.excerpt).trim()) ||
    "Articles and resources by Garris Graphics.";

  const canonical = `/resources/${post.meta.slug}`;
  const tags = post.meta.tags ?? [];

  return {
    title,
    description,
    alternates: { canonical },
    keywords: tags.length ? tags : undefined,
    openGraph: { title, description, type: "article", url: canonical },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ResourcesPostPage({ params }: { params: Params }) {
  const { slug } = await params;

  const post = await getPostBySlug(decodeURIComponent(slug));
  if (!post) notFound();

  const url = `https://garris.graphics/resources/${post.meta.slug}`;

  const posts = await getAllPostsMeta();
  const { prev: prevPost, next: nextPost } = getPrevNextBySlug(
    posts,
    post.meta.slug
  );

  const tocItems = await getTocItemsFromSlugDir({
    slug: post.meta.slug,
    dir: path.join(process.cwd(), "content", "resources"),
  });

  const tags = post.meta.tags ?? [];
  const readingTime = getReadingTime(post.content).label;

  const compiled = await compileMDX({
    source: post.content,
    options: { parseFrontmatter: false },
    components: {
      ...getBaseMdxComponents(),
      Callout,
      Figure,
      Gallery,
      ButtonLink,
      Checklist,
      ProcessStep,
    },
  });

  return (
    <>
      <ScrollToTop />
      <ReadingProgress />
      <HeadMeta
        title={post.meta.title}
        description={post.meta.excerpt ?? null}
        canonical={`/resources/${post.meta.slug}`}
        jsonLd={buildBlogPostingJsonLd({
          url,
          title: post.meta.title,
          description: post.meta.excerpt || "",
          datePublished: post.meta.date,
          dateModified: post.meta.date,
          tags: post.meta.tags ?? [],
        })}
      />

      <Container className="py-section">
        <div className="space-y-card">
          <Breadcrumbs
            className="text-text/60"
            items={[
              { label: "Resources", href: "/resources" },
              { label: post.meta.title },
            ]}
          />

          <div className="space-y-tile">
            <h1 className="text-h1 tracking-tightish text-white">
              {post.meta.title}
            </h1>

            {post.meta.excerpt ? (
              <p className="text-body text-muted max-w-[70ch]">
                {post.meta.excerpt}
              </p>
            ) : null}

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-small text-muted">
              <a
                href="https://www.facebook.com/noah.hunt.165/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text hover:text-white transition"
              >
                By Noah Hunt
              </a>

              {post.meta.date ? (
                <>
                  <span className="text-muted/70">•</span>
                  <span>{post.meta.date}</span>
                </>
              ) : null}

              <span className="text-muted/70">•</span>
              <span className="whitespace-nowrap">{readingTime}</span>

              {tags.length ? (
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-muted/70">•</span>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <Badge key={t} variant="muted">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="grid gap-card lg:grid-cols-[1fr_360px]">
            <section className="min-w-0 space-y-card">
              <Divider />

              <div
                className={[
                  // Base (same structure as Work)
                  "prose prose-invert prose-lg max-w-none",
                  "[&>h1:first-child]:mt-0 [&>h2:first-child]:mt-0 [&>h3:first-child]:mt-0 [&>ul:first-child]:mt-0 [&>ol:first-child]:mt-0",

                  // Utility overrides (same intent as Work)
                  "prose-headings:text-white prose-p:text-text prose-strong:text-white",
                  "prose-a:text-text hover:prose-a:text-white",
                  "prose-hr:border-stroke",
                  "prose-code:text-white prose-pre:bg-surface prose-pre:border prose-pre:border-stroke",
                  "prose-li:text-text prose-blockquote:text-text prose-blockquote:border-stroke",

                  // Hard override: ensure typography vars never fall back to “blue”
                  // (this matches Work’s visual result even if a prose-* utility fails to apply)
                  "[--tw-prose-body:var(--color-text)]",
                  "[--tw-prose-lead:var(--color-text)]",
                  "[--tw-prose-links:var(--color-text)]",
                  "[--tw-prose-bold:#fff]",
                  "[--tw-prose-headings:#fff]",
                  "[--tw-prose-counters:var(--color-text)]",
                  "[--tw-prose-bullets:var(--color-text)]",
                  "[--tw-prose-quotes:var(--color-text)]",
                  "[--tw-prose-hr:var(--color-stroke)]",
                  "[--tw-prose-borders:var(--color-stroke)]",
                  "[--tw-prose-code:#fff]",
                ].join(" ")}
              >
                {compiled.content}
              </div>

              {prevPost || nextPost ? (
                <div className="border-t border-stroke pt-card">
                  <div className="grid gap-6 sm:grid-cols-2">
                    {prevPost ? (
                      <Link
                        href={`/resources/${prevPost.slug}`}
                        className="group"
                      >
                        <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                          Previous post
                        </div>
                        <div className="mt-2 text-base font-semibold text-white group-hover:underline">
                          {prevPost.title}
                        </div>
                        {prevPost.excerpt ? (
                          <div className="mt-1 text-sm text-muted">
                            {prevPost.excerpt}
                          </div>
                        ) : null}
                      </Link>
                    ) : (
                      <div />
                    )}

                    {nextPost ? (
                      <Link
                        href={`/resources/${nextPost.slug}`}
                        className="group sm:text-right"
                      >
                        <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                          Next post
                        </div>
                        <div className="mt-2 text-base font-semibold text-white group-hover:underline">
                          {nextPost.title}
                        </div>
                        {nextPost.excerpt ? (
                          <div className="mt-1 text-sm text-muted">
                            {nextPost.excerpt}
                          </div>
                        ) : null}
                      </Link>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </section>

            <aside className="self-start lg:sticky lg:top-24">
              <Panel padding="card" className="space-y-card">
                {tocItems.length ? (
                  <PostToc items={tocItems} inCard={false} />
                ) : null}
                {tocItems.length ? <Divider /> : null}

                <div className="flex items-start gap-4">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-surface">
                    <Image
                      src="/profilepicture.JPG"
                      alt="Noah Hunt"
                      fill
                      className="object-cover"
                      sizes="48px"
                      priority
                    />
                  </div>

                  <div className="min-w-0">
                    <a
                      href="https://garris.graphics"
                      className="font-semibold text-white hover:underline"
                    >
                      Noah Hunt
                    </a>
                    <div className="text-sm text-muted">Garris Graphics</div>
                    <p className="mt-2 text-sm text-muted">
                      Branding + websites for small businesses that need a clean,
                      fast, modern presence.
                    </p>
                    <div className="mt-3">
                      <Link
                        href="/contact"
                        className="text-sm font-medium text-text hover:text-white transition"
                      >
                        Work with me →
                      </Link>
                    </div>
                  </div>
                </div>
              </Panel>
            </aside>
          </div>
        </div>
      </Container>
    </>
  );
}
