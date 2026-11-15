"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow, Icon, Reveal } from "./ui";

const avatarAmara = "/images/avatar-amara.jpg";
const avatarDaniel = "/images/avatar-daniel.jpg";
const avatarMarcus = "/images/avatar-marcus.jpg";

const featured = [
  {
    quote:
      "Fieldwork felt like an extension of our team from week one. They redesigned our entire onboarding in five weeks and trial-to-paid conversion more than tripled. Best money we spent pre-Series B.",
    name: "Amara Okafor",
    role: "Founder & CEO, Northbeam",
    img: avatarAmara,
    metric: "3.2×",
    metricLabel: "Trial → paid",
  },
  {
    quote:
      "We'd burned through two agencies before. Fieldwork actually understood B2B SaaS — they asked about our pipeline before they asked about colors. Demo bookings doubled after the new site launched.",
    name: "Daniel Reyes",
    role: "VP Growth, Lumen AI",
    img: avatarDaniel,
    metric: "+118%",
    metricLabel: "Demo bookings",
  },
  {
    quote:
      "Their design system cut our front-end build time in half. Our engineers genuinely look forward to design handoffs now, which I never thought I'd say.",
    name: "Marcus Hale",
    role: "Co-founder & CEO, Layer",
    img: avatarMarcus,
    metric: "2×",
    metricLabel: "Faster shipping",
  },
];

const small = [
  { q: "Fast, thoughtful and ruthlessly focused on outcomes. They made our product feel premium.", n: "Priya Shah", r: "CPO, Quanta" },
  { q: "The weekly sprint rhythm kept our whole team aligned. No black-box, no surprises.", n: "Tom Becker", r: "CTO, Stackr" },
  { q: "Investors commented on our product polish in every pitch meeting. That's Fieldwork.", n: "Elena Rossi", r: "Founder, Halcyon" },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % featured.length), 6500);
    return () => clearInterval(t);
  }, [paused, i]);
  const go = (d: number) => setI((v) => (v + d + featured.length) % featured.length);
  const f = featured[i];

  return (
    <section id="testimonials" aria-labelledby="t-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <Eyebrow>Client love</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="t-title" className="mt-5 max-w-xl text-4xl font-normal tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                Founders don't just hire us. They rehire us.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160} className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {featured.map((p) => (
                <img key={p.name} src={p.img} alt="" className="h-10 w-10 rounded-full border-2 border-paper object-cover" loading="lazy" />
              ))}
            </div>
            <div>
              <div className="flex text-ink" aria-hidden>
                {Array.from({ length: 5 }).map((_, k) => (
                  <Icon key={k} name="star" className="h-3.5 w-3.5" />
                ))}
              </div>
              <p className="text-sm text-ink/60">4.9/5 from 80+ reviews</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <div
              className="relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden rounded-3xl bg-white p-7 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.3)] sm:p-10"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              aria-roledescription="carousel"
              aria-label="Featured testimonials"
            >
              <span className="pointer-events-none absolute -right-4 -top-10 select-none text-[220px] leading-none text-paper" aria-hidden>
                ”
              </span>
              <div key={i} className="relative" aria-live="polite">
                <div className="fade-up flex gap-0.5 text-ink" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Icon key={k} name="star" className="h-4 w-4" />
                  ))}
                </div>
                <blockquote className="fade-up mt-6 text-xl leading-snug tracking-tight sm:text-[28px]" style={{ ["--d" as string]: "80ms" }}>
                  “{f.quote}”
                </blockquote>
              </div>
              <div className="relative mt-10 flex flex-wrap items-end justify-between gap-6">
                <div key={`a${i}`} className="fade-up flex items-center gap-4" style={{ ["--d" as string]: "160ms" }}>
                  <img src={f.img} alt={f.name} className="h-14 w-14 rounded-full object-cover" loading="lazy" />
                  <div>
                    <p className="font-medium">{f.name}</p>
                    <p className="text-sm text-ink/55">{f.role}</p>
                  </div>
                  <div className="ml-2 hidden border-l border-ink/10 pl-5 sm:block">
                    <p className="text-2xl font-medium tracking-tight">{f.metric}</p>
                    <p className="text-xs text-ink/55">{f.metricLabel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5" role="tablist" aria-label="Choose testimonial">
                    {featured.map((_, k) => (
                      <button
                        key={k}
                        role="tab"
                        aria-selected={k === i}
                        aria-label={`Testimonial ${k + 1}`}
                        onClick={() => setI(k)}
                        className={cn("h-1.5 rounded-full transition-all duration-500", k === i ? "w-8 bg-ink" : "w-1.5 bg-ink/20 hover:bg-ink/40")}
                      />
                    ))}
                  </div>
                  <button onClick={() => go(-1)} aria-label="Previous testimonial" className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 transition hover:bg-ink hover:text-white active:scale-90">
                    <Icon name="arrow-left" className="h-4 w-4" />
                  </button>
                  <button onClick={() => go(1)} aria-label="Next testimonial" className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition hover:bg-lime hover:text-ink active:scale-90">
                    <Icon name="arrow-right" className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {small.map((s, k) => (
              <Reveal key={s.n} delay={k * 100}>
                <figure
                  className={cn(
                    "group h-full rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1",
                    k === 1 ? "bg-lime" : k === 2 ? "bg-ink text-white" : "border border-ink/10 bg-paper-2"
                  )}
                >
                  <blockquote className={cn("text-[15px] leading-relaxed", k === 2 ? "text-white/80" : "text-ink/75")}>“{s.q}”</blockquote>
                  <figcaption className="mt-5 flex items-center justify-between">
                    <span>
                      <span className="block text-sm font-medium">{s.n}</span>
                      <span className={cn("block text-xs", k === 2 ? "text-white/50" : "text-ink/55")}>{s.r}</span>
                    </span>
                    <Icon name="arrow-up-right" className="h-4 w-4 opacity-40 transition duration-500 group-hover:rotate-45 group-hover:opacity-100" />
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
