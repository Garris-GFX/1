"use client";

import * as React from "react";

type Props = {
  /** If omitted, reads NEXT_PUBLIC_SHOW_HOME_GUIDES */
  enabled?: boolean;
  /** Optional: extra wrapper className */
  className?: string;
};

export default function HomeGuides({ enabled, className }: Props) {
  const envEnabled = typeof window !== "undefined" && process.env.NEXT_PUBLIC_SHOW_HOME_GUIDES === "1";
  const show = enabled ?? envEnabled;

  if (!show) return null;

  return (
    <div className={"pointer-events-none absolute inset-0 " + (className ?? "")} aria-hidden="true">
      {/* top/bottom section separators */}
      <div className="absolute left-0 right-0 top-0 h-px bg-white/15" />
      <div className="absolute left-0 right-0 bottom-0 h-px bg-white/15" />

      {/* a couple of vertical rhythm guides - tweak as needed */}
      <div className="absolute left-0 right-0 top-10 h-px bg-white/10" />
      <div className="absolute left-0 right-0 top-20 h-px bg-white/10" />

      {/* inner safe-area / columns hint */}
      <div className="absolute inset-y-0 left-6 w-px bg-white/10 md:left-12" />
      <div className="absolute inset-y-0 right-6 w-px bg-white/10 md:right-12" />
    </div>
  );
}
