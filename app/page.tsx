import HomeHero from "@/components/home/HomeHero";
import ScreenSwap, { type ScreenSwapItem } from "@/components/home/ScreenSwap";
import HomeProcess from "@/components/home/HomeProcess";
import HomeMetrics from "@/components/home/HomeMetrics";
import HomeServicesScrollers from "@/components/home/HomeServicesScrollers";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import HomeAuditCTA from "@/components/home/HomeAuditCTA";
import { getAllWorkMeta } from "@/lib/work";

export default async function Page() {
  const work = await getAllWorkMeta();

  const items: ScreenSwapItem[] = work
    .filter((w) => !!w.thumbnail)
    .slice(0, 7)
    .map((w) => ({
      id: w.slug,
      title: w.title,
      href: `/work/${w.slug}`,
      src: w.thumbnail as string,
      excerpt: w.excerpt,
      alt: w.title,
      tags: w.tags ?? w.services ?? [],
    }));

  return (
    <main className="bg-page text-text py-16">
      <HomeHero />

      <div className="mt-12 md:mt-16 space-y-12 md:space-y-16">
        <HomeServicesScrollers />
        <HomeTestimonials />
        <ScreenSwap
          items={items}
          title="Featured Work"
          description="Swipe through a few recent projects - tap a title to open the case study."
        />
      </div>
    </main>
  );
}