import HomeGuides from "./HomeGuides";

export default function HomeAuditCTA() {
  return (
    <section className="w-full">
      <div className="relative mx-6 md:mx-12 rounded-panel shadow-panel overflow-visible">
        <div className="absolute inset-0 rounded-panel bg-white/[0.02]" />
        <div className="pointer-events-none absolute inset-0 rounded-panel ring-1 ring-white/10" />
      <HomeGuides />

      <div className="p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1.7fr] items-stretch">
          <div className="space-y-4">
            <h2 className="text-h2 font-semibold tracking-tightish">
              Ready for a <span className="font-semibold">Second Opinion?</span>
            </h2>
            <p className="text-body text-text/85 max-w-[62ch]">
              Let us take a look &amp; give you a quick audit.
            </p>
            <p className="text-small text-muted max-w-[70ch]">
              An audit is a great way to receive feedback, check to see if your project is on the right track or obtain helpful advice about what to do. Or sometimes not to-do concerning anything design. Reserve an audit now.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-card bg-page/55 border border-white/10 shadow-card p-6">
                <div className="text-small text-muted">Design contracts are not required.</div>
                <div className="mt-2 text-h3 font-semibold text-text">No Risk</div>
                <div className="mt-1 text-crumbs uppercase tracking-crumbs text-muted">
                  Audit offers are subject to terms and conditions.
                </div>
              </div>

              <div className="rounded-card bg-page/55 border border-white/10 shadow-card p-6">
                <div className="text-small text-muted">
                  Booking an audit comes at no cost to you.
                </div>
                <div className="mt-2 text-h3 font-semibold text-text">It&apos;s FREE!</div>
                <div className="mt-1 text-crumbs uppercase tracking-crumbs text-muted">
                  Audit offers are subject to terms and conditions.
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-card bg-page/55 border border-white/10 shadow-card p-6 md:p-8 flex items-center justify-center">
            <div className="text-muted text-small">Audit Component</div>
          </div>
        </div>
      </div>
          </div>
    </section>
  );
}
