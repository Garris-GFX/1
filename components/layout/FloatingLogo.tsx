// FloatingLogo.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ToolIcons from "@/components/ToolIcons";

export default function FloatingLogo({ ariaHidden = true }: { ariaHidden?: boolean }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const onClickOutside = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClickOutside);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  return (
    <div ref={wrapRef}>
      <style jsx>{`
        .floating-wrap {
          position: fixed;
          right: 16px;
          bottom: 16px;
          z-index: 100000;
        }
        .floating-logo {
          width: clamp(44px, 8vw, 64px);
          height: clamp(44px, 8vw, 64px);
          border-radius: 9999px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.6);
          box-shadow: 0 10px 30px rgba(2, 6, 23, 0.6);
          border: 1px solid rgba(200, 200, 200, 0.12);
          cursor: pointer;
          transition: border-color 180ms ease, transform 180ms ease,
            background 180ms ease;
          position: relative;
        }
        .floating-logo:hover {
          border-color: rgba(200, 200, 200, 0.32);
          transform: translateY(-4px);
          background: rgba(0, 0, 0, 0.66);
        }
        .floating-logo:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.14),
            0 10px 30px rgba(2, 6, 23, 0.6);
        }
        .floating-logo :global(img),
        .floating-logo svg {
          width: 42%;
          height: auto;
          display: block;
          transform: translate(-1px, -1px);
        }

        .status-dot {
          position: absolute;
          right: 8px;
          bottom: 8px;
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background: #10b981; /* emerald-500 */
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.15);
        }

        .popover {
          position: absolute;
          right: 0;
          bottom: calc(100% + 12px);
          width: 320px;
          max-width: calc(100vw - 24px);
        }

        @media (max-width: 420px) {
          .floating-wrap {
            right: 12px;
            bottom: 12px;
          }
        }
      `}</style>

      <div className="floating-wrap" aria-hidden={ariaHidden}>
        {open ? (
          <div className="popover" role="dialog" aria-label="Profile">
            <ProfileCard />
          </div>
        ) : null}

        <button
          type="button"
          className="floating-logo"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close profile" : "Open profile"}
          aria-expanded={open}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 894.51 894.51"
            width="64"
            height="64"
            role="img"
            aria-label="Garris Graphics"
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

          {/* online indicator */}
          <span className="status-dot" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function ProfileCard() {
  // TODO: swap these to your real contact info
  const phone = "(555) 555-5555";
  const email = "hello@garris.graphics";

  return (
    <div className="rounded-panel bg-surface shadow-panel p-card border border-white/10">
      <div className="flex flex-col items-center">
        <div className="relative h-28 w-28 overflow-hidden rounded-full ring-1 ring-white/10 bg-black/20">
          <Image
            src="/profilepicture.JPG"
            alt="Noah Hunt"
            fill
            sizes="112px"
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-4 text-center">
          <div className="text-lg font-semibold tracking-tight text-white">
            Noah Hunt
          </div>
          <div className="text-sm text-muted">Garris Graphics</div>
        </div>

        <div className="mt-3 inline-flex items-center gap-2 rounded-pill border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-text/80">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          Available for freelance + full-time
        </div>
      </div>

      <div className="mt-card space-y-4">
        {/* Location */}
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-pill bg-white/5 text-white/80">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </span>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-muted">Location</div>
            <div className="text-sm font-semibold text-text">Wilmington, NC</div>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-pill bg-white/5 text-white/80">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M7 3h3l2 5-2 1c1.2 2.5 3.3 4.6 5.8 5.8l1-2 5 2v3c0 1.1-.9 2-2 2-9.4 0-17-7.6-17-17 0-1.1.9-2 2-2Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-muted">Phone</div>
            <a
              href={`tel:${phone.replace(/[^\d+]/g, "")}`}
              className="text-sm font-semibold text-white underline underline-offset-4 hover:opacity-80"
            >
              {phone}
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-pill bg-white/5 text-white/80">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 6h16v12H4V6Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M4 7l8 6 8-6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-muted">Email</div>
            <a
              href={`mailto:${email}`}
              className="text-sm font-semibold text-white underline underline-offset-4 hover:opacity-80"
            >
              {email}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-card">
        <div className="text-xs font-semibold text-muted text-center">SOCIALS</div>
        <div className="mt-2 flex justify-center">
          <ToolIcons tools={["Facebook", "LinkedIn", "Behance", "X", "TikTok"]} />
        </div>
      </div>
    </div>
  );
}
