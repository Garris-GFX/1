// app/email-services/page.tsx
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Accordion } from "@/components/layout/Accordion";

type Tile = {
  title: string;
  active?: boolean;
  links: Array<{ label: string; href: string }>;
};

const TILES: Tile[] = [
  {
    title: "Email Administration",
    active: true,
    links: [
      { label: "View Pricing", href: "/pricing" },
      { label: "Terms of Service", href: "/legal/terms-of-service" },
      { label: "Refunds", href: "/legal/refunds" },
    ],
  },
  {
    title: "Admin Services",
    links: [{ label: "Visit Email Services", href: "/email-services" }],
  },
  {
    title: "DNS Routing",
    links: [{ label: "Visit Email Services", href: "/email-services" }],
  },
  {
    title: "Round Cube",
    links: [{ label: "Request File Access", href: "/contact" }],
  },
];

type AccordionSection = {
  title: string;
  items: Array<{
    heading: string;
    body: string;
    checklist?: string[];
  }>;
};

const SECTIONS: AccordionSection[] = [
  {
    title: "Consultation & Interview",
    items: [
      {
        heading: "What you need and where it will live",
        body:
          "We start with a quick call to figure out what you are making and where it will be used. Print, web, social, packaging, signage, or internal documents. This is where we lock the goal so the design has a clear job to do.",
      },
      {
        heading: "What to have ready",
        body: "A few things usually help the project move faster:",
        checklist: [
          "Any existing logo/brand files (if you have them)",
          "Examples of styles you like (links or screenshots)",
          "Final copy and sizes, or a rough draft if copy is still in progress",
        ],
      },
    ],
  },
  {
    title: "Scope, Direction & Planning",
    items: [
      {
        heading: "Deliverables and expectations",
        body:
          "Before design starts, we define what you are getting. That includes quantities, sizes, file types, and any variants you need (different layouts, social sizes, print versions, light/dark backgrounds).",
      },
      {
        heading: "Creative direction",
        body:
          "If you already have a brand direction, we follow it. If not, I will help set a direction using references and a simple set of rules so the work stays consistent instead of feeling random from piece to piece.",
      },
    ],
  },
  {
    title: "Design Production",
    items: [
      {
        heading: "First round design",
        body:
          "I build the initial concepts based on the scope and direction we agreed on. The first round focuses on structure, layout, and making sure the piece works before we obsess over small details.",
      },
      {
        heading: "Formatting and polish",
        body:
          "Once the direction is right, I tighten spacing, typography, alignment, and export settings so the final files look clean and hold up in real use.",
      },
    ],
  },
  {
    title: "Revisions & Approval",
    items: [
      {
        heading: "How revisions work",
        body:
          "You send feedback in plain language and I apply it with a clear intent. We focus on improving the piece, not bouncing between totally different directions once we have chosen a path.",
      },
      {
        heading: "Final review",
        body:
          "Before delivery, we do a final check for spelling, alignment, sizing, bleed/safe areas (if printing), and anything that could cause issues after it is sent out or posted.",
      },
    ],
  },
  {
    title: "Delivery & File Types",
    items: [
      {
        heading: "Exported files that are ready to use",
        body:
          "You get final files packaged and organized. That usually includes print-ready PDFs, web PNG/JPG exports, and vector files when needed (SVG/PDF) so logos and marks stay sharp at any size.",
      },
      {
        heading: "Editable files and organization",
        body:
          "If editable source files are included for the project, they are delivered in a clean folder with naming that makes sense. If a printer or vendor needs something specific, I can export to match their specs.",
      },
    ],
  },
  {
    title: "Ownership & Support",
    items: [
      {
        heading: "Ownership and usage",
        body:
          "You own the final approved deliverables for your business use. Nothing is locked behind me, and you can take the files wherever you want after delivery.",
      },
      {
        heading: "Ongoing design help",
        body:
          "If you need updates later, ongoing work can be handled as one-offs or as a steady support arrangement. Things like new social sizes, updated flyers, seasonal promos, or small brand additions are common.",
      },
    ],
  },
];


function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <path
        d="M7 12h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
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
      className={[
        "bg-black/30",
        "p-tile",
        "flex flex-col",
        // creates the “big tile” feeling on desktop so the link stack can sit at the bottom
        isBig ? "lg:min-h-[220px]" : "lg:min-h-[140px]",
        tile.active ? "bg-black/40" : "",
      ].join(" ")}
    >
      <div className="text-xl text-white/90 leading-tight">{tile.title}</div>

      <div className="mt-auto pt-6 flex flex-col gap-2">
        {tile.links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group inline-flex items-center gap-2 text-small text-text/70 hover:text-white"
          >
            <span>{l.label}</span>
            <ArrowRight className="h-4 w-4 translate-y-[0.5px] opacity-70 group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function EmailServicesPage() {
  return (
    <Container className="py-section">
      <div className="space-y-card">
        {/* crumbs */}
        <Breadcrumbs
          className="text-text/60"
          items={[
            { label: "Services", href: "/services" },
            { label: "Design Services" },
          ]}
        />

        {/* page header */}
        <div className="space-y-tile">
          <h1 className="text-h1 tracking-tightish text-white">Branding & Graphic Design</h1>
          <p className="text-body text-muted max-w-[70ch]">
  This page explains what is included in my graphic design services, how projects run, and
  how deliverables are packaged. If you need something specific, it can usually be scoped.
</p>

        </div>

        {/* main layout */}
        <div className="grid gap-card lg:grid-cols-[320px_1fr]">
          {/* left tiles */}
          <aside className="space-y-tile">
            {TILES.map((t) => (
              <ServiceTile key={t.title} tile={t} />
            ))}
          </aside>

          {/* right content */}
          <section className="space-y-section">
            <p className="text-body text-muted max-w-[70ch]">
              Simple hosted mail using Roundcube is included with some website plans for internal use only.
              For client facing deliverability, Google Workspace or Microsoft 365 is the better option.
            </p>

            <Accordion sections={SECTIONS} initialIndex={0} />
          </section>
        </div>
      </div>
    </Container>
  );
}
