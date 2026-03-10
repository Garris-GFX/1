"use client";

import * as React from "react";

type AlertItem = {
  id: string;
  label: string;
  tone?: "amber" | "green" | "blue" | "red" | "neutral";
};

type Props = {
  innerClass: string;
  height: number;
  baseHeight?: number;
  expandedHeight?: number;
  onHeightChange: (next: number) => void;
  scrollEl?: HTMLElement | null;
  showOnScrollUp?: boolean;
  text?: string;
  alerts?: AlertItem[];
};

function FooterArrowIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className={[
        "h-3 w-3 shrink-0 transition-transform duration-200",
        open ? "rotate-45" : "rotate-0",
      ].join(" ")}
      fill="none"
    >
      <path
        d="M2.5 9.5L9.5 2.5M9.5 2.5H4.75M9.5 2.5V7.25"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function toneClasses(tone: AlertItem["tone"] = "neutral") {
  switch (tone) {
    case "amber":
      return "bg-amber-400 shadow-[0_0_0_3px_rgba(251,191,36,0.18)]";
    case "green":
      return "bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.18)]";
    case "blue":
      return "bg-sky-400 shadow-[0_0_0_3px_rgba(56,189,248,0.18)]";
    case "red":
      return "bg-rose-400 shadow-[0_0_0_3px_rgba(251,113,133,0.18)]";
    default:
      return "bg-white/70 shadow-[0_0_0_3px_rgba(255,255,255,0.12)]";
  }
}

export default function AnnouncementBar({
  innerClass,
  height,
  baseHeight = 40,
  expandedHeight = 148,
  onHeightChange,
  scrollEl = null,
  showOnScrollUp = true,
  text = "Site under construction.",
  alerts = [
    { id: "construction", label: "Site under construction", tone: "amber" },
    { id: "content", label: "More pages and case studies coming soon", tone: "blue" },
    { id: "booking", label: "Booking new projects", tone: "green" },
  ],
}: Props) {
  const [open, setOpen] = React.useState(false);
  const lastY = React.useRef<number>(0);
  const lastApplied = React.useRef<number>(-1);

  const apply = React.useCallback(
    (next: number) => {
      if (lastApplied.current !== next) {
        lastApplied.current = next;
        onHeightChange(next);
      }
    },
    [onHeightChange]
  );

  React.useEffect(() => {
    apply(open ? expandedHeight : baseHeight);
  }, [apply, baseHeight, expandedHeight, open]);

  React.useEffect(() => {
    const getY = () => {
      if (scrollEl) return scrollEl.scrollTop || 0;
      return window.scrollY || document.documentElement.scrollTop || 0;
    };

    const DOWN_HIDE_DELTA = 6;
    const UP_SHOW_DELTA = 12;

    const update = () => {
      const y = getY();
      const prev = lastY.current;
      lastY.current = y;

      if (y <= 0) {
        apply(open ? expandedHeight : baseHeight);
        return;
      }

      const dy = y - prev;

      if (dy > DOWN_HIDE_DELTA) {
        apply(0);
        return;
      }

      if (showOnScrollUp && dy < -UP_SHOW_DELTA) {
        apply(open ? expandedHeight : baseHeight);
      }
    };

    lastY.current = getY();
    update();

    const opts: AddEventListenerOptions = { passive: true };

    if (scrollEl) {
      scrollEl.addEventListener("scroll", update, opts);
    } else {
      window.addEventListener("scroll", update, opts);
    }

    window.addEventListener("resize", update);

    return () => {
      if (scrollEl) {
        scrollEl.removeEventListener("scroll", update, opts);
      } else {
        window.removeEventListener("scroll", update, opts);
      }
      window.removeEventListener("resize", update);
    };
  }, [apply, baseHeight, expandedHeight, open, scrollEl, showOnScrollUp]);

  const isHidden = height <= 0;
  const primaryAlert = alerts[0] ?? {
    id: "construction",
    label: text,
    tone: "amber" as const,
  };
  const drawerAlerts = alerts.slice(1);

  return (
    <div
      style={{
        height: `${height}px`,
        transitionProperty: "height",
        transitionDuration: "220ms",
        transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    >
      <div
        className={[
          innerClass,
          "flex h-full flex-col justify-start overflow-hidden text-crumbs uppercase tracking-crumbs",
          "transition-[opacity,transform] duration-[220ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]",
          isHidden ? "pointer-events-none opacity-0 -translate-y-1" : "opacity-100 translate-y-0",
        ].join(" ")}
      >
        <div className="flex h-10 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4 text-text/80">
            <span
              aria-hidden="true"
              className={[
                "h-2.5 w-2.5 shrink-0 rounded-full",
                toneClasses(primaryAlert.tone),
              ].join(" ")}
            />
            <span className="truncate">{text}</span>
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Collapse alerts" : "Expand alerts"}
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-text/70 transition-colors hover:text-text"
          >
            <FooterArrowIcon open={open} />
          </button>
        </div>

        <div
          className={[
            "overflow-hidden border-t transition-[max-height,opacity,padding,border-color] duration-[220ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]",
            open ? "max-h-40 border-white/10 pt-3 opacity-100" : "max-h-0 border-transparent pt-0 opacity-0",
          ].join(" ")}
        >
          <div className="flex flex-col gap-3 pb-3">
            {drawerAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center gap-3 text-[11px] uppercase tracking-crumbs text-text/65"
              >
                <span
                  aria-hidden="true"
                  className={[
                    "h-2.5 w-2.5 shrink-0 rounded-full",
                    toneClasses(alert.tone),
                  ].join(" ")}
                />
                <span>{alert.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
