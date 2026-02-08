/* eslint-disable react/no-unescaped-entities */
"use client";
import * as React from "react";
import Link from "next/link";
import {Breadcrumbs} from "@/components/layout/Breadcrumbs";

type PlanKey = "basic" | "standard" | "pro";

type Plan = {
  key: PlanKey;
  name: string;
  price: number;
  badge?: string; // e.g. "Recommended for Business"
  subBadge?: string; // e.g. "Content Heavy"
  tagline: string;
  note?: string;
  bullets: string[];
};

type CompareRow = {
  label: string;
  values: Partial<Record<PlanKey, React.ReactNode>>;
};

type PricingSet = {
  crumbs: Array<{ label: string; href?: string }>;
  hero: {
    title: string;
    description: string;
  };
  sectionTitle: string;
  sectionSubtitle: string;
  plans: Plan[];
  compare: {
    title: string;
    subtitle: string;
    rows: CompareRow[];
    rowsExpanded?: CompareRow[];
  };
  hosting: {
    title: string;
    subtitle: string;
    cards: Array<{
      title: string;
      body: string;
      priceRight?: string;
      note?: string;
      href?: string;
      hrefLabel?: string;
    }>;
  };
  emailAdmin: {
    title: string;
    subtitle: string;
    cards: Array<{
      title: string;
      body: string;
      note?: string;
      href?: string;
      hrefLabel?: string;
    }>;
  };
};

type Mode = "websites" | "graphics";

/* -----------------------------
   DATA: edit these two sets
-------------------------------- */
const WEBSITE_PRICING: PricingSet = {
  crumbs: [
    { label: "Services", href: "/services/website" },
    { label: "Website Design", href: "/services/website" },
    { label: "Pricing" },
  ],
  hero: {
    title: "Pricing",
    description:
      "Explore pricing for all services related to Website Design, Development, Hosting & more. Use the toggle to view pricing for graphic design.",
  },
  sectionTitle: "Website Design & Development",
  sectionSubtitle:
    "Choose a plan that suits you best. Then select hosting and extras as needed.",
  plans: [
    {
      key: "basic",
      name: "Basic",
      price: 1999,
      tagline: "No fluff. Just what you need.",
      note: "(Hosting Subscription Not Included)",
      bullets: [
        "Home, Services & Contact Pages",
        "Basic Hosted Email Address",
        "SEO Structure & Sitemap + robots",
        "Privacy & Cookie Policies, hCaptcha and (1) basic form",
      ],
    },
    {
      key: "standard",
      name: "Standard",
      price: 4999,
      badge: "Recommended for Business",
      tagline: "Everything your business needs to start strong.",
      note: "(Hosting Subscription Not Included)",
      bullets: [
        "Up to 8 total pages",
        "Complex Form Integration",
        "Google Business Integration",
        "Professional Email Integration (Google Workspace/Microsoft)",
      ],
    },
    {
      key: "pro",
      name: "Pro",
      price: 9999,
      subBadge: "Content Heavy",
      tagline: "Everything from basic, plus:",
      note: "(Hosting Subscription Not Included)",
      bullets: [
        "Up to 15 total pages",
        "Full Copy + High Quality Imagery",
        "Content-heavy structure",
        "Structured Navigation + Page hierarchy for larger sites",
      ],
    },
  ],
  compare: {
    title: "Compare Plan Pricing",
    subtitle: "Get an overall comparison of website plan pricing",
    rows: [
      {
        label: "Total Number of Pages",
        values: { basic: "3 Pages", standard: "Up to 8 Pages", pro: "Up to 15 Pages" },
      },
      {
        label: "Basic Hosted Email Address",
        values: { basic: "✓", standard: "✓", pro: "✓" },
      },
      {
        label: "SEO Structure & Sitemap + robots",
        values: { basic: "✓", standard: "✓", pro: "✓" },
      },
      {
        label: "Privacy & Cookie Policies, hCaptcha and (1) basic form",
        values: { basic: "✓", standard: "✓", pro: "✓" },
      },
      {
        label: "Copywriting & Imagery",
        values: { basic: "No Provided Copy", standard: "Copy Support", pro: "Full Copy/Imagery" },
      },
      {
        label: "Complex Form Integration, Email Routing",
        values: { basic: "—", standard: "✓", pro: "✓" },
      },
      {
        label: "Google Business Integration",
        values: { basic: "—", standard: "✓", pro: "✓" },
      },
      {
        label: "Professional Email Integration",
        values: { basic: "—", standard: "✓", pro: "✓" },
      },
    ],
    rowsExpanded: [
      {
        label: "Content-heavy structure",
        values: { basic: "—", standard: "—", pro: "✓" },
      },
      {
        label: "Structured Navigation + Page hierarchy",
        values: { basic: "—", standard: "—", pro: "✓" },
      },
    ],
  },
  hosting: {
    title: "Hosting & Management",
    subtitle:
      "One size fits all hosting for businesses and small projects. Additional options are available.",
    cards: [
      {
        title: "Managed hosting (flat rate)",
        body: "Everything your business needs to be more productive and secure.",
        note: "(Hosting Subscription Not Included)",
        priceRight: "$59 / Month",
        href: "/services/website",
        hrefLabel: "Learn more",
      },
      {
        title: "Other Hosting",
        body: "Everything your business needs to be more productive and secure.",
        note: "(Hosting Subscription Not Included)",
        href: "/services/website",
        hrefLabel: "Learn more",
      },
    ],
  },
  emailAdmin: {
    title: "Business Email Administration",
    subtitle:
      "Admin services for setup, routing, and deliverability support. Email subscriptions are separate.",
    cards: [
      {
        title: "Simple Admin",
        body: "Everything your business needs to be more productive and secure.",
        note: "(Hosting Subscription Not Included)",
        href: "/services/email",
        hrefLabel: "Learn more",
      },
      {
        title: "Advanced Admin",
        body: "Everything your business needs to be more productive and secure.",
        note: "(Hosting Subscription Not Included)",
        href: "/services/email",
        hrefLabel: "Learn more",
      },
    ],
  },
};

const GRAPHICS_PRICING: PricingSet = {
  crumbs: [
    { label: "Services", href: "/services/design" },
    { label: "Design Services", href: "/services/design" },
    { label: "Pricing" },
  ],
  hero: {
    title: "Pricing",
    description:
      "Explore pricing for graphic design services. Use the toggle to view website pricing.",
  },
  sectionTitle: "Graphic Design Services",
  sectionSubtitle: "Pick the service that fits your project and timeline.",
  plans: [
    {
      key: "basic",
      name: "Starter",
      price: 399,
      tagline: "Simple, fast, clean.",
      bullets: ["Single asset design", "2 revisions", "Export-ready files"],
    },
    {
      key: "standard",
      name: "Brand Kit",
      price: 1299,
      badge: "Most Popular",
      tagline: "A full set you can use everywhere.",
      bullets: ["Logo + variations", "Color + type system", "Basic usage guide"],
    },
    {
      key: "pro",
      name: "Full Identity",
      price: 2999,
      subBadge: "Strategy",
      tagline: "Everything needed for a serious launch.",
      bullets: ["Identity system", "Brand guidelines", "Social + print templates"],
    },
  ],
  compare: {
    title: "Compare Design Pricing",
    subtitle: "A quick overview of what you get with each package",
    rows: [
      { label: "Deliverables", values: { basic: "1", standard: "Multiple", pro: "Full system" } },
      { label: "Revisions", values: { basic: "2", standard: "3", pro: "4" } },
      { label: "Guidelines", values: { basic: "—", standard: "Basic", pro: "Full" } },
      { label: "Templates", values: { basic: "—", standard: "Some", pro: "Yes" } },
    ],
  },
  hosting: {
    title: "Production Add-ons",
    subtitle: "Optional support for print, exports, and handoff formatting.",
    cards: [
      {
        title: "Print prep",
        body: "Bleeds, crop marks, CMYK conversions, vendor-ready files.",
        href: "/contact",
        hrefLabel: "Ask about it",
      },
      {
        title: "Template system",
        body: "Build reusable templates for social, ads, or docs.",
        href: "/contact",
        hrefLabel: "Ask about it",
      },
    ],
  },
  emailAdmin: {
    title: "Brand Admin Support",
    subtitle: "Help applying the system across tools and platforms.",
    cards: [
      {
        title: "Asset organization",
        body: "Folder structure, naming, exports, and delivery.",
        href: "/contact",
        hrefLabel: "Ask about it",
      },
      {
        title: "Rollout help",
        body: "Update profiles, headers, icons, and socials.",
        href: "/contact",
        hrefLabel: "Ask about it",
      },
    ],
  },
};

/* -----------------------------
   UI bits
-------------------------------- */
function Segmented({
  value,
  onChange,
}: {
  value: Mode;
  onChange: (v: Mode) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-pill bg-white/10 p-1">
      <button
        type="button"
        onClick={() => onChange("graphics")}
        className={[
          "px-4 py-2 rounded-pill text-small",
          value === "graphics" ? "bg-white text-black" : "text-text/80 hover:text-white",
        ].join(" ")}
      >
        Graphics
      </button>
      <button
        type="button"
        onClick={() => onChange("websites")}
        className={[
          "px-4 py-2 rounded-pill text-small",
          value === "websites" ? "bg-white text-black" : "text-text/80 hover:text-white",
        ].join(" ")}
      >
        Websites
      </button>
    </div>
  );
}

function Money({ n }: { n: number }) {
  return (
    <div className="flex items-baseline gap-2">
      <div className="text-[42px] leading-none font-semibold text-white">${n}</div>
      <div className="text-small text-text/70">OTP</div>
    </div>
  );
}

function CheckOrDash({ v }: { v: React.ReactNode }) {
  const isCheck = v === "✓";
  const isDash = v === "—";
  if (isCheck) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80">
        ✓
      </span>
    );
  }
  if (isDash) return <span className="text-text/40">—</span>;
  return <span className="text-text/80">{v}</span>;
}

/* -----------------------------
   Page
-------------------------------- */
export default function PricingPage() {
  const [mode, setMode] = React.useState<Mode>("websites");

  // Premium transition: separate "selected" mode from "rendered" mode.
  const [renderMode, setRenderMode] = React.useState<Mode>("websites");
  const [isSwitching, setIsSwitching] = React.useState(false);

  // start CLOSED by default
  const [expandTable, setExpandTable] = React.useState(false);

  const data = renderMode === "websites" ? WEBSITE_PRICING : GRAPHICS_PRICING;

  // Fix toggle: ensure base rows never accidentally include expanded rows (even if data got tweaked)
  const { baseRows, expandedRows } = React.useMemo(() => {
    const expanded = data.compare.rowsExpanded ?? [];
    const expandedLabels = new Set(expanded.map((r) => r.label));
    const base = data.compare.rows.filter((r) => !expandedLabels.has(r.label));
    return { baseRows: base, expandedRows: expanded };
  }, [data]);

  // Full rows only (no partial display anymore)
  const allRows = React.useMemo(() => [...baseRows, ...expandedRows], [baseRows, expandedRows]);
  const hasTableContent = allRows.length > 0;

  const handleModeChange = React.useCallback(
    (next: Mode) => {
      if (next === mode) return;

      setMode(next);
      setIsSwitching(true);

      // Fade out slightly, swap data, then fade in.
      window.setTimeout(() => {
        setRenderMode(next);
        setExpandTable(false); // reset closed on mode swap
        window.requestAnimationFrame(() => setIsSwitching(false));
      }, 160);
    },
    [mode]
  );

  // TOP OF PAGE SHOULD NOT CHANGE:
  const staticCrumbs = React.useMemo(
    () => [
      { label: "Pricing", href: "/pricing" },
      { label: "Pricing Overview" },
    ],
    []
  );
  const staticHero = WEBSITE_PRICING.hero;

  return (
    <main className="min-h-screen bg-card text-text">
      <div className="mx-auto max-w-[1200px] px-6 py-12 lg:px-12">
        {/* breadcrumbs (static) */}
        <Breadcrumbs items={staticCrumbs} />

        {/* hero (static) */}
        <div className="mt-6 space-y-4">
          <h1 className="text-h1 tracking-tightish text-white">{staticHero.title}</h1>
          <p className="text-body text-muted max-w-[75ch]">{staticHero.description}</p>
        </div>

        {/* section header + toggle */}
        <div className="mt-section flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <h2 className="text-h2 tracking-tightish text-white">{data.sectionTitle}</h2>
            <p className="text-body text-muted">{data.sectionSubtitle}</p>
          </div>

          <Segmented value={mode} onChange={handleModeChange} />
        </div>

        {/* PREMIUM TRANSITION WRAPPER (only this content changes) */}
        <div
          className={[
            "transition-[opacity,transform,filter] duration-300 ease-out will-change-[opacity,transform,filter]",
            isSwitching ? "opacity-0 -translate-y-1 blur-[2px]" : "opacity-100 translate-y-0 blur-0",
          ].join(" ")}
        >
          {/* plan cards */}
          <div className="mt-card grid gap-card lg:grid-cols-3">
            {data.plans.map((p) => (
              <div
                key={p.key}
                className={[
                  "rounded-card bg-white/5 border border-white/10 p-card",
                  p.badge ? "relative pt-12 bg-white/7 border-white/20" : "",
                ].join(" ")}
              >
                {p.badge ? (
                  <div className="absolute inset-x-0 top-0 rounded-t-card border-b border-white/10 bg-black/35 px-6 py-3">
                    <div className="text-small text-white/80">{p.badge}</div>
                  </div>
                ) : null}

                <div className="flex items-center justify-between gap-3">
                  <div className="text-xl font-semibold text-white/90">{p.name}</div>
                  {p.subBadge ? (
                    <div className="rounded-pill bg-white/10 px-3 py-1 text-small text-text/80">
                      {p.subBadge}
                    </div>
                  ) : null}
                </div>

                <div className="mt-2 text-small text-text/70">{p.tagline}</div>

                <div className="mt-6">
                  <Money n={p.price} />
                  {p.note ? <div className="mt-2 text-small text-text/50">{p.note}</div> : null}
                </div>

                <div className="mt-6 h-px w-full bg-white/10" />

                <div className="mt-5 text-small text-text/70">
                  Everything you need, nothing you don't
                </div>

                <ul className="mt-4 space-y-2 text-body text-muted">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-[0.35rem] h-3 w-3 rounded-[4px] border border-white/15 bg-white/5" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* compare table header */}
          <div className="mt-section flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <h3 className="text-h3 tracking-tightish text-white/90">{data.compare.title}</h3>
              <p className="text-body text-muted">{data.compare.subtitle}</p>
            </div>

            {hasTableContent ? (
              <label className="inline-flex items-center gap-3 text-small text-text/70">
                <span>{expandTable ? "Hide Pricing Table" : "Show Pricing Table"}</span>
                <button
                  type="button"
                  onClick={() => setExpandTable((v) => !v)}
                  className="relative inline-flex h-7 w-12 items-center rounded-pill border border-white/10 bg-white/5"
                  aria-pressed={expandTable}
                >
                  <span
                    className={[
                      "absolute left-1 top-1 h-5 w-5 rounded-pill bg-white transition-transform duration-200",
                      expandTable ? "translate-x-5" : "translate-x-0",
                    ].join(" ")}
                  />
                </button>
              </label>
            ) : null}
          </div>

          {/* compare table (HIDDEN by default, shows FULL table when toggled on) */}
          {expandTable ? (
            <div className="mt-card overflow-hidden rounded-panel border border-white/10 bg-white/5">
              <div className="grid grid-cols-[1.3fr_1fr_1fr_1fr]">
                <div className="px-6 py-4 text-small text-text/60"> </div>

                <div className="px-6 py-4 text-small text-white/80 text-center">Basic</div>
                <div className="px-6 py-4 text-small text-white/90 text-center">
                  <div className="inline-flex w-full items-center justify-center gap-2">
                    <span>Standard</span>
                  </div>
                </div>
                <div className="px-6 py-4 text-small text-white/80 text-center">Pro</div>
              </div>

              <div className="h-px w-full bg-white/10" />

              {allRows.map((r, idx) => (
                <React.Fragment key={`${r.label}-${idx}`}>
                  <div className="grid grid-cols-[1.3fr_1fr_1fr_1fr]">
                    <div className="px-6 py-5 text-body text-text/70">{r.label}</div>

                    <div className="px-6 py-5 text-body text-center">
                      <div className="flex justify-center">
                        <CheckOrDash v={r.values.basic ?? "—"} />
                      </div>
                    </div>
                    <div className="px-6 py-5 text-body bg-white/3 text-center">
                      <div className="flex justify-center">
                        <CheckOrDash v={r.values.standard ?? "—"} />
                      </div>
                    </div>
                    <div className="px-6 py-5 text-body text-center">
                      <div className="flex justify-center">
                        <CheckOrDash v={r.values.pro ?? "—"} />
                      </div>
                    </div>
                  </div>
                  <div className="h-px w-full bg-white/10" />
                </React.Fragment>
              ))}
            </div>
          ) : null}

          {/* hosting */}
          <div className="mt-section space-y-3">
            <h3 className="text-h3 tracking-tightish text-white/90">{data.hosting.title}</h3>
            <p className="text-body text-muted">{data.hosting.subtitle}</p>

            <div className="mt-card grid gap-card lg:grid-cols-2">
              {data.hosting.cards.map((c) => (
                <div key={c.title} className="rounded-card bg-white/5 border border-white/10 p-card">
                  <div className="flex items-end justify-between gap-6">
                    <div>
                      <div className="text-xl text-white/90">{c.title}</div>
                      <div className="mt-2 text-small text-text/70">{c.body}</div>
                      {c.note ? <div className="mt-2 text-small text-text/50">{c.note}</div> : null}
                    </div>

                    {c.priceRight ? (
                      <div className="text-right">
                        <div className="text-[34px] leading-none font-semibold text-white">
                          {c.priceRight}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {c.href ? (
                    <div className="mt-5">
                      <Link
                        href={c.href}
                        className="inline-flex items-center rounded-pill bg-white/10 px-4 py-2 text-small text-text/80 hover:text-white border border-white/10"
                      >
                        {c.hrefLabel ?? "Learn more"}
                      </Link>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* email admin */}
          <div className="mt-section space-y-3">
            <h3 className="text-h3 tracking-tightish text-white/90">{data.emailAdmin.title}</h3>
            <p className="text-body text-muted">{data.emailAdmin.subtitle}</p>

            <div className="mt-card grid gap-card lg:grid-cols-2">
              {data.emailAdmin.cards.map((c) => (
                <div key={c.title} className="rounded-card bg-white/5 border border-white/10 p-card">
                  <div className="text-xl text-white/90">{c.title}</div>
                  <div className="mt-2 text-small text-text/70">{c.body}</div>
                  {c.note ? <div className="mt-2 text-small text-text/50">{c.note}</div> : null}

                  {c.href ? (
                    <div className="mt-5">
                      <Link
                        href={c.href}
                        className="inline-flex items-center rounded-pill bg-white/10 px-4 py-2 text-small text-text/80 hover:text-white border border-white/10"
                      >
                        {c.hrefLabel ?? "Learn more"}
                      </Link>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* bottom spacing */}
          <div className="h-page" />
        </div>
      </div>
    </main>
  );
}
