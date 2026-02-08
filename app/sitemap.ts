import type { MetadataRoute } from "next";
import { getAllPostsMeta as getAllBlogPosts } from "@/lib/resources";
import { getAllPostsMeta as getAllResourcePosts } from "@/lib/resources";
import { getAllWorkMeta } from "@/lib/work";

const SITE_URL = "https://garris.graphics";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getAllBlogPosts();
  const resourcePosts = await getAllResourcePosts();
  const workPosts = await getAllWorkMeta();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/work`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/resources`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/design-services`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/website-services`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
    },
  ];

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
  }));

  const resourcePages: MetadataRoute.Sitemap = resourcePosts.map((post) => ({
    url: `${SITE_URL}/resources/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
  }));

  const workPages: MetadataRoute.Sitemap = workPosts.map((work) => ({
    url: `${SITE_URL}/work/${work.slug}`,
    lastModified: work.date ? new Date(work.date) : new Date(),
  }));

  return [...staticPages, ...blogPages, ...resourcePages, ...workPages];
}
