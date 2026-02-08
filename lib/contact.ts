export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
  website?: string; // honeypot
};

export function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export function validateContact(payload: ContactPayload) {
  const name = (payload.name || "").trim();
  const email = (payload.email || "").trim();
  const message = (payload.message || "").trim();
  const website = (payload.website || "").trim();

  if (website) return { ok: true as const, isBot: true as const };

  if (!name || !email || !message) {
    return { ok: false as const, error: "Please fill out name, email, and message." };
  }

  if (!isEmail(email)) {
    return { ok: false as const, error: "Please enter a valid email address." };
  }

  return { ok: true as const, isBot: false as const };
}
