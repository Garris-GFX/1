"use client";

import * as React from "react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

type FilterKey = "All" | "Graphics" | "Websites" | "Selected";

type Item = {
  id: string;
  label: string;
  priceLabel: string; // keep as display string for v1
  priceValue?: number; // optional numeric (if not present, treated as "Quoted")
  badge?: string;
  category: "Graphics" | "Websites" | "Hosting" | "Email" | "Social" | "Updates" | "Custom" | "Marketing";
  section: string;
};

type Section = {
  title: string;
  items: Item[];
};

const SECTIONS: Section[] = [
  {
    title: "Website Design & Development",
    items: [
      { id: "web-basic", label: "Basic", priceLabel: "$1999", priceValue: 1999, category: "Websites", section: "Website Design & Development" },
      { id: "web-standard", label: "Standard", priceLabel: "$4999", priceValue: 4999, category: "Websites", section: "Website Design & Development" },
      { id: "web-pro", label: "Pro", priceLabel: "$9999", priceValue: 9999, category: "Websites", section: "Website Design & Development" },
    ],
  },
  {
    title: "Logo, Branding & Design Development",
    items: [
      { id: "brand-basic", label: "Basic", priceLabel: "$999", priceValue: 999, category: "Graphics", section: "Logo, Branding & Design Development" },
      { id: "brand-standard", label: "Standard", priceLabel: "$1999", priceValue: 1999, badge: "Pro Web Bundle", category: "Graphics", section: "Logo, Branding & Design Development" },
      { id: "brand-pro", label: "Pro", priceLabel: "$2999", priceValue: 2999, category: "Graphics", section: "Logo, Branding & Design Development" },
    ],
  },
  {
    title: "Hosting & Management",
    items: [
      { id: "hosting-gfx", label: "Garris GFX (Flat Rate)", priceLabel: "$59 / Mo.", priceValue: 59, category: "Hosting", section: "Hosting & Management" },
      { id: "hosting-vps", label: "Dedicated VPS or BYO host", priceLabel: "Quoted", category: "Hosting", section: "Hosting & Management" },
    ],
  },
  {
    title: "Professional Email Administration",
    items: [
      { id: "email-simple", label: "Simple", priceLabel: "Quoted", category: "Email", section: "Professional Email Administration" },
      { id: "email-advanced", label: "Advanced", priceLabel: "Quoted", category: "Email", section: "Professional Email Administration" },
    ],
  },
  {
    title: "Social Media",
    items: [
      { id: "social-handoff", label: "Account Creation & Hand Off", priceLabel: "Quoted", category: "Social", section: "Social Media" },
      { id: "social-starter", label: "Social Media Starter Design Kit", priceLabel: "Quoted", category: "Social", section: "Social Media" },
      { id: "social-pro", label: "Social Media Pro Design Kit", priceLabel: "$249", priceValue: 249, category: "Social", section: "Social Media" },
    ],
  },
  {
    title: "Scheduled Content Updates",
    items: [
      { id: "updates-monthly", label: "Monthly", priceLabel: "Quoted", category: "Updates", section: "Scheduled Content Updates" },
      { id: "updates-yearly", label: "Yearly", priceLabel: "$249", priceValue: 249, category: "Updates", section: "Scheduled Content Updates" },
    ],
  },
  {
    title: "Custom Web Development",
    items: [
      { id: "custom-cms", label: "Headless CMS or Wordpress.org (for Blog)", priceLabel: "Quoted", category: "Custom", section: "Custom Web Development" },
      { id: "custom-ecom", label: "eCommerce", priceLabel: "Quoted", category: "Custom", section: "Custom Web Development" },
      { id: "custom-backend", label: "Backend Development: Auths, Portals, Complex", priceLabel: "$249", priceValue: 249, category: "Custom", section: "Custom Web Development" },
    ],
  },
  {
    title: "Marketing",
    items: [
      { id: "mkt-calendar", label: "Google Workspace Calendar Integration", priceLabel: "Quoted", category: "Marketing", section: "Marketing" },
      { id: "mkt-booking", label: "Booking software Integration", priceLabel: "Quoted", category: "Marketing", section: "Marketing" },
      { id: "mkt-api", label: "Metrics, Analytics and API integration", priceLabel: "$249", priceValue: 249, category: "Marketing", section: "Marketing" },
    ],
  },
];

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function InfoDot({ title }: { title: string }) {
  return (
    <button
      type="button"
      aria-label={title}
      title={title}
      className={cx(
        "h-7 w-7 rounded-full",
        "grid place-items-center",
        "bg-black/20 hover:bg-black/30",
        "text-text/60 hover:text-white",
        "transition"
      )}
    >
      <span className="text-sm leading-none">i</span>
    </button>
  );
}

function Checkbox({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      className={cx(
        "h-6 w-6 rounded-[6px] border",
        "grid place-items-center",
        disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
        checked ? "bg-white/10 border-white/30" : "bg-black/20 border-white/10",
        "transition"
      )}
      aria-pressed={checked}
    >
      {checked ? <span className="text-white text-sm">✓</span> : null}
    </button>
  );
}

function FilterPills({
  active,
  onChange,
  selectedCount,
}: {
  active: FilterKey;
  onChange: (k: FilterKey) => void;
  selectedCount: number;
}) {
  const pills: Array<{ key: FilterKey; label: string }> = [
    { key: "All", label: "All" },
    { key: "Graphics", label: "Graphics" },
    { key: "Websites", label: "Websites" },
    { key: "Selected", label: `Selected (${selectedCount})` },
  ];

  return (
    <div className="flex items-center gap-2">
      {pills.map((p) => {
        const isActive = p.key === active;
        return (
          <button
            key={p.key}
            type="button"
            onClick={() => onChange(p.key)}
            className={cx(
              "px-4 py-2 rounded-pill text-small transition",
              isActive ? "bg-white text-black" : "bg-black/20 text-text/70 hover:text-white hover:bg-black/30"
            )}
          >
            {p.label}
          </button>
        );
      })}
    </div>
  );
}

function SectionCard({
  title,
  selectedCount,
  children,
}: {
  title: string;
  selectedCount: number;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <div className="text-body text-white/90">{title}</div>
        <div className="text-small text-text/50">Selected ({selectedCount})</div>
      </div>

      <div className="rounded-panel border border-white/10 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function Row({
  item,
  checked,
  onToggle,
}: {
  item: Item;
  checked: boolean;
  onToggle: () => void;
}) {
  const quoted = item.priceValue == null && item.priceLabel.toLowerCase().includes("quoted");
  return (
    <div
      className={cx(
        "flex items-center gap-4",
        "px-5 py-4",
        "border-t border-white/10 first:border-t-0",
        checked ? "bg-white/10" : "bg-black/10 hover:bg-black/15",
        "transition"
      )}
    >
      <Checkbox checked={checked} onChange={onToggle} />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3 min-w-0">
          <div className="text-body text-text/80 truncate">{item.label}</div>
          {item.badge ? (
            <span className="px-3 py-1 rounded-pill bg-black/25 text-small text-text/70">
              {item.badge}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className={cx("text-body", quoted ? "text-text/50" : "text-text/70")}>
          {item.priceLabel}
        </div>
        <InfoDot title="More info" />
      </div>
    </div>
  );
}

function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between w-full gap-4"
    >
      <div className="text-small text-text/70">{label}</div>
      <div
        className={cx(
          "h-6 w-12 rounded-full p-1 transition",
          checked ? "bg-white/30" : "bg-black/20"
        )}
        aria-pressed={checked}
      >
        <div
          className={cx(
            "h-4 w-4 rounded-full bg-white transition",
            checked ? "translate-x-6" : "translate-x-0"
          )}
        />
      </div>
    </button>
  );
}

export default function EstimatorPage() {
  const [activeFilter, setActiveFilter] = React.useState<FilterKey>("All");
  const [selected, setSelected] = React.useState<Record<string, boolean>>({
    "web-pro": true,
    "brand-standard": true,
    "hosting-gfx": true,
    "email-simple": true,
  });

  const selectedIds = React.useMemo(() => Object.keys(selected).filter((k) => selected[k]), [selected]);
  const selectedCount = selectedIds.length;

  const allItems = React.useMemo(() => SECTIONS.flatMap((s) => s.items), []);
  const selectedItems = React.useMemo(() => allItems.filter((i) => selected[i.id]), [allItems, selected]);

  const subtotal = React.useMemo(() => {
    return selectedItems.reduce((sum, i) => sum + (i.priceValue ?? 0), 0);
  }, [selectedItems]);

  // V1 bundle discount: if Pro website + Standard branding selected, subtract branding standard price as a “bundle”
  const bundleDiscount = React.useMemo(() => {
    const hasProWeb = !!selected["web-pro"];
    const hasBrandStd = !!selected["brand-standard"];
    if (hasProWeb && hasBrandStd) return 1999;
    return 0;
  }, [selected]);

  const total = Math.max(0, subtotal - bundleDiscount);

  const filteredSections = React.useMemo(() => {
    const isSelectedView = activeFilter === "Selected";

    return SECTIONS.map((s) => {
      const items = s.items.filter((i) => {
        if (activeFilter === "All") return true;
        if (activeFilter === "Graphics") return i.category === "Graphics";
        if (activeFilter === "Websites") return i.category === "Websites";
        if (isSelectedView) return !!selected[i.id];
        return true;
      });
      return { ...s, items };
    }).filter((s) => s.items.length > 0);
  }, [activeFilter, selected]);

  const perSectionSelectedCount = React.useMemo(() => {
    const map: Record<string, number> = {};
    for (const s of SECTIONS) {
      map[s.title] = s.items.reduce((n, i) => n + (selected[i.id] ? 1 : 0), 0);
    }
    return map;
  }, [selected]);

  const [clearToggle, setClearToggle] = React.useState(false);

  React.useEffect(() => {
    if (!clearToggle) return;
    setSelected({});
    // flip it back off after clearing (so it behaves like the mock “Clear All Selections” action)
    const t = window.setTimeout(() => setClearToggle(false), 250);
    return () => window.clearTimeout(t);
  }, [clearToggle]);

  return (
    <Container className="py-section">
      <div className="space-y-card">
        {/* crumbs (same component/pattern as Email Services) */}
        <Breadcrumbs
          className="text-text/60"
          items={[
            { label: "Services", href: "/services" },
            { label: "Graphic Design" },
            { label: "Pricing", href: "/pricing" },
            { label: "Estimator" },
          ]}
        />

        {/* page header (same spacing as Email Services) */}
        <div className="space-y-tile">
          <h1 className="text-h1 tracking-tightish text-white">Create an Estimate</h1>
          <p className="text-body text-muted max-w-[70ch]">
            Explore pricing for all services related to Website Design, Development, Hosting & more.
            Use the toggle to view pricing for graphic design.
          </p>
        </div>

        {/* main layout */}
        <div className="grid gap-card lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_420px]">
          {/* LEFT: estimator list panel */}
          <section className="rounded-panel border border-white/10 overflow-hidden">
            {/* top bar */}
            <div className="px-6 py-4 border-b border-white/10 bg-black/10">
              <div className="flex items-center justify-between gap-4">
                <div className="text-body text-white/90">Filters</div>
                <FilterPills
                  active={activeFilter}
                  onChange={setActiveFilter}
                  selectedCount={selectedCount}
                />
              </div>
            </div>

            {/* sections */}
            <div className="p-6 space-y-section">
              {filteredSections.map((s) => (
                <SectionCard
                  key={s.title}
                  title={s.title}
                  selectedCount={perSectionSelectedCount[s.title] ?? 0}
                >
                  {s.items.map((item) => (
                    <Row
                      key={item.id}
                      item={item}
                      checked={!!selected[item.id]}
                      onToggle={() =>
                        setSelected((prev) => ({
                          ...prev,
                          [item.id]: !prev[item.id],
                        }))
                      }
                    />
                  ))}
                </SectionCard>
              ))}
            </div>
          </section>

          {/* RIGHT: estimate summary */}
          <aside className="lg:sticky lg:top-24 self-start">
            <div className="rounded-panel border border-white/10 bg-black/10 p-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xl text-white/90 leading-tight">Estimate</div>
                  <div className="text-small text-text/60 mt-1">Plan(s)</div>
                </div>

                <div className="text-small text-text/60">
                  {selectedCount} selected
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {/* breakdown list (v1: show selected items grouped by section label-ish) */}
                <div className="space-y-2">
                  {selectedItems.slice(0, 6).map((i) => (
                    <div key={i.id} className="flex items-center justify-between gap-4">
                      <div className="text-small text-text/70 truncate">{i.label}</div>
                      <div className="text-small text-text/60 whitespace-nowrap">{i.priceLabel}</div>
                    </div>
                  ))}
                  {selectedItems.length > 6 ? (
                    <div className="text-small text-text/50">
                      + {selectedItems.length - 6} more
                    </div>
                  ) : null}
                </div>

                <div className="h-px bg-white/10" />

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-small text-text/60">Add-ons</div>
                    <div className="text-small text-text/60">0</div>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-small text-text/60">Quoted Items</div>
                    <div className="text-small text-text/60">
                      {selectedItems.filter((i) => (i.priceValue ?? null) == null).length}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-small text-text/60">Subtotal</div>
                    <div className="text-small text-white/90">${subtotal.toLocaleString()}</div>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-small text-text/60">Bundle Discounts</div>
                    <div className={cx("text-small", bundleDiscount ? "text-white/90" : "text-text/60")}>
                      {bundleDiscount ? `-$${bundleDiscount.toLocaleString()}` : "$0"}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 pt-2">
                    <div className="text-body text-white/90">Total</div>
                    <div className="text-body text-white/90">${total.toLocaleString()}</div>
                  </div>
                </div>

                <div className="mt-4 rounded-tile bg-black/20 p-tile">
                  <p className="text-small text-text/60">
                    Quoted items are included in your request summary but do not add to the estimate.
                  </p>

                  <div className="mt-4">
                    <Switch
                      checked={clearToggle}
                      onChange={setClearToggle}
                      label="Clear All Selections"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Container>
  );
}
