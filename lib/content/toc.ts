// lib/content/toc.ts

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export type TocItem = {
  level: 2 | 3;
  text: string;
};

export function getTocItemsFromContent(content: string): TocItem[] {
  const lines = content.split(/\r?\n/);
  const items: TocItem[] = [];

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)\s*$/);
    const h3 = line.match(/^###\s+(.+)\s*$/);
    if (h2) items.push({ level: 2, text: h2[1].trim() });
    if (h3) items.push({ level: 3, text: h3[1].trim() });
  }

  return items;
}

/**
 * Reads an MD/MDX file by slug from a content directory, strips frontmatter,
 * and returns TOC items for ## and ### headings.
 *
 * Example:
 *   const toc = await getTocItemsFromSlugDir({
 *     slug: "why-consistency-wins",
 *     dir: path.join(process.cwd(), "content", "blog"),
 *   })
 */
export async function getTocItemsFromSlugDir({
  slug,
  dir,
}: {
  slug: string;
  dir: string;
}): Promise<TocItem[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(dir);
  } catch {
    return [];
  }

  const match =
    files.find((f) => f.toLowerCase() === `${slug}.mdx`.toLowerCase()) ??
    files.find((f) => f.toLowerCase() === `${slug}.md`.toLowerCase());

  if (!match) return [];

  const raw = await fs.readFile(path.join(dir, match), "utf8");
  const { content } = matter(raw);

  return getTocItemsFromContent(content);
}
