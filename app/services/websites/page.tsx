
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
    title: "Website Design & Development",
    active: true,
    links: [
      { label: "View Pricing", href: "/pricing" },
      { label: "Terms of Service", href: "/legal/terms-of-service" },
      { label: "Refunds", href: "/legal/refunds" },
    ],
  },
  {
    title: "Hosting & Maintenance",
    links: [{ label: "Visit Hosting Services", href: "/hosting-services" }],
  },
  {
    title: "Email Services",
    links: [{ label: "Visit Email Services", href: "/email-services" }],
  },
  {
    title: "Support",
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
        heading: "Goals, scope, and fit",
        body:
          "We start with a quick call and a simple intake so I can understand what you do, who you serve, and what the website needs to accomplish. We will talk about pages, features, timeline, and what you already have (domain, hosting, brand assets, copy, examples you like).",
      },
      {
        heading: "Plan and next steps",
        body:
          "After the call, you get a clear plan for the build. That includes the page list, what I need from you, what I will handle, and how feedback works. If anything feels unclear, we tighten it up before design starts so the project stays smooth.",
      },
    ],
  },
  {
    title: "Research, Copywriting & UI/UX",
    items: [
      {
        heading: "Structure and content planning",
        body:
          "I map out the site structure so it is easy to navigate and easy to understand. That includes page flow, sections, calls to action, and what content goes where so the site feels obvious to use.",
      },
      {
        heading: "Copy support and polish",
        body:
          "If you need copy help, I can write or refine your content so it sounds like you and reads clean. If you already have copy, I can tighten it up, organize it, and make sure it works in the layout.",
      },
    ],
  },
  {
    title: "Design & Layout",
    items: [
      {
        heading: "Look and feel",
        body:
          "You get a clean design that fits your brand and feels consistent across the site. We focus on typography, spacing, hierarchy, and a layout that keeps the important stuff easy to find.",
      },
      {
        heading: "Mobile-first UI/UX",
        body:
          "Everything is designed to work on phones first and scale up to desktop. That includes tap targets, readable type, sensible spacing, and sections that do not fall apart on smaller screens.",
      },
    ],
  },
  {
    title: "Build & Implementation",
    items: [
      {
        heading: "Development and setup",
        body:
          "Once the direction is approved, I build the pages and wire up the important functionality. That can include forms, basic SEO setup, performance checks, and the integrations your workflow depends on.",
      },
      {
        heading: "Content and assets",
        body:
          "Images, icons, and supporting assets get optimized and placed where they belong. If you need help sourcing imagery or cleaning up files, that can be handled here too so the site looks finished.",
      },
    ],
  },
  {
    title: "Review, Revisions & QA",
    items: [
      {
        heading: "Feedback rounds",
        body:
          "You review in a clear order so feedback is easy to give and easy to apply. We focus on the big stuff first (structure and content), then we tighten details like spacing, wording, and visual consistency.",
      },
      {
        heading: "Testing and checks",
        body:
          "Before launch I check mobile and desktop layouts, links, forms, basic accessibility, and any integrations we set up. The goal is to catch the annoying stuff before your visitors do.",
      },
    ],
  },
  {
    title: "Launch & Handoff",
    items: [
      {
        heading: "Go-live",
        body:
          "When everything is approved, I push the site live and make sure your domain and DNS are pointing correctly. I also verify forms are delivering, pages are loading fast, and everything looks right after launch.",
      },
      {
        heading: "Ownership and access",
        body:
          "You own your website and your content. You will have admin access to what matters (domain, hosting, site, and key accounts) and I keep it organized so you are never stuck or locked in.",
      },
    ],
  },
  {
    title: "Maintenance & Support",
    items: [
      {
        heading: "Updates and improvements",
        body:
          "If you want ongoing support, I can handle edits, small improvements, and general upkeep. Some clients like a monthly bucket of time so updates stay simple and nothing piles up.",
      },
      {
        heading: "Help when things come up",
        body:
          "Support can include troubleshooting, updating routing after a domain move, adding forms, adding pages, or cleaning up content over time. If you ever need to move away, I can help make that handoff clean too.",
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

export default function WebsiteServicesPage() {
  return (
    <Container className="py-section">
      <div className="space-y-card">
        {/* crumbs */}
        <Breadcrumbs
          className="text-text/60"
          items={[
            { label: "Services", href: "/services" },
            { label: "Website Services" },
          ]}
        />

        {/* page header */}
        <div className="space-y-tile">
          <h1 className="text-h1 tracking-tightish text-white">Website Design & Development</h1>
          <p className="text-body text-muted max-w-[70ch]">
            Website design and development focused on usability, clean layout, and solid setup. Includes planning, copy support, build, QA, and handoff.
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
