import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type BookingPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  needs?: unknown;
  budget?: unknown;
  date?: unknown;
  time?: unknown;
  timezone?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Lightweight in-memory rate limit (per warm serverless instance).
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

const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  let body: BookingPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const name = str(body.name, 120);
  const email = str(body.email, 180).toLowerCase();
  const company = str(body.company, 180);
  const budget = str(body.budget, 40);
  const date = str(body.date, 20);
  const time = str(body.time, 10);
  const timezone = str(body.timezone, 80);
  const needs = Array.isArray(body.needs)
    ? body.needs.filter((n): n is string => typeof n === "string").slice(0, 6).map((n) => n.slice(0, 60))
    : [];

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please provide your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please provide a valid email address.";
  if (!date) errors.date = "Please choose a date.";
  if (!/^\d{2}:\d{2}$/.test(time)) errors.time = "Please choose a time.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const booking = {
    id: `fw_${Date.now().toString(36)}`,
    name,
    email,
    company,
    needs,
    budget: budget || "Not specified",
    date,
    time,
    timezone: timezone || "not supplied",
    receivedAt: new Date().toISOString(),
  };

  // Optional email notification via Resend's REST API (no extra dependency).
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO_EMAIL;
  const from = process.env.BOOKING_FROM_EMAIL ?? "Fieldwork <onboarding@resend.dev>";

  if (apiKey && to) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject: `New discovery call — ${name}${company ? ` (${company})` : ""}`,
          html: `
            <h2 style="font-family:Helvetica,Arial,sans-serif">New discovery call request</h2>
            <table style="font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6">
              <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
              <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
              <tr><td><strong>Company</strong></td><td>${escapeHtml(company || "—")}</td></tr>
              <tr><td><strong>Needs</strong></td><td>${escapeHtml(needs.join(", ") || "—")}</td></tr>
              <tr><td><strong>Budget</strong></td><td>${escapeHtml(booking.budget)}</td></tr>
              <tr><td><strong>Preferred time</strong></td><td>${escapeHtml(date)} at ${escapeHtml(time)} (${escapeHtml(timezone)})</td></tr>
            </table>`,
        }),
      });
      if (!res.ok) console.error("Resend booking email failed", res.status, await res.text());
    } catch (err) {
      console.error("Resend booking email error", err);
    }
  } else {
    console.info("[booking] received (email notifications not configured)", booking);
  }

  return NextResponse.json({ ok: true, bookingId: booking.id }, { status: 201 });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
