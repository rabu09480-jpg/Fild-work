"use client";

import { useEffect, useState, type FormEvent } from "react";
const hero = "/images/hero.jpg";
import { cn } from "@/lib/cn";
import { Eyebrow, Icon, PillButton, Reveal } from "./ui";

const needs = ["Product design", "UX audit", "Website", "Design system", "Not sure yet"];
const budgets = ["< $10k", "$10–25k", "$25–50k", "$50k+"];
const times = ["09:30", "11:00", "14:00", "16:30"];
const isTaken = (day: number, time: string) =>
  (day + times.indexOf(time)) % 4 === 3;

function nextDays(n: number) {
  const out: Date[] = [];
  const d = new Date();
  while (out.length < n) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) out.push(new Date(d));
  }
  return out;
}

export default function Contact() {
  // Dates are computed on the client only — a statically pre-rendered page must never
  // ship build-time dates, and server/client date formatting can differ by timezone.
  const [days, setDays] = useState<Date[]>([]);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<string | null>("11:00");
  const [picked, setPicked] = useState<string[]>(["Product design"]);
  const [budget, setBudget] = useState(budgets[1]);
  const [form, setForm] = useState({ name: "", email: "", company: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [tz, setTz] = useState("your timezone");

  // Read the visitor's timezone after mount to avoid server/client hydration mismatches.
  useEffect(() => {
    setTz(Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, " "));
    setDays(nextDays(5));
  }, []);

  const toggle = (n: string) =>
    setPicked((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));

  const pickDay = (i: number) => {
    setDay(i);
    setErrors((e) => ({ ...e, slot: "" }));
    // Never leave a slot selected that is unavailable on the newly selected day.
    if (slot && isTaken(i, slot)) {
      const fallback = times.find((t) => !isTaken(i, t)) ?? null;
      setSlot(fallback);
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!form.name.trim()) er.name = "Please tell us your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Enter a valid work email";
    if (!slot) er.slot = "Pick an available time";
    setErrors(er);
    if (Object.keys(er).length) {
      document.getElementById(Object.keys(er)[0])?.focus();
      return;
    }

    setStatus("loading");
    setError(null);
    const payload = {
      ...form,
      needs: picked,
      budget,
      date: activeDay ? activeDay.toISOString().slice(0, 10) : "",
      time: slot,
      timezone: tz,
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
    } catch {
      setStatus("idle");
      setError("Something went wrong sending your request. Please email hello@fieldwork.studio.");
    }
  };

  const inputCls = (err?: string) =>
    cn(
      "w-full rounded-xl border bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:bg-white/10 focus:ring-2 focus:ring-lime/60",
      err ? "border-red-400/70" : "border-white/10 focus:border-lime/60"
    );

  const activeDay = days[day];
  const dayLabel = activeDay
    ? activeDay.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
    : "your selected time";

  return (
    <section id="contact" aria-labelledby="contact-title" className="p-2 sm:p-3">
      <div className="grain relative isolate overflow-hidden rounded-[22px] bg-ink sm:rounded-[28px]">
        <img src={hero} alt="" className="kenburns absolute inset-0 -z-10 h-full w-full object-cover opacity-60" loading="lazy" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ink/90 via-ink/70 to-ink/40" />

        <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1fr_520px] lg:gap-16 lg:px-16">
          <div className="flex flex-col justify-between">
            <div>
              <Reveal>
                <Eyebrow dark>Book a discovery call</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h2 id="contact-title" className="mt-5 text-4xl font-normal leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">
                  Let's build something <span className="text-lime-2">people love.</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 max-w-md text-lg text-white/65">
                  30 minutes with a founder. No sales pitch — just an honest look at your product
                  and where design can move the needle.
                </p>
              </Reveal>
            </div>
            <Reveal delay={240}>
              <ul className="mt-10 space-y-4">
                {[
                  "Free UX teardown of your key flow",
                  "Written proposal within 48 hours",
                  "Kick-off in as little as 5 days",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-white/85">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-lime text-ink">
                      <Icon name="check" className="h-3.5 w-3.5" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex items-center gap-3 rounded-2xl glass p-3 pr-5 sm:w-fit">
                <img
                  src="/images/avatar-amara.jpg"
                  alt=""
                  className="h-11 w-11 rounded-xl object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="text-sm text-white">“Booked on Monday, prototype by Friday.”</p>
                  <p className="text-xs text-white/55">Amara O. · Northbeam</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div className="glass-dark relative rounded-3xl p-6 shadow-2xl sm:p-8">
              {status === "done" ? (
                <div className="flex min-h-[560px] flex-col items-center justify-center text-center" role="status">
                  <span className="relative grid h-20 w-20 place-items-center rounded-full bg-lime text-ink">
                    <span className="pulse-ring absolute inset-0 rounded-full text-lime" />
                    <Icon name="check" className="relative h-9 w-9" />
                  </span>
                  <h3 className="mt-8 text-3xl font-normal tracking-tight text-white">You're booked, {form.name.split(" ")[0]}!</h3>
                  <p className="mt-3 max-w-xs text-white/60">
                    {dayLabel} at {slot}. A calendar invite and a short prep doc are on their way to{" "}
                    <span className="text-white">{form.email}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setForm({ name: "", email: "", company: "" });
                    }}
                    className="mt-8 text-sm text-lime underline-offset-4 hover:underline"
                  >
                    Book another call
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="space-y-6">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-xs text-white/60">Full name</label>
                      <input id="name" autoComplete="name" className={inputCls(errors.name)} placeholder="Jane Founder" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
                      {errors.name && <p id="name-err" className="mt-1 text-xs text-red-300">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-xs text-white/60">Work email</label>
                      <input id="email" type="email" autoComplete="email" className={inputCls(errors.email)} placeholder="jane@startup.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} />
                      {errors.email && <p id="email-err" className="mt-1 text-xs text-red-300">{errors.email}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="company" className="mb-1.5 block text-xs text-white/60">Company / website <span className="text-white/35">(optional)</span></label>
                      <input id="company" autoComplete="organization" className={inputCls()} placeholder="startup.com" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                    </div>
                  </div>

                  <fieldset>
                    <legend className="mb-2 text-xs text-white/60">What do you need?</legend>
                    <div className="flex flex-wrap gap-2">
                      {needs.map((n) => {
                        const on = picked.includes(n);
                        return (
                          <button type="button" key={n} aria-pressed={on} onClick={() => toggle(n)}
                            className={cn("rounded-full border px-3.5 py-1.5 text-xs transition-all duration-300 active:scale-95", on ? "border-lime bg-lime text-ink" : "border-white/15 text-white/75 hover:border-white/40")}>
                            {n}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-2 text-xs text-white/60">Budget</legend>
                    <div className="grid grid-cols-4 gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1">
                      {budgets.map((b) => (
                        <button type="button" key={b} aria-pressed={budget === b} onClick={() => setBudget(b)}
                          className={cn("rounded-lg py-2 text-[11px] transition-all duration-300 sm:text-xs", budget === b ? "bg-white text-ink" : "text-white/65 hover:text-white")}>
                          {b}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-2 flex w-full items-center justify-between text-xs text-white/60">
                      <span className="flex items-center gap-1.5"><Icon name="calendar" className="h-3.5 w-3.5" /> Pick a time</span>
                      <span className="text-white/40">{tz}</span>
                    </legend>
                    <div className="grid grid-cols-5 gap-1.5">
                      {days.length === 0
                        ? Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} aria-hidden className="h-[54px] animate-pulse rounded-xl border border-white/5 bg-white/5" />
                          ))
                        : days.map((d, i) => (
                            <button type="button" key={i} aria-pressed={day === i} onClick={() => pickDay(i)}
                              className={cn("flex flex-col items-center rounded-xl border py-2 transition-all duration-300", day === i ? "border-lime bg-lime/10 text-white" : "border-white/10 text-white/60 hover:border-white/30")}>
                              <span className="text-[10px] uppercase tracking-wider">{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
                              <span className="text-lg font-medium">{d.getDate()}</span>
                            </button>
                          ))}
                    </div>
                    <div className="mt-2 grid grid-cols-4 gap-1.5">
                      {times.map((t) => {
                        const taken = isTaken(day, t);
                        return (
                          <button type="button" key={t} disabled={taken} aria-pressed={slot === t}
                            aria-label={`${t}${taken ? " (unavailable)" : ""}`}
                            onClick={() => {
                              setSlot(t);
                              setErrors((e) => ({ ...e, slot: "" }));
                            }}
                            className={cn("rounded-lg border py-2 text-xs transition-all duration-300",
                              taken ? "cursor-not-allowed border-white/5 text-white/20 line-through" : slot === t ? "border-white bg-white text-ink" : "border-white/10 text-white/70 hover:border-white/30")}>
                            {t}
                          </button>
                        );
                      })}
                    </div>
                    {errors.slot && <p className="mt-1 text-xs text-red-300">{errors.slot}</p>}
                  </fieldset>

                  {error && (
                    <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 px-3 py-2 text-xs text-red-200">
                      {error}
                    </p>
                  )}
                  <PillButton
                    type="submit"
                    variant="lime"
                    className={cn(
                      "w-full justify-between py-2 pl-6 text-[15px]",
                      status === "loading" && "pointer-events-none opacity-80"
                    )}
                  >
                    {status === "loading" ? (
                      <span className="flex items-center gap-2" role="status">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" /> Booking…
                      </span>
                    ) : (
                      "Book my free discovery call"
                    )}
                  </PillButton>
                  <p className="text-center text-[11px] text-white/40">
                    No spam, ever. We'll only use your details to arrange this call.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
