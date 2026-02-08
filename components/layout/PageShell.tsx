import * as React from "react";
import Link from "next/link";
import { Container } from "./Container";
import ReadingProgress from "../ReadingProgress";

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

type Crumb = { label: string; href?: string };

export type PageShellProps = {
  crumbs?: Crumb[];
  title?: string;
  lead?: string;
  showReadingProgress?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function PageShell({ crumbs, title, lead, children, className, showReadingProgress = false }: PageShellProps) {
  return (
    <Container className={cn("py-section space-y-section", className)}>
      {showReadingProgress ? <ReadingProgress /> : null}
      {(crumbs?.length || title || lead) && (
        <header className="space-y-tile">
          {crumbs?.length ? (
            <nav className="text-crumbs uppercase tracking-crumbs text-muted">
              <ol className="flex flex-wrap gap-2">
                {crumbs.map((c, i) => (
                  <li key={`${c.label}-${i}`} className="flex items-center gap-2">
                    {c.href ? (
                      <Link href={c.href} className="hover:text-white transition">
                        {c.label}
                      </Link>
                    ) : (
                      <span>{c.label}</span>
                    )}
                    {i < crumbs.length - 1 && <span className="text-muted/70">/</span>}
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <h1 className="text-h1 tracking-tightish text-white">{title}</h1>
          {lead ? <p className="text-body text-muted">{lead}</p> : null}
        </header>
      )}

      {children}
    </Container>
  );
}

export default PageShell;
