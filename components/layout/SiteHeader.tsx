"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/Button";
import ToolIcons from "@/components/ToolIcons";

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

const NAV_LINKS = [
  {
    label: "Work",
    href: "/work",
    description: "Case studies, brand systems, and selected projects",
  },
  {
    label: "Services",
    href: "/services",
    description: "Branding, websites, and ongoing support",
  },
  {
    label: "Pricing",
    href: "/pricing",
    description: "Packages, investment, and estimate details",
  },
  {
    label: "Resources",
    href: "/resources",
    description: "Guides, tools, blog posts, and helpful links",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Book a call, ask questions, or start a project",
  },
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
    id: "contact",
    label: "Contact",
    links: [
      { label: "Contact page", href: "/contact" },
      { label: "Book a free call", href: "/contact" },
      { label: "Start a project", href: "/contact" },
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
];

function GarrisMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 894.51 894.51"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <style>{".d{fill:#fff;}"}</style>
      </defs>
      <g>
        <path
          className="d"
          d="M656.79,391.34c-24.82-96.45-112.37-167.72-216.58-167.72s-191.76,71.27-216.58,167.72h119.78c19.37-33.39,55.5-55.91,96.81-55.91s77.44,22.52,96.81,55.91c9.53,16.46,15.01,35.56,15.01,55.91s-5.48,39.45-15.01,55.91c-19.37,33.39-55.5,55.91-96.81,55.91s-77.44-22.52-96.81-55.91h-119.78c24.82,96.45,112.37,167.72,216.58,167.72,104.21,0,191.76-71.27,216.58-167.72h0s237.72,0,237.72,0v-111.81h-237.72Z"
        />
        <path
          className="d"
          d="M782.7,614.98h-45.02c-25.99,44.86-62.1,83.17-105.19,111.81-41.08,27.33-88.51,45.82-139.54,52.8-1.5.22-3,.4-4.49.58-2.26.29-4.52.56-6.78.78-3.78.38-7.56.69-11.36.96-1.72.11-3.44.22-5.17.31-.42.02-.87.04-1.3.04-1.66.09-3.29.18-4.94.22-3.87.13-7.76.2-11.65.2-8.68,0-17.29-.33-25.81-.98-4.25-.31-8.45-.71-12.66-1.21-4.23-.47-8.43-1.03-12.61-1.68-49-7.54-94.53-25.67-134.15-52.04-43.07-28.65-79.19-66.95-105.19-111.81-20.48-35.33-34.71-74.74-41.15-116.64-.65-4.18-1.21-8.39-1.68-12.61-.49-4.2-.9-8.43-1.21-12.66-.65-8.52-.98-17.13-.98-25.81l.98-25.81c.31-4.23.72-8.45,1.21-12.66l1.68-12.61c6.44-41.91,20.66-81.31,41.15-116.64,26.01-44.86,62.12-83.17,105.19-111.81,39.63-26.37,85.16-44.5,134.15-52.04,4.18-.65,8.39-1.21,12.61-1.68,4.2-.49,8.41-.9,12.66-1.21,8.52-.65,17.13-.99,25.81-.99l11.65.2c1.65.04,3.29.13,4.94.22l1.3.04c1.72.09,3.44.2,5.17.31,3.8.27,7.58.58,11.36.96l6.78.78c1.5.18,3,.36,4.49.58,51.03,6.98,98.46,25.47,139.54,52.8,43.09,28.65,79.21,66.96,105.19,111.81h124.32c-22.7-56.06-56.42-106.47-98.49-148.53C682.58,50.05,570.77,0,447.26,0,306.01,0,180.07,65.48,98.08,167.72c-26.95,33.63-49.15,71.25-65.57,111.81C11.54,331.33,0,387.95,0,447.26s11.56,115.93,32.54,167.72c16.41,40.57,38.62,78.18,65.59,111.81,10.29,12.84,21.27,25.09,32.87,36.72,80.93,80.93,192.75,131,316.25,131s235.32-50.07,316.26-131c6.61-6.61,13-13.46,19.19-20.47v151.47h111.81v-279.54h-111.81Z"
        />
      </g>
    </svg>
  );
}

function TinyArrow() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="text-white/35 transition-colors duration-300 group-hover:text-white/70"
    >
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [megaOpen, setMegaOpen] = React.useState(false);
  const [activeMega, setActiveMega] = React.useState<string>("work");
  const megaRef = React.useRef<HTMLDivElement>(null);
  const closeTimerRef = React.useRef<number | null>(null);

  const [isAtTop, setIsAtTop] = React.useState(true);

  const clearCloseTimer = React.useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  function closeMega() {
    clearCloseTimer();
    setMegaOpen(false);
  }

  function openMega(id: string) {
    clearCloseTimer();
    setActiveMega(id);
    setMegaOpen(true);
  }

  const scheduleCloseMega = React.useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setMegaOpen(false);
    }, 180);
  }, [clearCloseTimer]);

  React.useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    setOpen(false);
    closeMega();
  }, [pathname]);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        closeMega();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  React.useEffect(() => {
    const onScroll = () => {
      if (pathname === "/") {
        const hero = document.querySelector("[data-home-hero]") as HTMLElement | null;

        if (hero) {
          const rect = hero.getBoundingClientRect();
          const headerHeight = 96;
          const switchPoint = headerHeight + 24;

          setIsAtTop(rect.bottom > switchPoint);
          return;
        }
      }

      const appScrollY = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--appScrollY") || "0"
      );

      setIsAtTop(appScrollY <= 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  function handleMegaBlur() {
    requestAnimationFrame(() => {
      const el = megaRef.current;
      if (!el) return;
      if (!el.contains(document.activeElement)) closeMega();
    });
  }

  const railTopStyle: React.CSSProperties = { top: "var(--railTop)" };

  const shellClass = isAtTop
    ? "bg-transparent backdrop-blur-xl border-b border-white/10"
    : "bg-page/55 backdrop-blur-xl border-b border-white/10";

  const navBtnBase =
    "px-1 py-2 text-small text-white/72 transition-colors duration-200 hover:text-white";
  const navBtnActive = "text-white";

  const desktopDrawerClass = "relative border-t border-white/10 bg-transparent";
  const mobileDrawerClass = "border-t border-white/10 bg-transparent";

  const visibleSections = MEGA_SECTIONS.filter((section) => section.id !== "policies");

  return (
    <header
      className={cn(
        "sticky z-50 rounded-t-panel transition-[background-color,border-color,backdrop-filter] duration-300",
        shellClass
      )}
      style={railTopStyle}
    >
      <div className="relative">
        <div className="relative flex h-24 items-center justify-between px-6 md:px-10">
          <Link
            href="/"
            className="inline-flex items-center text-white"
            aria-label="Garris Graphics home"
          >
            <GarrisMark className="h-9 w-9" />
          </Link>

          <div
            ref={megaRef}
            className="hidden items-center gap-6 md:flex"
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleCloseMega}
            onBlur={handleMegaBlur}
          >
            {NAV_LINKS.map((l) => {
              const id = l.label.toLowerCase();
              const isActive = megaOpen && activeMega === id;

              return (
                <div
                  key={l.href}
                  className="relative pb-4 -mb-4"
                  onMouseEnter={() => openMega(id)}
                >
                  <button
                    type="button"
                    onFocus={() => openMega(id)}
                    aria-haspopup="menu"
                    aria-expanded={isActive}
                    className={cn(navBtnBase, isActive && navBtnActive)}
                  >
                    {l.label}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="primary" size="sm">
              Book a free call
            </Button>
          </div>

          <button
            type="button"
            className="relative inline-flex h-10 items-center justify-center gap-3 bg-transparent md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/55 transition-colors duration-300">
              {open ? "Close" : "Menu"}
            </span>

            <span
              className="relative block"
              style={{ width: 28, height: 20 }}
              aria-hidden="true"
            >
              <span
                className="absolute left-0 top-1/2 block bg-white"
                style={{
                  width: 28,
                  height: 3,
                  transform: open
                    ? "translateY(-50%) rotate(45deg)"
                    : "translateY(calc(-50% - 5px)) rotate(0deg)",
                  transition: "transform 300ms ease",
                }}
              />
              <span
                className="absolute left-0 top-1/2 block bg-white"
                style={{
                  width: 28,
                  height: 3,
                  transform: open
                    ? "translateY(-50%) rotate(-45deg)"
                    : "translateY(calc(-50% + 5px)) rotate(0deg)",
                  transition: "transform 300ms ease",
                }}
              />
            </span>
          </button>
        </div>

        <div
          className={cn(
            "hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out md:block",
            megaOpen ? "max-h-[80rem] opacity-100" : "max-h-0 opacity-0"
          )}
          onMouseEnter={clearCloseTimer}
          onMouseLeave={scheduleCloseMega}
        >
          <div className={cn(desktopDrawerClass)}>
            <button
              type="button"
              aria-label="Close mega menu"
              onClick={closeMega}
              className="absolute right-6 top-6 inline-flex h-10 items-center justify-center gap-3 bg-transparent md:right-10"
            >
              <span className="text-[11px] uppercase tracking-[0.22em] text-white/55 transition-colors duration-300">
                Close
              </span>

              <span
                className="relative block"
                style={{ width: 28, height: 20 }}
                aria-hidden="true"
              >
                <span
                  className="absolute left-0 top-1/2 block bg-white"
                  style={{
                    width: 28,
                    height: 3,
                    transform: "translateY(-50%) rotate(45deg)",
                    transition: "transform 300ms ease",
                  }}
                />
                <span
                  className="absolute left-0 top-1/2 block bg-white"
                  style={{
                    width: 28,
                    height: 3,
                    transform: "translateY(-50%) rotate(-45deg)",
                    transition: "transform 300ms ease",
                  }}
                />
              </span>
            </button>

            <div className="mx-auto w-full max-w-[1200px] px-6 pb-8 pt-6 md:px-10">
              <div className="mt-2 grid gap-x-8 gap-y-8 md:grid-cols-3 xl:grid-cols-5">
                {visibleSections.map((section) => (
                  <div key={section.id}>
                    <p className="text-small tracking-crumbs uppercase text-white/45">
                      {section.label}
                    </p>

                    <ul className="mt-3 space-y-1">
                      {section.links.map((item) => (
                        <li key={item.href + item.label}>
                          <Link
                            href={item.href}
                            onClick={closeMega}
                            className="-ml-3 block rounded-pill px-3 py-2 text-small text-white/72 transition hover:bg-white/5 hover:text-white"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                  Socials
                </p>

                <div className="mt-3">
                  <ToolIcons
                    tools={["Facebook", "Instagram", "Behance", "LinkedIn", "TikTok"]}
                    variant="tiles"
                    useBrandColors={false}
                    showLabels={true}
                    size={16}
                    tileSize={36}
                    className="flex flex-wrap gap-2"
                    tileRadiusClass="rounded-pill"
                    tileClassName="bg-white/5 border-white/10"
                    labelClassName="text-white/85"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={cn(
            "overflow-hidden transition-[max-height,opacity] duration-300 ease-out md:hidden",
            open ? "max-h-[80rem] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className={cn(mobileDrawerClass)}>
            <div className="px-6 pb-8">
              <nav className="mt-6 flex flex-col">
                {NAV_LINKS.map((l, index) => {
                  const active =
                    pathname === l.href ||
                    (l.href !== "/" && pathname.startsWith(l.href));
                  const isLast = index === NAV_LINKS.length - 1;

                  return (
                    <React.Fragment key={l.href}>
                      <Link href={l.href} className="group block py-4 transition sm:py-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p
                              className={cn(
                                "text-[16px] font-semibold leading-none transition-colors",
                                active
                                  ? "text-white"
                                  : "text-white group-hover:text-white"
                              )}
                            >
                              {l.label}
                            </p>

                            <p className="mt-2 hidden text-[13px] leading-5 text-white/45 sm:block md:hidden">
                              {l.description}
                            </p>
                          </div>

                          <div className="mt-0.5 shrink-0">
                            <TinyArrow />
                          </div>
                        </div>
                      </Link>

                      {!isLast ? <div className="h-px w-full bg-white/10" /> : null}
                    </React.Fragment>
                  );
                })}
              </nav>

              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                  Socials
                </p>

                <div className="mt-3">
                  <ToolIcons
                    tools={["Facebook", "Instagram", "Behance", "LinkedIn", "TikTok"]}
                    variant="tiles"
                    useBrandColors={false}
                    showLabels={true}
                    size={16}
                    tileSize={36}
                    className="flex flex-wrap gap-2"
                    tileRadiusClass="rounded-pill"
                    tileClassName="bg-white/5 border-white/10"
                    labelClassName="text-white/85"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}