import WorkGrid from "@/app/work/WorkGrid";
import { getAllWorkMeta } from "@/lib/work";

export const metadata = {
  title: "Work | Garris Graphics",
  description:
    "Selected projects across branding and websites — designed for clarity, performance, and real constraints.",
};

export default async function WorkIndexPage() {
  const projects = await getAllWorkMeta();
  return <WorkGrid projects={projects} />;
}
