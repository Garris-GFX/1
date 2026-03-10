import HomeGuides from "./HomeGuides";

export default function HomeProcess() {
  return (
    <section className="w-full">
      <div className="relative mx-6 md:mx-12 rounded-panel shadow-panel overflow-visible">
        <div className="absolute inset-0 rounded-panel bg-white/[0.02]" />
        <div className="pointer-events-none absolute inset-0 rounded-panel ring-1 ring-white/10" />
      <HomeGuides />

      <div className="p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_2fr] items-stretch">
          <div className="space-y-4">
            <h2 className="text-h2 font-semibold tracking-tightish">
              Get back to doing what you do best.
            </h2>
            <p className="text-body text-text/85 max-w-[52ch]">
              We&apos;ll handle your branding so you can get back to running your business. (highlighted word updates automatically)
            </p>
          </div>

          {/* Process "slider" placeholder */}
          <div className="rounded-card bg-page/55 border border-white/10 shadow-card p-6 md:p-8 flex flex-col justify-between">
            <div className="text-center text-muted text-small">Process Component</div>

            <div className="mt-10">
              <div className="h-px bg-white/15 relative">
                <div className="absolute left-0 top-0 h-px w-[38%] bg-white/70" />
                <div className="absolute left-[38%] top-1/2 -translate-y-1/2 size-3 rounded-full bg-white/80" />
                <div className="absolute left-[62%] top-1/2 -translate-y-1/2 size-2 rounded-full bg-white/20" />
                <div className="absolute left-[78%] top-1/2 -translate-y-1/2 size-2 rounded-full bg-white/20" />
                <div className="absolute left-[92%] top-1/2 -translate-y-1/2 size-2 rounded-full bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
          </div>
    </section>
  );
}
