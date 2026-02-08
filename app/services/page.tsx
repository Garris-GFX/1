"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

type Tile = {
  title: string;
  active?: boolean;
  links: Array<{ label: string; href: string }>;
};

const TILES: Tile[] = [
  {
    title: "Logo\n& Branding Design",
    links: [
      { label: "View Pricing", href: "/pricing" },
      { label: "Terms of Service", href: "/legal/terms-of-service" },
      { label: "Refunds", href: "/legal/refunds" },
    ],
  },
  {
    title: "Website Design\n& Development",
    active: true,
    links: [
      { label: "View Pricing", href: "/pricing" },
      { label: "Terms of Service", href: "/legal/terms-of-service" },
      { label: "Refunds", href: "/legal/refunds" },
    ],
  },
  {
    title: "Business Email\nAdministration",
    links: [
      { label: "View Pricing", href: "/pricing" },
      { label: "Terms of Service", href: "/legal/terms-of-service" },
      { label: "Refunds", href: "/legal/refunds" },
    ],
  },
  {
    title: "Hosting\n& Management",
    links: [{ label: "Visit Hosting", href: "/hosting" }],
  },
  {
    title: "Marketing Design",
    links: [{ label: "View Work", href: "/work" }],
  },
  {
    title: "Social Media Design",
    links: [{ label: "View Work", href: "/work" }],
  },
  {
    title: "Support Services",
    links: [{ label: "Visit Support Services", href: "/support-services" }],
  },
  {
    title: "File Storage",
    links: [{ label: "Request File Access", href: "/contact" }],
  },
];

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path d="M7 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M13 8l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServiceTile({ tile }: { tile: Tile }) {
  const isBig = tile.links.length > 1;

  return (
    <div
      onPointerMove={(e) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      onPointerLeave={(e) => {
        const el = e.currentTarget;
        el.style.setProperty("--mx", `50%`);
        el.style.setProperty("--my", `50%`);
      }}
      style={
        {
          ["--mx" as any]: "50%",
          ["--my" as any]: "50%",
        } as CSSProperties
      }
      className={[
        "group relative rounded-tile",
        // border thickness
        "p-[2px]",
        // make the border invisible until it glows
        "bg-bg",
      ].join(" ")}
    >
      {/* Border-only localized glow (masked to a ring) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-tile opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(180px circle at var(--mx) var(--my), rgba(255,255,255,.75), rgba(255,255,255,0) 60%)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "2px",
        }}
      />

      {/* Extra beam bloom (still border-only via mask) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-tile opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        style={{
          boxShadow: "0 0 26px rgba(255,255,255,.16)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "2px",
        }}
      />

      {/* Inner tile */}
      <div
        className={[
          "relative rounded-[calc(var(--radius-tile)-2px)] bg-bg p-tile shadow-tile",
          "flex flex-col",
          isBig ? "lg:min-h-[220px]" : "lg:min-h-[140px]",
          // keep optional active state without revealing a border
          tile.active ? "ring-1 ring-text/15" : "",
        ].join(" ")}
      >
        <div className="text-xl text-white/90 leading-tight whitespace-pre-line">
          {tile.title}
        </div>

        <div className="mt-auto pt-6 flex flex-col gap-2">
          {tile.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group/link inline-flex items-center gap-2 text-small text-text/70 hover:text-white"
            >
              <span>{l.label}</span>
              <ArrowRight className="h-4 w-4 translate-y-[0.5px] opacity-70 group-hover/link:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Container className="py-section">
      <div className="space-y-card">
        <Breadcrumbs className="text-text/60" items={[{ label: "Services" }]} />

        <div className="space-y-tile">
          <h1 className="text-h1 tracking-tightish text-white">Services</h1>
          <p className="text-body text-muted max-w-[70ch]">
            Guides, policies, and tools to help you understand our services and make better decisions.
          </p>
        </div>

        <div className="grid gap-tile sm:grid-cols-2 lg:grid-cols-3">
          {TILES.map((t) => (
            <ServiceTile key={t.title} tile={t} />
          ))}
        </div>
      </div>
    </Container>
  );
}
