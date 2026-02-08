import nodemailer from "nodemailer";

/* ---------------------------
   Rate limiting (in-memory)
---------------------------- */
type RateRecord = { count: number; last: number };

const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;
const rateMap = new Map<string, RateRecord>();

function rateLimit(ip: string) {
  const now = Date.now();
  const record = rateMap.get(ip);

  if (!record) {
    rateMap.set(ip, { count: 1, last: now });
    return true;
  }

  if (now - record.last > RATE_LIMIT_WINDOW) {
    rateMap.set(ip, { count: 1, last: now });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count += 1;
  return true;
}

/* ---------------------------
   hCaptcha verification
---------------------------- */
async function verifyHCaptcha(token: string, ip?: string) {
  const secret = process.env.HCAPTCHA_SECRET_KEY;
  if (!secret) return false;

  const body = new URLSearchParams({
    secret,
    response: token,
    ...(ip ? { remoteip: ip } : {}),
  });

  const res = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = await res.json();
  return data?.success === true;
}

/* ---------------------------
   Helpers
---------------------------- */
function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

/* ---------------------------
   POST /api/contact
---------------------------- */
export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return Response.json(
        { ok: false, error: "Invalid request." },
        { status: 415 }
      );
    }

    const body = await req.json();

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const company = String(body.company ?? "").trim();
    const budget = String(body.budget ?? "").trim();
    const message = String(body.message ?? "").trim();

    /* Honeypot */
    const website = String(body.website ?? "").trim();
    if (website) {
      return Response.json({ ok: true }, { status: 200 });
    }

    /* Validation */
    if (!name || !email || !message) {
      return Response.json(
        { ok: false, error: "Please fill out name, email, and message." },
        { status: 400 }
      );
    }

    if (!isEmail(email)) {
      return Response.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    /* IP detection */
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    /* Rate limit */
    if (!rateLimit(ip)) {
      return Response.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    /* hCaptcha */
    const captchaToken = body.hcaptchaToken;
    if (!captchaToken) {
      return Response.json(
        { ok: false, error: "Captcha required." },
        { status: 400 }
      );
    }

    const captchaOk = await verifyHCaptcha(captchaToken, ip);
    if (!captchaOk) {
      return Response.json(
        { ok: false, error: "Captcha verification failed." },
        { status: 403 }
      );
    }

    /* SMTP config */
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || "587");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!to || !from || !host || !user || !pass) {
      return Response.json(
        { ok: false, error: "Server email configuration missing." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const subject = `New contact form submission - ${name}`;

    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      budget ? `Budget: ${budget}` : null,
      "",
      "Message:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    await transporter.sendMail({
      from: `Garris Graphics Contact <${from}>`,
      to,
      replyTo: email,
      subject,
      text,
    });

    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("CONTACT API ERROR:", err);
    return Response.json(
      { ok: false, error: "Something went wrong sending your message." },
      { status: 500 }
    );
  }
}

/* ---------------------------
   GET guard
---------------------------- */
export async function GET() {
  return Response.json(
    { ok: false, error: "Use POST /api/contact" },
    { status: 405 }
  );
}
