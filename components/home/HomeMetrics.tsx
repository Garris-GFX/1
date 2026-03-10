import HomeGuides from "./HomeGuides";

const items = [
  { label: "ROI (Return On Investment)", value: "100%" },
  { label: "ROI (Return On Investment)", value: "10x" },
  { label: "ROI (Return On Investment)", value: "67%" },
  { label: "Support Services available", value: "24/7" },
];

export default function HomeMetrics() {
  return (
    <section className="w-full">
      <div className="relative mx-6 md:mx-12 rounded-panel shadow-panel overflow-visible">
        <div className="absolute inset-0 rounded-panel bg-white/[0.02]" />
        <div className="pointer-events-none absolute inset-0 rounded-panel ring-1 ring-white/10" />
      <HomeGuides />

      <div className="p-8 md:p-12 space-y-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-h2 font-semibold tracking-tightish max-w-[36ch]">
              Wondering why you should invest in a designer?
            </h2>
            <p className="text-body text-text/85 max-w-[60ch]">
              Don&apos;t think of it like investing in a designer. Invest in your business...
            </p>
          </div>

          <button
            type="button"
            className="shrink-0 size-16 rounded-full border border-white/25 text-text/80 hover:text-text hover:border-white/45 transition flex items-center justify-center"
            aria-label="Help"
          >
            ?
          </button>
        </div>

        <div className="grid md:grid-cols-4 border border-white/12 rounded-card overflow-hidden">
          {items.map((it, idx) => (
            <div
              key={it.value}
              className={[
                "p-6 md:p-7 bg-page/45",
                idx !== 0 ? "border-l border-white/12" : "",
              ].join(" ")}
            >
              <div className="text-crumbs uppercase tracking-crumbs text-muted">
                {it.label}
              </div>
              <div className="mt-2 text-h2 font-semibold text-text">{it.value}</div>
            </div>
          ))}
        </div>
      </div>
          </div>
    </section>
  );
}
