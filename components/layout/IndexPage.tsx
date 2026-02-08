import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import PostToc, { TocItem } from "@/components/PostToc";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

type IndexPageProps = {
  title: string;
  excerpt?: string | null;
  lastUpdated?: string | null;
  // keep these for compatibility with existing pages (no longer rendered)
  backHref?: string;
  backLabel?: string;
  rootLabel?: string;
  tocItems?: TocItem[];
  children: ReactNode;
};

function formatLastUpdated(value?: string | null) {
  if (!value) return null;

  const d = new Date(value);
  if (!Number.isNaN(d.getTime())) {
    const yyyy = d.getUTCFullYear();
    const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(d.getUTCDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  return value;
}

export default function IndexPage({
  title,
  excerpt = null,
  lastUpdated = null,
  rootLabel = "Legal",
  tocItems = [],
  children,
}: IndexPageProps) {
  const updated = formatLastUpdated(lastUpdated);
  const hasToc = tocItems.length > 0;

  return (
    <Container className="py-section">
      {/* wider left rail + content */}
      <div className="grid gap-card lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr] lg:items-start">
        {/* LEFT SIDEBAR (sticky on desktop) */}
        <aside className="lg:sticky lg:top-24 space-y-tile self-start">
          {/* crumbs */}
          <Breadcrumbs
            className="text-text/60"
            items={[
              { label: rootLabel, href: "#" },
              { label: title },
            ]}
          />

          {/* title */}
          <h1 className="text-h1 tracking-tightish text-white">{title}</h1>

          {/* last updated */}
          {updated ? (
            <div className="text-small text-muted">Last updated: {updated}</div>
          ) : null}

          {/* description */}
          {excerpt ? <p className="text-body text-muted">{excerpt}</p> : null}

          {/* optional toc */}
          {hasToc ? (
            <div className="rounded-tile bg-black/30 p-tile">
              <div className="mb-3 text-small text-text/70">On this page</div>
              <PostToc items={tocItems} />
            </div>
          ) : null}
        </aside>

        {/* RIGHT CONTENT */}
        <section className="min-w-0">
          <div className="prose prose-lg prose-invert max-w-none">{children}</div>
        </section>
      </div>
    </Container>
  );
}
