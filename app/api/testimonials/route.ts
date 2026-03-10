import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

type Testimonial = {
  slug: string;
  name: string;
  company?: string;
  role?: string;
  rating?: number;
  source?: string;
  href?: string;
  date?: string;

  // NEW
  work?: string;
  tags?: string[];

  body: string;
};

function normalizeTags(input: unknown): string[] | undefined {
  if (!input) return undefined;

  // tags: ["A", "B"]
  if (Array.isArray(input)) {
    const tags = input
      .map((x) => (typeof x === "string" ? x.trim() : ""))
      .filter(Boolean);
    return tags.length ? tags : undefined;
  }

  // tags: "A, B, C"
  if (typeof input === "string") {
    const tags = input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    return tags.length ? tags : undefined;
  }

  return undefined;
}

function clampRating(input: unknown): number | undefined {
  if (input === null || input === undefined) return undefined;
  const n = typeof input === "number" ? input : Number(input);
  if (!Number.isFinite(n)) return undefined;
  return Math.max(0, Math.min(5, n));
}

export async function GET() {
  const dir = path.join(process.cwd(), "content", "testimonials");

  let files: string[] = [];
  try {
    files = await fs.readdir(dir);
  } catch {
    return NextResponse.json([]);
  }

  const mdxFiles = files.filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const items: Testimonial[] = [];

  for (const filename of mdxFiles) {
    const slug = filename.replace(/\.mdx?$/, "");
    const fullPath = path.join(dir, filename);

    const raw = await fs.readFile(fullPath, "utf8");
    const parsed = matter(raw);

    const data = parsed.data as Record<string, unknown>;
    const body = String(parsed.content || "").trim();

    items.push({
      slug,
      name: typeof data.name === "string" ? data.name : slug,
      company: typeof data.company === "string" ? data.company : undefined,
      role: typeof data.role === "string" ? data.role : undefined,
      rating: clampRating(data.rating),
      source: typeof data.source === "string" ? data.source : undefined,
      href: typeof data.href === "string" ? data.href : undefined,
      date: typeof data.date === "string" ? data.date : undefined,

      work: typeof data.work === "string" ? data.work : undefined,
      tags: normalizeTags(data.tags),

      body,
    });
  }

  // sort newest first (if date present), else stable by slug
  items.sort((a, b) => {
    const ad = a.date ? Date.parse(a.date) : 0;
    const bd = b.date ? Date.parse(b.date) : 0;
    if (bd !== ad) return bd - ad;
    return a.slug.localeCompare(b.slug);
  });

  return NextResponse.json(items);
}