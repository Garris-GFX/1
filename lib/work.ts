// /lib/work.ts
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const workDir = path.join(process.cwd(), "content", "work");

export type WorkMeta = {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
  thumbnail?: string;
  tags?: string[];
  author?: string;

  // extended meta (optional)
  client?: string;
  role?: string;
  timeline?: string;
  year?: string;
  website?: string;

  services?: string[];
  deliverables?: string[];
  tools?: string[];
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

function arr(v: unknown): string[] | undefined {
  if (!Array.isArray(v)) return undefined;
  const cleaned = v.map((x) => String(x).trim()).filter(Boolean);
  return cleaned.length ? cleaned : undefined;
}

function str(v: unknown): string | undefined {
  const s = String(v ?? "").trim();
  return s ? s : undefined;
}

export async function getAllWorkMeta(): Promise<WorkMeta[]> {
  const files = (await safeReaddir(workDir)).filter(
    (f) => f.endsWith(".mdx") || f.endsWith(".md")
  );

  const items = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.(mdx|md)$/, "");
      const fullPath = path.join(workDir, file);
      const raw = await fs.readFile(fullPath, "utf8");
      const { data } = matter(raw);

      const meta: WorkMeta = {
        slug,
        title: String(data.title ?? slug),
        date: data.date ? String(data.date) : undefined,
        excerpt: data.excerpt ? String(data.excerpt) : undefined,
        thumbnail: data.thumbnail ? String(data.thumbnail) : undefined,
        author: str(data.author),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,

        client: str(data.client),
        role: str(data.role),
        timeline: str(data.timeline),
        year: str(data.year),
        website: str(data.website),

        services: arr(data.services),
        deliverables: arr(data.deliverables),
        tools: arr(data.tools),
      };

      return meta;
    })
  );

  // newest first if dates exist, otherwise stable title sort
  items.sort((a, b) => {
    const ad = a.date ? new Date(a.date).getTime() : 0;
    const bd = b.date ? new Date(b.date).getTime() : 0;
    if (ad !== bd) return bd - ad;
    return a.title.localeCompare(b.title);
  });

  return items;
}

export async function getWorkBySlug(
  slug: string
): Promise<{ meta: WorkMeta; content: string } | null> {
  const mdxPath = path.join(workDir, `${slug}.mdx`);
  const mdPath = path.join(workDir, `${slug}.md`);

  const fullPath = (await exists(mdxPath)) ? mdxPath : (await exists(mdPath)) ? mdPath : null;
  if (!fullPath) return null;

  const raw = await fs.readFile(fullPath, "utf8");
  const { content, data } = matter(raw);

  const meta: WorkMeta = {
    slug,
    title: String(data.title ?? slug),
    date: data.date ? String(data.date) : undefined,
    excerpt: data.excerpt ? String(data.excerpt) : undefined,
    thumbnail: data.thumbnail ? String(data.thumbnail) : undefined,
    author: str(data.author),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,

    client: str(data.client),
    role: str(data.role),
    timeline: str(data.timeline),
    year: str(data.year),
    website: str(data.website),

    services: arr(data.services),
    deliverables: arr(data.deliverables),
    tools: arr(data.tools),
  };

  return { meta, content };
}
