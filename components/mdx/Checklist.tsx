import { Panel } from "@/components/ui";

export default function Checklist({
  title,
  items,
}: {
  title?: string;
  items: string[];
}) {
  return (
    <Panel padding="tile" className="my-6 border border-stroke rounded-card shadow-card">
      {title ? <div className="text-sm font-semibold text-white">{title}</div> : null}

      <ul className="mt-3 space-y-2 text-sm text-muted">
        {items.map((t, i) => (
          <li key={i} className="flex gap-3">
            <span
              className="mt-[2px] inline-block h-4 w-4 rounded-md border border-stroke bg-white/5"
              aria-hidden="true"
            />
            <span className="text-text">{t}</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
