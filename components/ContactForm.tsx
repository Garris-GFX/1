"use client";

import { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const captchaRef = useRef<HCaptcha>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!captchaToken) {
      setStatus("error");
      setError("Please complete the captcha.");
      return;
    }

    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      ...Object.fromEntries(formData.entries()),
      hcaptchaToken: captchaToken,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (res.ok && data?.ok) {
      setStatus("sent");
      form.reset();
      captchaRef.current?.resetCaptcha();
      setCaptchaToken(null);
      return;
    }

    setStatus("error");
    setError(data?.error || "Could not send message. Try again.");
  }

  const baseField =
    "w-full rounded-tile border border-stroke bg-surface px-4 py-3 text-body text-text placeholder:text-muted outline-none transition focus:border-text/60 focus:ring-2 focus:ring-text/15";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-small text-muted">Name</span>
          <input
            className={baseField}
            name="name"
            placeholder="Your name"
            required
          />
        </label>

        <label className="space-y-2">
          <span className="text-small text-muted">Email</span>
          <input
            className={baseField}
            name="email"
            type="email"
            placeholder="you@company.com"
            required
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-small text-muted">Company (optional)</span>
          <input
            className={baseField}
            name="company"
            placeholder="Company name"
          />
        </label>

        <label className="space-y-2">
          <span className="text-small text-muted">Budget (optional)</span>
          <select className={baseField} name="budget" defaultValue="">
            <option value="" disabled>
              Select a range
            </option>
            <option value="under-1k">Under $1k</option>
            <option value="1-3k">$1k - $3k</option>
            <option value="3-7k">$3k - $7k</option>
            <option value="7-15k">$7k - $15k</option>
            <option value="15k+">$15k+</option>
          </select>
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-small text-muted">Message</span>
        <textarea
          className={baseField}
          name="message"
          rows={6}
          placeholder="What do you need? Any deadlines, links, or examples?"
          required
        />
      </label>

      {/* hCaptcha */}
      <div className="rounded-tile border border-stroke bg-black/20 p-3">
        <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
          onVerify={(token) => setCaptchaToken(token)}
          onExpire={() => setCaptchaToken(null)}
          ref={captchaRef}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className={[
          "w-full rounded-tile px-5 py-3 text-body font-medium transition",
          "border border-stroke bg-ui text-white hover:bg-text/30",
          "disabled:opacity-60 disabled:cursor-not-allowed",
        ].join(" ")}
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>

      {status === "sent" ? (
        <div className="rounded-tile border border-stroke bg-black/20 p-3 text-small text-text">
          Sent - I’ll get back to you soon.
        </div>
      ) : null}

      {status === "error" ? (
        <div className="rounded-tile border border-stroke bg-black/20 p-3 text-small text-text">
          {error}
        </div>
      ) : null}
    </form>
  );
}
