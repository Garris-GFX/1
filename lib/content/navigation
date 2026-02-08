// lib/content/navigation.ts

export type PrevNext<T> = {
  prev?: T;
  next?: T;
};

/**
 * Given a sorted list (typically newest -> oldest) and a current slug,
 * return previous (older) and next (newer) items using your current convention:
 * - prev = items[index + 1]
 * - next = items[index - 1]
 */
export function getPrevNextBySlug<T extends { slug: string }>(
  items: T[],
  currentSlug: string
): PrevNext<T> {
  const index = items.findIndex((x) => x.slug === currentSlug);
  if (index < 0) return {};

  const prev = index >= 0 ? items[index + 1] : undefined;
  const next = index > 0 ? items[index - 1] : undefined;

  return { prev, next };
}
