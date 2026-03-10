import fs from "fs";
import path from "path";

export type Testimonial = {
  slug: string;
  name: string;
  company?: string;
  role?: string;
  rating?: number;  // 1-5
  source?: string;  // "Google"
  href?: string;    // link to review
  date?: string;    // YYYY-MM-DD
  body: string;
};

const TESTIMONIALS_DIR = path.join(process.cwd(), "content", "testimonials");

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  // Very small, no-deps frontmatter parser:
  // expects:
  // ---
  // key: value
  // ---
  // body...
  if (!raw.startsWith("---")) return { data: {}, body: raw.trim() };

  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { data: {}, body: raw.trim() };

  const fmBlock = raw.slice(3, end).trim();
  const body = raw.slice(end + "\n---".length).trim();

  const data: Record<string, string> = {};
  for (const line of fmBlock.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const colon = trimmed.indexOf(":");
    if (colon === -1) continue;

    const key = trimmed.slice(0, colon).trim();
    let value = trimmed.slice(colon + 1).trim();

    // strip wrapping quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return { data, body };
}

export function getTestimonials(): Testimonial[] {
  if (!fs.existsSync(TESTIMONIALS_DIR)) return [];

  const files = fs
    .readdirSync(TESTIMONIALS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const items: Testimonial[] = files.map((filename) => {
    const fullPath = path.join(TESTIMONIALS_DIR, filename);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, body } = parseFrontmatter(raw);

    const slug = filename.replace(/\.mdx?$/, "");

    const ratingNum = data.rating ? Number(data.rating) : undefined;
    const rating = Number.isFinite(ratingNum) ? Math.max(0, Math.min(5, ratingNum!)) : undefined;

    return {
      slug,
      name: data.name || slug,
      company: data.company || undefined,
      role: data.role || undefined,
      rating,
      source: data.source || undefined,
      href: data.href || undefined,
      date: data.date || undefined,
      body,
    };
  });

  // newest first if date exists, otherwise keep stable by slug
  items.sort((a, b) => {
    const ad = a.date ? Date.parse(a.date) : 0;
    const bd = b.date ? Date.parse(b.date) : 0;
    if (bd !== ad) return bd - ad;
    return a.slug.localeCompare(b.slug);
  });

  return items;
}