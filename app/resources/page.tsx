import { getAllPostsMeta } from "@/lib/resources";
import ResourcesGrid from "./ResourcesGrid";

export default async function ResourcesPage() {
  const posts = await getAllPostsMeta();
  return <ResourcesGrid posts={posts} />;
}
