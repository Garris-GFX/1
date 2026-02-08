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
    title: "Getting Started",
    items: [
      {
        heading: "What to have ready",
        body:
          "An email provider account should already be created (Google Workspace, Microsoft 365, or another provider). Email is not sold directly here, but setup and support are handled end to end.",
      },
      {
        heading: "Access that helps things move smoothly",
        body: "A few things typically speed up the setup:",
        checklist: [
          "DNS access (domain registrar or DNS host)",
          "Admin access to the email provider (or an admin invite)",
          "A list of inboxes and aliases (examples: name@, info@, support@, billing@)",
        ],
      },
    ],
  },
  {
    title: "Getting Things Set Up",
    items: [
      {
        heading: "Inboxes & Aliases",
        body:
          "This step defines how email should be organized so it stays clean as the business grows. That includes which addresses are real inboxes, which ones are aliases, and where messages should go.",
      },
      {
        heading: "Form Planning",
        body:
          "If the website sends notifications, routing can also be planned here. Contact form messages, booking alerts, and lead notifications should go to the right inbox every time.",
      },
    ],
  },
  {
    title: "DNS & Deliverability",
    items: [
      {
        heading: "DNS Routing",
        body:
          "This step handles the DNS records that make email function and help it land in inboxes. Records are configured based on the provider, including MX, SPF, DKIM, and DMARC.",
      },
      {
        heading: "Testing",
        body:
          "Once records are in place, basic verification is done to confirm mail flow and authentication are working as expected.",
      },
    ],
  },
  {
    title: "Launch & Support",
    items: [
      {
        heading: "Device Set Up",
        body:
          "Optional help is available for connecting devices and mail apps, plus a quick walkthrough of how to handle simple admin tasks like adding an alias later.",
      },
      {
        heading: "Support Services",
        body:
          "Ongoing support is available for changes over time, like adding users, updating routing, troubleshooting deliverability issues, or adjusting DNS after a domain or website move.",
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
            { label: "Email Services" },
          ]}
        />

        {/* page header */}
        <div className="space-y-tile">
          <h1 className="text-h1 tracking-tightish text-white">Email Services</h1>
          <p className="text-body text-muted max-w-[70ch]">
            Business email setup and routing that is clean, secure, and deliverable.
            Support is available for Google Workspace and Microsoft 365. Domain DNS records
            can be accessed.
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
