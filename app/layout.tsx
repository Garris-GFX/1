import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/layout/LayoutShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://garris.graphics"),
  title: {
    default: "Garris Graphics",
    template: "%s - Garris Graphics",
  },
  description:
    "Branding and websites for small businesses that need a clean, fast, modern presence.",
};

// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="h-full"
      style={{ backgroundColor: 'rgb(var(--color-bg-rgb) / 1)', color: 'rgb(var(--color-text-rgb) / 1)' }}
    >
      <body
        className={`${inter.className} min-h-dvh antialiased`}
        style={{ backgroundColor: 'rgb(var(--color-bg-rgb) / 1)', color: 'rgb(var(--color-text-rgb) / 1)' }}
      >
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}

