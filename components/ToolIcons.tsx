// ToolIcons.tsx
// components/ToolIcons.tsx
import {
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAdobeindesign,
  SiAdobeaftereffects,
  SiAdobepremierepro,
  SiFigma,
  SiNextdotjs,
  SiTailwindcss,
  // socials
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

type Props = {
  tools?: unknown; // accepts string | string[]
  size?: number; // optional icon size (px)
  className?: string;
};

export default function ToolIcons({ tools, size = 22, className }: Props) {
  const list = normalize(tools);
  if (!list.length) return null;

  const icons = list
    .map((nameRaw, idx) => {
      const name = String(nameRaw).toLowerCase();

      // --- design/dev tools ---
      if (["illustrator", "ai", "adobe illustrator"].includes(name))
        return <SiAdobeillustrator key={`${name}-${idx}`} size={size} />;
      if (["photoshop", "ps", "adobe photoshop"].includes(name))
        return <SiAdobephotoshop key={`${name}-${idx}`} size={size} />;
      if (["indesign", "id", "adobe indesign"].includes(name))
        return <SiAdobeindesign key={`${name}-${idx}`} size={size} />;
      if (["after effects", "ae", "adobe after effects"].includes(name))
        return <SiAdobeaftereffects key={`${name}-${idx}`} size={size} />;
      if (["premiere", "pr", "adobe premiere"].includes(name))
        return <SiAdobepremierepro key={`${name}-${idx}`} size={size} />;
      if (["figma"].includes(name))
        return <SiFigma key={`${name}-${idx}`} size={size} />;
      if (["next", "nextjs", "next.js"].includes(name))
        return <SiNextdotjs key={`${name}-${idx}`} size={size} />;
      if (["tailwind", "tailwindcss"].includes(name))
        return <SiTailwindcss key={`${name}-${idx}`} size={size} />;

      // --- socials ---
      if (["facebook", "fb"].includes(name))
        return <SiFacebook key={`${name}-${idx}`} size={size} />;
      if (["linkedin", "linked-in"].includes(name))
        return <SiLinkedin key={`${name}-${idx}`} size={size} />;
      if (["behance", "béhance"].includes(name))
        return <SiBehance key={`${name}-${idx}`} size={size} />;
      if (["x", "twitter"].includes(name))
        return <SiX key={`${name}-${idx}`} size={size} />;
      if (["tiktok", "tik-tok"].includes(name))
        return <SiTiktok key={`${name}-${idx}`} size={size} />;

      return null;
    })
    .filter(Boolean);

  if (!icons.length) return null;

  // default to white icons unless overridden
  const wrapperClass = ["flex items-center gap-3", className || "text-white/80"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClass}>
      {icons.map((icon, i) => (
        <span key={i} className="leading-none">
          {icon}
        </span>
      ))}
    </div>
  );
}
