// components/layout/SiteFooter.tsx
import * as React from "react";
import Link from "next/link";

function GarrisFooterWordmark({ className }: { className?: string }) {
  return (
    <svg
      id="b"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 1851.54 547.76"
      role="img"
      aria-label="Garris Graphics"
    >
      <defs>
        <style>{".d{fill:currentColor;}"}</style>
      </defs>
      <g id="c">
        <path className="d" d="M290.99,145.73c0,11.23-1.26,22.16-3.68,32.65-.02.1-.03.21-.07.31-2.92,12.02-8.62,29.12-19.91,46.64-.45.73-.93,1.45-1.42,2.16-23.2,34.19-60.55,57.98-103.64,62.98-5.59.67-11.26,1-17.02,1-9.5,0-18.77-.92-27.77-2.65-4-.76-7.92-1.7-11.78-2.79-.38-.1-.76-.22-1.14-.33-.61-.17-1.21-.35-1.8-.54-.59-.19-1.18-.38-1.8-.57-3.29-1.07-6.85-2.34-10.62-3.84-.93-.38-1.89-.78-2.85-1.19-38.32-16.54-68.1-49.07-80.99-89.17-9.64-31.85-8.27-66.3,2.34-96.04,0-.02.02-.03.02-.07,9.05-24,24.26-44.98,43.69-61.02.87-.69,1.73-1.38,2.6-2.08.67-.54,1.35-1.04,2.01-1.54.93-.71,1.83-1.38,2.73-2.02.52-.36,1.02-.73,1.52-1.09.8-.57,1.59-1.12,2.37-1.64.97-.66,1.95-1.3,2.94-1.94,15.23-9.76,32.39-16.76,50.78-20.31,9-1.73,18.27-2.65,27.77-2.65,5.76,0,11.44.33,17.02,1,6.61.74,13.08,1.95,19.39,3.58,2.3.59,4.57,1.25,6.82,1.94,2.21.69,4.52,1.47,6.87,2.32,1.42.54,2.87,1.09,4.34,1.68,2.01.81,4.03,1.68,6.11,2.63.88.4,1.75.8,2.63,1.23,26.54,12.79,48.63,33.39,63.25,58.81h-46.66c-16.13-17.72-38.06-30.05-62.75-33.98-5.54-.88-11.23-1.35-17.02-1.35-9.6,0-18.91,1.26-27.77,3.63-37.84,10.07-67.56,40.24-76.97,78.34-.14.54-.26,1.06-.38,1.57-1.3,5.38-1.87,9.52-2.15,11.71-1.23,10.29-2.6,34.17,10.1,59.95,5.23,10.64,11.56,18.95,17.32,25.17.28.31.55.59.83.88,13.65,14.69,31.33,25.59,51.28,30.88,8.86,2.35,18.15,3.62,27.73,3.62,6.33,0,12.53-.55,18.55-1.61.17-.02.35-.05.52-.09.77-.14,1.52-.31,2.29-.46,10.08-2.14,23.52-6.45,37.32-15.51,9.78-6.4,27.28-20.16,38.5-44.15,6.71-14.38,8.82-27.44,9.55-35.9h-89.69v-38.03h125.83c.83,3.89,1.59,8.24,2.15,12.96,0,.07,0,.12.02.17.48,4.84.73,9.76.73,14.72Z"/>
        <path className="d" d="M1002.85,115.71c3.73-6.89,6.45-14.41,7.89-22.37v-27.42c-5.65-30.91-30.04-55.3-60.95-60.95h-215.29v276.24h38.57v-125.68h151.63l42.28,125.68h42.01l-42.26-125.68-1.92-5.65c16.28-6.64,29.71-18.81,38.03-34.17ZM936.08,115.71h-163.01V43.54h163.01c19.91,0,36.09,16.18,36.09,36.09s-16.18,36.09-36.09,36.09Z"/>
        <path className="d" d="M610.34,45.33c-.1-.1-.17-.17-.27-.27-24.76-24.76-58.98-40.09-96.78-40.09s-72.27,15.43-97.06,40.37c-24.59,24.74-39.82,58.86-39.82,96.51v139.36h39.82v-124.43h194.11v124.43h39.82v-139.36c0-37.65-15.23-71.77-39.82-96.51ZM419.46,116.96c11.02-41.49,48.9-72.17,93.82-72.17s82.8,30.69,93.82,72.17h-187.64Z"/>
        <path className="d" d="M1617.74,86.44c0,20.59,15.83,37.31,35.31,37.31h124.21c28.23,0,52.78,16.65,65.34,41.17,5.7,11.09,8.94,23.8,8.94,37.31,0,43.33-33.27,78.49-74.28,78.49h-198.49v-41.17h198.49c19.48,0,35.31-16.73,35.31-37.31s-15.83-37.31-35.31-37.31h-124.21c-28.23,0-52.78-16.65-65.34-41.17-5.7-11.09-8.94-23.8-8.94-37.31,0-43.33,33.27-78.49,74.28-78.49h198.49v41.17h-198.49c-19.48,0-35.31,16.73-35.31,37.31Z"/>
        <path className="d" d="M1363.43,115.71c3.73-6.89,6.45-14.41,7.89-22.37v-27.42c-5.65-30.91-30.04-55.3-60.95-60.95h-215.29v276.24h38.57v-125.68h151.63l42.28,125.68h42.01l-42.26-125.68-1.92-5.65c16.28-6.64,29.71-18.81,38.03-34.17ZM1296.66,115.71h-163.01V43.54h163.01c19.91,0,36.09,16.18,36.09,36.09s-16.18,36.09-36.09,36.09Z"/>
        <rect className="d" x="1455.65" y="6.8" width="38.77" height="274.41"/>
        <path className="d" d="M123.6,547.09c-20.33,0-38.13-4.25-53.4-12.76-15.27-8.5-27.14-20.45-35.6-35.85-8.46-15.4-12.69-33.39-12.69-53.98s4.26-38.85,12.77-54.25c8.51-15.4,20.33-27.35,35.44-35.85,15.11-8.5,32.62-12.76,52.52-12.76,13.41,0,25.49,1.86,36.24,5.57,10.75,3.72,20.09,8.73,28.02,15.04,7.93,6.31,14.31,13.34,19.16,21.08,4.84,7.74,8.11,15.6,9.82,23.57h-15.48c-1.7-6.62-4.68-13.11-8.94-19.47-4.26-6.36-9.66-12.09-16.2-17.19-6.55-5.1-14.23-9.15-23.07-12.15-8.83-3-18.68-4.5-29.53-4.5-16.82,0-31.69,3.69-44.62,11.08-12.93,7.39-23.04,17.88-30.33,31.49-7.29,13.61-10.93,29.72-10.93,48.34s3.64,34.31,10.93,47.87c7.29,13.56,17.45,24.08,30.49,31.56,13.04,7.48,28.18,11.21,45.42,11.21,16.07,0,30.01-3.02,41.82-9.06,11.81-6.04,20.96-14.64,27.46-25.78,6.49-11.15,9.74-24.28,9.74-39.41l5.27,1.34h-80.62v-11.55h90.19v11.28c0,17.19-3.94,32.16-11.81,44.92-7.88,12.76-18.84,22.65-32.89,29.68-14.05,7.03-30.44,10.54-49.17,10.54Z"/>
        <path className="d" d="M311.52,544.4v-200.08h73.75c15.01,0,27.91,2.46,38.71,7.39,10.8,4.92,19.1,11.82,24.9,20.68,5.8,8.86,8.7,19.07,8.7,30.62s-2.9,21.67-8.7,30.35c-5.8,8.68-14.1,15.47-24.9,20.34-10.8,4.88-23.71,7.32-38.71,7.32h-65.61v-11.68h65.13c12.03,0,22.35-1.9,30.97-5.71,8.62-3.8,15.25-9.17,19.87-16.11,4.63-6.94,6.94-15.11,6.94-24.51s-2.31-17.75-6.94-24.77c-4.63-7.03-11.25-12.51-19.87-16.45-8.62-3.94-19-5.91-31.13-5.91h-58.11v188.53h-15.01ZM450.88,544.4l-58.11-90.77h16.92l58.43,90.77h-17.24Z"/>
        <path className="d" d="M526.42,544.4l88.12-200.08h18.36l88.6,200.08h-15.8l-62.9-142.88c-3.09-7.25-6.36-15.08-9.82-23.5-3.46-8.41-7.21-17.86-11.25-28.33h3.83c-3.94,10.56-7.66,20.07-11.17,28.53-3.51,8.46-6.81,16.23-9.9,23.3l-62.1,142.88h-15.96ZM564.25,481.42v-11.55h119.41v11.55h-119.41Z"/>
        <path className="d" d="M800.86,544.4v-200.08h73.75c15.01,0,27.91,2.62,38.71,7.86,10.8,5.24,19.1,12.4,24.9,21.49,5.8,9.09,8.7,19.4,8.7,30.95s-2.9,21.84-8.7,30.89c-5.8,9.04-14.1,16.18-24.9,21.42-10.8,5.24-23.71,7.86-38.71,7.86h-63.22v-11.55h62.74c12.03,0,22.35-2.08,30.97-6.24,8.62-4.16,15.25-9.91,19.87-17.26,4.63-7.34,6.94-15.71,6.94-25.11s-2.31-17.88-6.94-25.18c-4.63-7.3-11.25-13.05-19.87-17.26-8.62-4.21-19-6.31-31.13-6.31h-58.11v188.53h-15.01Z"/>
        <path className="d" d="M1037.95,544.4v-200.08h15.01v91.98h142.39v-91.98h15.01v200.08h-15.01v-96.41h-142.39v96.41h-15.01Z"/>
        <path className="d" d="M1329.32,344.32v200.08h-15.01v-200.08h15.01Z"/>
        <path className="d" d="M1522.02,547.09c-19.79,0-37.3-4.25-52.52-12.76-15.22-8.5-27.11-20.43-35.68-35.79-8.57-15.35-12.85-33.37-12.85-54.05s4.28-38.83,12.85-54.18c8.57-15.35,20.46-27.3,35.68-35.85,15.22-8.55,32.73-12.82,52.52-12.82,13.3,0,25.3,1.84,36,5.5,10.7,3.67,19.95,8.64,27.78,14.91,7.82,6.27,14.15,13.27,19,21.01,4.84,7.74,8.11,15.73,9.82,23.97h-15.17c-1.6-6.89-4.5-13.52-8.7-19.87-4.21-6.36-9.61-12.06-16.2-17.12-6.6-5.06-14.31-9.06-23.15-12.02-8.83-2.95-18.62-4.43-29.37-4.43-15.64,0-29.99,3.51-43.02,10.54-13.04,7.03-23.49,17.3-31.37,30.82-7.88,13.52-11.81,30.03-11.81,49.55s3.94,36.14,11.81,49.62c7.87,13.47,18.33,23.68,31.37,30.62,13.04,6.94,27.38,10.41,43.02,10.41,10.75,0,20.54-1.5,29.37-4.5,8.83-3,16.52-7.03,23.07-12.09,6.55-5.06,11.95-10.76,16.2-17.12,4.26-6.36,7.18-12.94,8.78-19.74h15.17c-1.7,8.15-4.98,16.09-9.82,23.83-4.84,7.74-11.17,14.75-19,21.02-7.82,6.27-17.08,11.26-27.78,14.97-10.7,3.71-22.7,5.57-36,5.57Z"/>
        <path className="d" d="M1772.36,547.76c-15.43,0-28.84-2.19-40.23-6.58-11.39-4.39-20.35-10.5-26.9-18.33-6.55-7.83-10.24-16.9-11.09-27.19h15.32c.74,8.24,3.86,15.38,9.34,21.42,5.48,6.04,12.82,10.68,22.03,13.9,9.2,3.22,19.71,4.83,31.53,4.83,12.66,0,23.84-1.81,33.52-5.44,9.68-3.63,17.27-8.73,22.75-15.31,5.48-6.58,8.22-14.17,8.22-22.76,0-6.98-1.97-12.93-5.91-17.86-3.94-4.92-9.74-9.22-17.4-12.89-7.66-3.67-17.19-6.94-28.57-9.8l-27.46-6.98c-18.94-4.83-33.26-11.37-42.94-19.61-9.69-8.23-14.53-18.44-14.53-30.62,0-10.29,3.24-19.45,9.74-27.46,6.49-8.01,15.32-14.28,26.5-18.8,11.17-4.52,23.84-6.78,37.99-6.78s26.82,2.28,37.67,6.85c10.86,4.57,19.48,10.83,25.86,18.8,6.39,7.97,9.9,17.05,10.54,27.26h-14.85c-1.17-12.26-7.13-22.22-17.88-29.88-10.75-7.65-24.64-11.48-41.66-11.48-11.39,0-21.58,1.77-30.57,5.3-8.99,3.54-16.02,8.41-21.07,14.64-5.06,6.22-7.58,13.27-7.58,21.15,0,6.8,2.08,12.74,6.23,17.79,4.15,5.06,9.87,9.33,17.16,12.82,7.29,3.49,15.67,6.45,25.14,8.86l26.02,6.45c8.94,2.33,17.19,5.01,24.74,8.06,7.56,3.04,14.15,6.63,19.79,10.74,5.64,4.12,10,8.93,13.09,14.43,3.09,5.51,4.63,11.88,4.63,19.13,0,10.56-3.25,20.01-9.74,28.33-6.49,8.32-15.64,14.9-27.46,19.74-11.81,4.83-25.81,7.25-41.98,7.25Z"/>
      </g>
    </svg>
  );
}

function FooterArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M4 12L12 4M6 4h6v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const FOOTER_LINKS: Array<{
  title: string;
  links: Array<{ label: string; href: string }>;
}> = [
  {
    title: "Explore",
    links: [
      { label: "Work", href: "/work" },
      { label: "Resources", href: "/resources" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Website services", href: "/services/websites" },
      { label: "Design services", href: "/services/graphic-design" },
      { label: "Email services", href: "/services/email" },
    ],
  },
  {
    title: "Pricing",
    links: [
      { label: "Pricing overview", href: "/pricing" },
      { label: "Create an estimate", href: "/pricing/estimate" },
    ],
  },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <nav aria-label={title}>
      <h3 className="text-[11px] uppercase tracking-[0.16em] text-muted">
        {title}
      </h3>
      <ul className="mt-4 space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex min-h-10 items-center py-1 text-[15px] leading-6 text-text/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function SiteFooter({ constrain = true }: { constrain?: boolean }) {
  const innerClass = constrain
    ? "mx-auto w-full max-w-[1200px] px-4"
    : "w-full px-[var(--frame)]";

  return (
    <footer className="bg-bg">
      <div className={innerClass}>
        <div className="py-12 sm:py-14 lg:py-16">
          {/* Mobile */}
          <div className="lg:hidden">
            <div className="flex flex-col">
              <Link href="/" className="inline-flex w-fit">
                <GarrisFooterWordmark className="h-8 w-auto text-white" />
              </Link>

              <p className="mt-5 max-w-[32rem] text-[15px] leading-7 text-text/74">
                Design, websites, email, hosting, and support - built to keep the work clear and easy to manage.
              </p>

              <div className="mt-7 flex flex-col divide-y divide-white/10 border-y border-white/10">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-between py-3 text-[15px] leading-6 text-white transition-colors hover:text-text/80"
                >
                  <span>Start a project</span>
                  <FooterArrowIcon className="h-4 w-4 text-muted" />
                </Link>
                <Link
                  href="/pricing/estimate"
                  className="inline-flex min-h-12 items-center justify-between py-3 text-[15px] leading-6 text-text/80 transition-colors hover:text-white"
                >
                  <span>Create an estimate</span>
                  <FooterArrowIcon className="h-4 w-4 text-muted" />
                </Link>
              </div>
            </div>

            <div className="mt-10 space-y-10">
              {FOOTER_LINKS.map((col) => (
                <FooterColumn key={col.title} title={col.title} links={col.links} />
              ))}
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
            <div className="flex flex-col">
              <Link href="/" className="inline-flex w-fit">
                <GarrisFooterWordmark className="h-9 w-auto text-white" />
              </Link>

              <p className="mt-5 max-w-[34rem] text-[15px] leading-7 text-text/74">
                Design, websites, email, hosting, and support - built to keep the work clear and easy to manage.
              </p>

              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
                <Link
                  href="/contact"
                  className="inline-flex min-h-10 items-center gap-2 py-1 text-[15px] leading-6 text-white transition-colors hover:text-text/80"
                >
                  <span>Start a project</span>
                  <FooterArrowIcon className="h-4 w-4" />
                </Link>
                <Link
                  href="/pricing/estimate"
                  className="inline-flex min-h-10 items-center gap-2 py-1 text-[15px] leading-6 text-text/80 transition-colors hover:text-white"
                >
                  <span>Create an estimate</span>
                  <FooterArrowIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-x-8">
              {FOOTER_LINKS.map((col) => (
                <FooterColumn key={col.title} title={col.title} links={col.links} />
              ))}
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-5 sm:mt-14">
            <div className="flex flex-col gap-3 text-[13px] leading-6 text-muted sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} Garris Graphics</p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                <Link href="/legal/privacy" className="transition-colors hover:text-white">
                  Privacy
                </Link>
                <Link href="/legal/terms-of-service" className="transition-colors hover:text-white">
                  Terms
                </Link>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}