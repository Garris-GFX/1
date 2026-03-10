// components/ToolIcons.tsx
"use client";

import {
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAdobeindesign,
  SiAdobeaftereffects,
  SiAdobepremierepro,
  SiFigma,
  SiNextdotjs,
  SiTailwindcss,
  SiVercel,
  SiTypescript,
  SiGithub,
  SiSlack,
  SiNotion,
  SiLinear,
  SiGoogleanalytics,
  SiGooglesearchconsole,
  // socials
  SiInstagram,
  SiFacebook,
  SiLinkedin,
  SiBehance,
  SiX,
  SiTiktok,
} from "react-icons/si";

function normalize(input?: unknown): string[] {
  if (!input) return [];
  if (Array.isArray(input)) return input.map(String);
  return String(input)
    .split(/[,\|]/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

type Variant = "row" | "tiles";

type Props = {
  tools?: unknown; // accepts string | string[]
  size?: number; // icon size (px)
  className?: string;

  variant?: Variant; // "row" (default) or "tiles"
  tileSize?: number; // tile height (px)
  tileRadiusClass?: string;
  tileClassName?: string;
  useBrandColors?: boolean;

  // NEW
  showLabels?: boolean; // default true for tiles
  labelClassName?: string;
};

type IconDef = {
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  color?: string; // hex
  label: string;
};

const ICONS: Record<string, IconDef> = {
  // --- design/dev tools ---
  illustrator: { Icon: SiAdobeillustrator, color: "#FF9A00", label: "Illustrator" },
  ai: { Icon: SiAdobeillustrator, color: "#FF9A00", label: "Illustrator" },
  "adobe illustrator": { Icon: SiAdobeillustrator, color: "#FF9A00", label: "Illustrator" },

  photoshop: { Icon: SiAdobephotoshop, color: "#31A8FF", label: "Photoshop" },
  ps: { Icon: SiAdobephotoshop, color: "#31A8FF", label: "Photoshop" },
  "adobe photoshop": { Icon: SiAdobephotoshop, color: "#31A8FF", label: "Photoshop" },

  indesign: { Icon: SiAdobeindesign, color: "#FF3366", label: "InDesign" },
  id: { Icon: SiAdobeindesign, color: "#FF3366", label: "InDesign" },
  "adobe indesign": { Icon: SiAdobeindesign, color: "#FF3366", label: "InDesign" },

  "after effects": { Icon: SiAdobeaftereffects, color: "#9999FF", label: "After Effects" },
  ae: { Icon: SiAdobeaftereffects, color: "#9999FF", label: "After Effects" },
  "adobe after effects": { Icon: SiAdobeaftereffects, color: "#9999FF", label: "After Effects" },

  premiere: { Icon: SiAdobepremierepro, color: "#9999FF", label: "Premiere" },
  pr: { Icon: SiAdobepremierepro, color: "#9999FF", label: "Premiere" },
  "adobe premiere": { Icon: SiAdobepremierepro, color: "#9999FF", label: "Premiere" },
  "adobe premiere pro": { Icon: SiAdobepremierepro, color: "#9999FF", label: "Premiere Pro" },

  figma: { Icon: SiFigma, color: "#F24E1E", label: "Figma" },

  next: { Icon: SiNextdotjs, color: "#FFFFFF", label: "Next.js" },
  nextjs: { Icon: SiNextdotjs, color: "#FFFFFF", label: "Next.js" },
  "next.js": { Icon: SiNextdotjs, color: "#FFFFFF", label: "Next.js" },

  tailwind: { Icon: SiTailwindcss, color: "#06B6D4", label: "Tailwind" },
  tailwindcss: { Icon: SiTailwindcss, color: "#06B6D4", label: "Tailwind" },

  vercel: { Icon: SiVercel, color: "#FFFFFF", label: "Vercel" },

  typescript: { Icon: SiTypescript, color: "#3178C6", label: "TypeScript" },
  ts: { Icon: SiTypescript, color: "#3178C6", label: "TypeScript" },

  github: { Icon: SiGithub, color: "#FFFFFF", label: "GitHub" },

  slack: { Icon: SiSlack, color: "#4A154B", label: "Slack" },

  notion: { Icon: SiNotion, color: "#FFFFFF", label: "Notion" },

  linear: { Icon: SiLinear, color: "#5E6AD2", label: "Linear" },

  "google analytics": { Icon: SiGoogleanalytics, color: "#E37400", label: "GA4" },
  ga4: { Icon: SiGoogleanalytics, color: "#E37400", label: "GA4" },
  analytics: { Icon: SiGoogleanalytics, color: "#E37400", label: "Analytics" },

  "search console": { Icon: SiGooglesearchconsole, color: "#458CF5", label: "Search Console" },
  gsc: { Icon: SiGooglesearchconsole, color: "#458CF5", label: "Search Console" },
  "google search console": { Icon: SiGooglesearchconsole, color: "#458CF5", label: "Search Console" },

  // --- socials ---
  facebook: { Icon: SiFacebook, color: "#1877F2", label: "Facebook" },
  fb: { Icon: SiFacebook, color: "#1877F2", label: "Facebook" },

  linkedin: { Icon: SiLinkedin, color: "#0A66C2", label: "LinkedIn" },
  "linked-in": { Icon: SiLinkedin, color: "#0A66C2", label: "LinkedIn" },

  behance: { Icon: SiBehance, color: "#1769FF", label: "Behance" },
  "béhance": { Icon: SiBehance, color: "#1769FF", label: "Behance" },

  x: { Icon: SiX, color: "#FFFFFF", label: "X" },
  twitter: { Icon: SiX, color: "#FFFFFF", label: "X" },

  tiktok: { Icon: SiTiktok, color: "#FFFFFF", label: "TikTok" },
  "tik-tok": { Icon: SiTiktok, color: "#FFFFFF", label: "TikTok" },

  instagram: { Icon: SiInstagram, color: "#FFFFFF", label: "Instagram" },
  "Instagram": { Icon: SiInstagram, color: "#FFFFFF", label: "Instagram" },

};

export default function ToolIcons({
  tools,
  size = 22,
  className,
  variant = "row",
  tileSize = 38,
  tileRadiusClass = "rounded-pill",
  tileClassName,
  useBrandColors,
  showLabels,
  labelClassName,
}: Props) {
  const list = normalize(tools);
  if (!list.length) return null;

  const defs = list
    .map((raw) => String(raw).toLowerCase())
    .map((name) => ICONS[name] ?? null)
    .filter(Boolean) as IconDef[];

  if (!defs.length) return null;

  const shouldUseBrandColors =
    typeof useBrandColors === "boolean"
      ? useBrandColors
      : variant === "tiles";

  const shouldShowLabels =
    typeof showLabels === "boolean" ? showLabels : variant === "tiles";

  const wrapperClass = ["flex items-center gap-3", className || ""]
    .filter(Boolean)
    .join(" ");

  if (variant === "tiles") {
    return (
      <div className={wrapperClass}>
        {defs.map(({ Icon, color, label }, i) => (
          <span
            key={i}
            className={[
              "inline-flex items-center gap-2 px-3",
              "border border-white/15 bg-white/[0.04]",
              "text-small text-text/90",
              tileRadiusClass,
              tileClassName,
            ]
              .filter(Boolean)
              .join(" ")}
            style={{ height: tileSize }}
          >
            <Icon
              size={Math.min(size, 20)}
              color={shouldUseBrandColors ? color : undefined}
            />
            {shouldShowLabels && (
              <span
                className={[
                  "whitespace-nowrap text-[12px] leading-none",
                  labelClassName || "text-text/85",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {label}
              </span>
            )}
          </span>
        ))}
      </div>
    );
  }

  // variant === "row"
  return (
    <div className={["flex items-center gap-3", className || "text-white/80"].join(" ")}>
      {defs.map(({ Icon, color }, i) => (
        <span key={i} className="leading-none">
          <Icon size={size} color={shouldUseBrandColors ? color : undefined} />
        </span>
      ))}
    </div>
  );
}