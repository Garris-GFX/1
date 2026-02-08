import { Panel } from "@/components/ui";

export default function ProcessStep({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Panel padding="tile" className="my-6 border border-stroke rounded-card shadow-card">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-sm font-semibold text-black">
          {number}
        </div>
        <div className="text-sm font-semibold text-white">{title}</div>
      </div>

      <div className="mt-3 text-sm leading-relaxed text-muted">{children}</div>
    </Panel>
  );
}
