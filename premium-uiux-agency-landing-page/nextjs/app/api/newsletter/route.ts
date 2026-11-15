import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const WINDOW_MS = 60_000;
const LIMIT = 5;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(key: string) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.reset < now) {
    hits.set(key, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests." }, { status: 429 });
  }

  let email = "";
  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? body.email.trim().toLowerCase().slice(0, 180) : "";
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audience = process.env.NEWSLETTER_TO_EMAIL ?? process.env.BOOKING_TO_EMAIL;

  if (apiKey && audience) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.BOOKING_FROM_EMAIL ?? "Fieldwork <onboarding@resend.dev>",
          to: [audience],
          subject: "Fieldnotes newsletter signup",
          text: `New newsletter subscriber: ${email}`,
        }),
      });
      if (!res.ok) console.error("Resend newsletter email failed", res.status, await res.text());
    } catch (err) {
      console.error("Resend newsletter error", err);
    }
  } else {
    console.info("[newsletter] received (email notifications not configured)", { email });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
