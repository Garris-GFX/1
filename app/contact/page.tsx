import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge, Divider } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact - Garris Graphics",
  description: "Get in touch with Garris Graphics for branding and web design.",
};

export default function ContactPage() {
  return (
    <Container className="py-section">
      <div className="space-y-card">
        <Breadcrumbs className="text-text/60" items={[{ label: "Contact" }]} />

        {/* Header */}
        <div className="space-y-tile">
          <h1 className="text-h1 tracking-tightish text-white">Contact</h1>

          <p className="text-body text-muted max-w-[70ch]">
            Tell me what you’re building. I’ll respond with next steps, timeline,
            and a quick quote if you include enough detail.
          </p>

          <div className="flex flex-wrap gap-2">
            <Badge variant="muted">Branding</Badge>
            <Badge variant="muted">Web design</Badge>
            <Badge variant="muted">Webflow / Next</Badge>
            <Badge variant="muted">SEO basics</Badge>
          </div>
        </div>

        {/* Main layout */}
        <div className="grid gap-card lg:grid-cols-[1fr_360px]">
          {/* Left: form (primary) */}
          <section className="min-w-0">
            <div className="rounded-tile border border-stroke bg-surface p-card shadow-tile space-y-card">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-h3 text-white">Send a message</h2>
                <Badge variant="muted">Usually 1 business day</Badge>
              </div>

              <Divider />

              <ContactForm />

              <p className="text-small text-muted">
                Prefer email?{" "}
                <a
                  className="text-text hover:text-white transition"
                  href="mailto:noah@garris.graphics"
                >
                  noah@garris.graphics
                </a>
              </p>
            </div>
          </section>

          {/* Right: tertiary tiles */}
          <aside className="self-start lg:sticky lg:top-24 space-y-tile">
            {/* Tile: quick details */}
            <div className="rounded-tile border border-stroke bg-black/20 p-tile shadow-tile space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-small font-medium text-white">
                  Quick details
                </h3>
                <span className="text-small text-muted">EST</span>
              </div>

              <Divider />

              <dl className="grid gap-4">
                <div className="space-y-1">
                  <dt className="text-small text-muted">Response time</dt>
                  <dd className="text-body text-text">Within 1 business day</dd>
                </div>

                <div className="space-y-1">
                  <dt className="text-small text-muted">Location</dt>
                  <dd className="text-body text-text">Wilmington, NC</dd>
                </div>

                <div className="space-y-1">
                  <dt className="text-small text-muted">Email</dt>
                  <dd className="text-body">
                    <a
                      className="text-text hover:text-white transition"
                      href="mailto:noah@garris.graphics"
                    >
                      noah@garris.graphics
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Tile: what to include */}
            <div className="rounded-tile border border-stroke bg-black/20 p-tile shadow-tile space-y-3">
              <h3 className="text-small font-medium text-white">
                To get an accurate quote, include
              </h3>

              <Divider />

              <ul className="space-y-2 text-small text-text">
                <li>- What you do + who it’s for</li>
                <li>- What you need (brand, site, both)</li>
                <li>- Examples you like (links)</li>
                <li>- Ideal launch date</li>
                <li>- Anything you already have (logo, copy, photos)</li>
              </ul>
            </div>

            {/* Tile: tiny nudge (extra) */}
            <div className="rounded-tile border border-stroke bg-black/20 p-tile shadow-tile space-y-2">
              <div className="text-small text-muted">Not sure where to start?</div>
              <p className="text-small text-text">
                Send the link to your current site and what you wish it did
                better. I’ll suggest the cleanest next step.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </Container>
  );
}
