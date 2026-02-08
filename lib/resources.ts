import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const RESOURCES_DIR = path.join(process.cwd(), "content", "resources");

export type BlogMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  thumbnail?: string;
  tags?: string[];
};

async function safeReaddir(dir: string) {
  try {
    return await fs.readdir(dir);
  } catch {
    return [];
  }
}

async function exists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

export async function getAllPostsMeta(): Promise<BlogMeta[]> {
  const files = (await safeReaddir(RESOURCES_DIR)).filter(
    (f) => f.endsWith(".mdx") || f.endsWith(".md")
  );

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.(mdx|md)$/, "");
      const fullPath = path.join(RESOURCES_DIR, file);
      const raw = await fs.readFile(fullPath, "utf8");
      const { data } = matter(raw);

      const thumbnailRaw = data.thumbnail ?? data.image ?? undefined;

      return {
        slug,
        title: String(data.title ?? slug),
        date: String(data.date ?? ""),
        excerpt: String(data.excerpt ?? ""),
        thumbnail: thumbnailRaw ? String(thumbnailRaw) : undefined,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
      } satisfies BlogMeta;
    })
  );

  posts.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return a.date < b.date ? 1 : -1;
  });

  return posts;
}

export async function getPostBySlug(
  slugRaw: string
): Promise<{ meta: BlogMeta; content: string } | null> {
  const slug = decodeURIComponent(String(slugRaw ?? "")).trim();
  if (!slug) return null;

  const directMdx = path.join(RESOURCES_DIR, `${slug}.mdx`);
  const directMd = path.join(RESOURCES_DIR, `${slug}.md`);

  let fullPath: string | null = null;

  if (await exists(directMdx)) fullPath = directMdx;
  else if (await exists(directMd)) fullPath = directMd;

  if (!fullPath) {
    const files = await safeReaddir(RESOURCES_DIR);
    const match =
      files.find((f) => f.toLowerCase() === `${slug}.mdx`.toLowerCase()) ??
      files.find((f) => f.toLowerCase() === `${slug}.md`.toLowerCase());
    if (match) fullPath = path.join(RESOURCES_DIR, match);
  }

  if (!fullPath) return null;

  const raw = await fs.readFile(fullPath, "utf8");
  const { content, data } = matter(raw);

  const thumbnailRaw = data.thumbnail ?? data.image ?? undefined;

  const meta: BlogMeta = {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    thumbnail: thumbnailRaw ? String(thumbnailRaw) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
  };

  return { meta, content };
}
