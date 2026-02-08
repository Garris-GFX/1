import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

import ScrollToTop from "@/components/ScrollToTop";
import PostToc from "@/components/PostToc";
import HeadMeta from "@/components/layout/HeadMeta";

import { getAllWorkMeta, getWorkBySlug } from "@/lib/work";

// MDX blocks (Work-only)
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
import { buildCreativeWorkJsonLd } from "@/lib/content/jsonld";
import { getBaseMdxComponents } from "@/lib/content/mdx";

// UI
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge, Divider, Panel } from "@/components/ui";
import ReadingProgress from "@/components/ReadingProgress";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const posts = await getAllWorkMeta();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;

  const work = await getWorkBySlug(decodeURIComponent(slug));
  if (!work) return {};

  const title = `${work.meta.title} - Work - Garris Graphics`;
  const description =
    (work.meta.excerpt && String(work.meta.excerpt).trim()) ||
    "Selected branding and web projects by Garris Graphics.";

  const canonical = `/work/${work.meta.slug}`;
  const tags = work.meta.tags ?? [];

  return {
    title,
    description,
    alternates: { canonical },
    keywords: tags.length ? tags : undefined,
    openGraph: { title, description, type: "article", url: canonical },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function WorkPostPage({ params }: { params: Params }) {
  const { slug } = await params;

  const work = await getWorkBySlug(decodeURIComponent(slug));
  if (!work) notFound();

  const url = `https://garris.graphics/work/${work.meta.slug}`;

  const posts = await getAllWorkMeta();
  const { prev: prevPost, next: nextPost } = getPrevNextBySlug(
    posts,
    work.meta.slug
  );

  const tocItems = await getTocItemsFromSlugDir({
    slug: work.meta.slug,
    dir: path.join(process.cwd(), "content", "work"),
  });

  const tags = work.meta.tags ?? [];
  const readingTime = getReadingTime(work.content).label;

  const compiled = await compileMDX({
    source: work.content,
    options: { parseFrontmatter: false },
    components: {
      ...getBaseMdxComponents(),

      // Work-only MDX blocks
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
      <ReadingProgress/>
      <HeadMeta
        title={work.meta.title}
        description={work.meta.excerpt ?? null}
        canonical={`/work/${work.meta.slug}`}
        jsonLd={buildCreativeWorkJsonLd({
          url,
          title: work.meta.title,
          description: work.meta.excerpt || "",
          datePublished: work.meta.date,
          dateModified: work.meta.date,
          tags: work.meta.tags ?? [],
        })}
      />

      {/* EXACTLY like Services: one Container, no extra background wrapper */}
      <Container className="py-section">
        <div className="space-y-card">
          {/* crumbs (Services pattern) */}
          <Breadcrumbs
            className="text-text/60"
            items={[{ label: "Work", href: "/work" }, { label: work.meta.title }]}
          />

          {/* page header (Services pattern) */}
          <div className="space-y-tile">
            <h1 className="text-h1 tracking-tightish text-white">
              {work.meta.title}
            </h1>

            {work.meta.excerpt ? (
              <p className="text-body text-muted max-w-[70ch]">
                {work.meta.excerpt}
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

  {work.meta.date ? (
    <>
      <span className="text-muted/70">•</span>
      <span>{work.meta.date}</span>
    </>
  ) : null}

  <span className="text-muted/70">•</span>
  <span className="whitespace-nowrap">{readingTime}</span>

  {/* tags - hidden on mobile */}
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

          {/* main layout (Services pattern) */}
          <div className="grid gap-card lg:grid-cols-[1fr_360px]">
            {/* left content */}
            <section className="min-w-0 space-y-card">
              <Divider />

              <div
                className={[
                  "prose prose-invert prose-lg max-w-none",
                  "[&>h1:first-child]:mt-0 [&>h2:first-child]:mt-0 [&>h3:first-child]:mt-0 [&>ul:first-child]:mt-0 [&>ol:first-child]:mt-0",
                  "prose-headings:text-white prose-p:text-text prose-strong:text-white",
                  "prose-a:text-text hover:prose-a:text-white",
                  "prose-hr:border-stroke",
                  "prose-code:text-white prose-pre:bg-surface prose-pre:border prose-pre:border-stroke",
                  "prose-li:text-text prose-blockquote:text-text prose-blockquote:border-stroke",
                ].join(" ")}
              >
                {compiled.content}
              </div>

              {prevPost || nextPost ? (
                <div className="border-t border-stroke pt-card">
                  <div className="grid gap-6 sm:grid-cols-2">
                    {prevPost ? (
                      <Link href={`/work/${prevPost.slug}`} className="group">
                        <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                          Previous project
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
                        href={`/work/${nextPost.slug}`}
                        className="group sm:text-right"
                      >
                        <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                          Next project
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

            {/* right sidebar */}
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
