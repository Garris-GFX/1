// components/layout/SiteHeader.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/Button";

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
];

type MegaLink = { label: string; href: string; note?: string };
type MegaSection = { id: string; label: string; links: MegaLink[] };

const MEGA_SECTIONS: MegaSection[] = [
  {
    id: "work",
    label: "Work",
    links: [
      { label: "Case studies", href: "/work" },
      { label: "Brand systems", href: "/work?tag=branding" },
      { label: "Web design", href: "/work?tag=web" },
      { label: "Logos", href: "/work?tag=logo" },
    ],
  },
  {
    id: "services",
    label: "Services",
    links: [
      { label: "Overview", href: "/services" },
      { label: "Branding", href: "/services/branding" },
      { label: "Websites", href: "/services/websites" },
      { label: "Ongoing support", href: "/services/support" },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    links: [
      { label: "Pricing page", href: "/pricing" },
      { label: "Create an estimate", href: "/pricing#estimator" },
      { label: "Book a free call", href: "/contact" },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    links: [
      { label: "Resources hub", href: "/resources" },
      { label: "Blog", href: "/blog" },
      { label: "Tools", href: "/tools" },
    ],
  },
  {
    id: "policies",
    label: "Policies",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
      { label: "Cookie policy", href: "/cookies" },
      { label: "Acceptable use", href: "/acceptable-use" },
    ],
  },
  {
    id: "social",
    label: "Social",
    links: [
      { label: "Behance", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "TikTok", href: "#" },
    ],
  },
];

function GarrisMark({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 894.51 894.51" aria-hidden="true" focusable="false" className={className}>
                <defs><style>{".d{fill:#fff;}"}</style></defs>
                <g>
                  <path className="d" d="M656.79,391.34c-24.82-96.45-112.37-167.72-216.58-167.72s-191.76,71.27-216.58,167.72h119.78c19.37-33.39,55.5-55.91,96.81-55.91s77.44,22.52,96.81,55.91c9.53,16.46,15.01,35.56,15.01,55.91s-5.48,39.45-15.01,55.91c-19.37,33.39-55.5,55.91-96.81,55.91s-77.44-22.52-96.81-55.91h-119.78c24.82,96.45,112.37,167.72,216.58,167.72,104.21,0,191.76-71.27,216.58-167.72h0s237.72,0,237.72,0v-111.81h-237.72Z"/>
                  <path className="d" d="M782.7,614.98h-45.02c-25.99,44.86-62.1,83.17-105.19,111.81-41.08,27.33-88.51,45.82-139.54,52.8-1.5.22-3,.4-4.49.58-2.26.29-4.52.56-6.78.78-3.78.38-7.56.69-11.36.96-1.72.11-3.44.22-5.17.31-.42.02-.87.04-1.3.04-1.66.09-3.29.18-4.94.22-3.87.13-7.76.2-11.65.2-8.68,0-17.29-.33-25.81-.98-4.25-.31-8.45-.71-12.66-1.21-4.23-.47-8.43-1.03-12.61-1.68-49-7.54-94.53-25.67-134.15-52.04-43.07-28.65-79.19-66.95-105.19-111.81-20.48-35.33-34.71-74.74-41.15-116.64-.65-4.18-1.21-8.39-1.68-12.61-.49-4.2-.9-8.43-1.21-12.66-.65-8.52-.98-17.13-.98-25.81l.98-25.81c.31-4.23.72-8.45,1.21-12.66l1.68-12.61c6.44-41.91,20.66-81.31,41.15-116.64,26.01-44.86,62.12-83.17,105.19-111.81,39.63-26.37,85.16-44.5,134.15-52.04,4.18-.65,8.39-1.21,12.61-1.68,4.2-.49,8.41-.9,12.66-1.21,8.52-.65,17.13-.99,25.81-.99l11.65.2c1.65.04,3.29.13,4.94.22l1.3.04c1.72.09,3.44.2,5.17.31,3.8.27,7.58.58,11.36.96l6.78.78c1.5.18,3,.36,4.49.58,51.03,6.98,98.46,25.47,139.54,52.8,43.09,28.65,79.21,66.96,105.19,111.81h124.32c-22.7-56.06-56.42-106.47-98.49-148.53C682.58,50.05,570.77,0,447.26,0,306.01,0,180.07,65.48,98.08,167.72c-26.95,33.63-49.15,71.25-65.57,111.81C11.54,331.33,0,387.95,0,447.26s11.56,115.93,32.54,167.72c16.41,40.57,38.62,78.18,65.59,111.81,10.29,12.84,21.27,25.09,32.87,36.72,80.93,80.93,192.75,131,316.25,131s235.32-50.07,316.26-131c6.61-6.61,13-13.46,19.19-20.47v151.47h111.81v-279.54h-111.81Z"/>
                </g>
              </svg>
  );
}


export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  // Mega menu state (desktop)
  const [megaOpen, setMegaOpen] = React.useState(false);
  const [activeMega, setActiveMega] = React.useState<string>("work");
  const megaRef = React.useRef<HTMLDivElement>(null);

  function openMega(id: string) {
    setActiveMega(id);
    setMegaOpen(true);
  }

  function closeMega() {
    setMegaOpen(false);
  }

  React.useEffect(() => {
    setOpen(false);
    closeMega();
  }, [pathname]);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMega();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function handleMegaBlur() {
    // Close if focus leaves the mega area
    requestAnimationFrame(() => {
      const el = megaRef.current;
      if (!el) return;
      if (!el.contains(document.activeElement)) closeMega();
    });
  }

  const railTopStyle: React.CSSProperties = { top: "var(--railTop)" };

  return (
    // Sticky UNDER the announcement bar
    <header className="sticky z-50 rounded-t-panel  bg-page/85 backdrop-blur" style={railTopStyle}>
      {/* IMPORTANT: no nested .container here (the slab is already centered) */}
      <div className="relative flex h-24 items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="inline-flex items-center text-white"
          aria-label="Garris Graphics home"
        >
          <GarrisMark className="h-9 w-9" />
        </Link>

        {/* Desktop mega menu */}
        <div
          ref={megaRef}
          className="hidden items-center gap-3 md:flex"
          onMouseLeave={closeMega}
          onBlur={handleMegaBlur}
        >
          {NAV_LINKS.map((l) => {
            const id = l.label.toLowerCase();
            const isActive = megaOpen && activeMega === id;

            return (
              <button
                key={l.href}
                type="button"
                onMouseEnter={() => openMega(id)}
                onFocus={() => openMega(id)}
                aria-haspopup="menu"
                aria-expanded={isActive}
                className={cn(
                  "rounded-pill px-4 py-2 text-small transition",
                  isActive
                    ? "bg-white text-black"
                    : "bg-white/5 text-text hover:bg-white/10 hover:text-white"
                )}
              >
                {l.label}
              </button>
            );
          })}

          {megaOpen ? (
            <div className="absolute left-0 top-full w-full pt-3">
              <div className="px-6 md:px-10">
                <div className="rounded-card border border-white/10 bg-page/95 p-card shadow-card backdrop-blur">
                  <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-6">
                    {MEGA_SECTIONS.map((section) => {
                      const hot = section.id === activeMega;
                      return (
                        <div
                          key={section.id}
                          className={cn(hot && "opacity-100", !hot && "opacity-80")}
                        >
                          <p className="text-small tracking-crumbs uppercase text-white/80">
                            {section.label}
                          </p>

                          <ul className="mt-4 space-y-2">
                            {section.links.map((item) => (
                              <li key={item.href + item.label}>
                                <Link
                                  href={item.href}
                                  onClick={closeMega}
                                  className="block rounded-pill px-3 py-2 text-small text-text hover:bg-white/5 hover:text-white"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="primary" size="sm">
            Book a free call
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-pill bg-white/5 text-text hover:bg-white/10 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-small">{open ? "X" : "≡"}</span>
        </button>

        {open ? (
          <div className="absolute left-0 top-full w-full border-b border-white/10 bg-page/95 backdrop-blur md:hidden">
            <div className="px-6 py-card md:px-10">
              <div className="flex flex-col gap-3">
                {NAV_LINKS.map((l) => {
                  const active =
                    pathname === l.href ||
                    (l.href !== "/" && pathname.startsWith(l.href));
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={cn(
                        "rounded-pill px-4 py-3 text-body transition",
                        active
                          ? "bg-white text-black"
                          : "bg-white/5 text-text hover:bg-white/10 hover:text-white"
                      )}
                    >
                      {l.label}
                    </Link>
                  );
                })}

                <div className="pt-3">
                  <Button className="w-full" variant="primary" size="md">
                    Book a free call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
