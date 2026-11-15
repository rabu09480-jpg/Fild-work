"use client";

import { useEffect, useState } from "react";
const w1 = "/images/work-1.jpg";
const w2 = "/images/work-2.jpg";
const w3 = "/images/work-3.jpg";
import { cn } from "@/lib/cn";
import { Eyebrow, Icon, Reveal } from "./ui";

const projects = [
  {
    client: "Layer",
    type: "B2B SaaS · Analytics",
    title: "Rebuilding onboarding for a Series A analytics platform",
    img: w1,
    alt: "Layer analytics dashboard design shown on a laptop",
    metrics: [
      { v: "+41%", l: "Activation" },
      { v: "−52%", l: "Time to value" },
      { v: "3.2×", l: "Trial → paid" },
    ],
    services: ["Research", "Product design", "Design system"],
  },
  {
    client: "Northbeam",
    type: "Fintech · Mobile",
    title: "A banking app Gen Z actually wants to open every day",
    img: w2,
    alt: "Northbeam fintech mobile app screens with dark UI",
    metrics: [
      { v: "4.8★", l: "App Store" },
      { v: "+63%", l: "DAU / MAU" },
      { v: "$18M", l: "Series B raised" },
    ],
    services: ["Mobile UX", "Brand", "Prototyping"],
  },
  {
    client: "Lumen AI",
    type: "AI Startup · Website",
    title: "Positioning an AI copilot for an enterprise launch",
    img: w3,
    alt: "Lumen AI marketing website on a desktop monitor",
    metrics: [
      { v: "+118%", l: "Demo bookings" },
      { v: "2.1s", l: "LCP" },
      { v: "−34%", l: "Bounce rate" },
    ],
    services: ["Messaging", "Web design", "Framer build"],
  },
];

export default function Showcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % projects.length), 7000);
    return () => clearInterval(t);
  }, [paused, active]);

  const p = projects[active];

  return (
    <section id="work" aria-labelledby="work-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <Eyebrow>Selected work</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="work-title" className="mt-5 max-w-xl text-4xl font-normal tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                Results you can put in a board deck.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="max-w-sm text-ink/60">
              Every engagement is measured against the business metric that matters most to you —
              not just how it looks on Dribbble.
            </p>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div
            className="mt-14 grid gap-4 lg:grid-cols-[360px_1fr]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Tabs */}
            <div
              role="tablist"
              aria-label="Case studies"
              aria-orientation="vertical"
              className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
              onKeyDown={(e) => {
                if (["ArrowRight", "ArrowDown"].includes(e.key)) {
                  e.preventDefault();
                  setActive((a) => (a + 1) % projects.length);
                  requestAnimationFrame(() => document.getElementById(`tab-${(active + 1) % projects.length}`)?.focus());
                }
                if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
                  e.preventDefault();
                  setActive((a) => (a - 1 + projects.length) % projects.length);
                  requestAnimationFrame(() =>
                    document.getElementById(`tab-${(active - 1 + projects.length) % projects.length}`)?.focus()
                  );
                }
              }}
            >
              {projects.map((pr, i) => (
                <button
                  key={pr.client}
                  role="tab"
                  id={`tab-${i}`}
                  aria-selected={active === i}
                  aria-controls="work-panel"
                  onClick={() => setActive(i)}
                  className={cn(
                    "group relative min-w-[240px] overflow-hidden rounded-2xl border p-5 text-left transition-all duration-500 lg:min-w-0",
                    active === i
                      ? "border-ink bg-ink text-white"
                      : "border-ink/10 bg-white/50 hover:border-ink/30 hover:bg-white"
                  )}
                >
                  <span className="flex items-center justify-between">
                    <span className={cn("font-mono text-[10px] uppercase tracking-widest", active === i ? "text-lime" : "text-ink/50")}>
                      {pr.type}
                    </span>
                    <Icon
                      name="arrow-up-right"
                      className={cn("h-4 w-4 transition-transform duration-500", active === i ? "rotate-45 text-lime" : "text-ink/40 group-hover:rotate-45")}
                    />
                  </span>
                  <span className="mt-3 block text-lg font-medium tracking-tight">{pr.client}</span>
                  <span className={cn("mt-1 block text-sm leading-snug", active === i ? "text-white/65" : "text-ink/55")}>{pr.title}</span>
                  {/* progress */}
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10">
                    {active === i && (
                      <span
                        key={`${active}-${paused}`}
                        className="block h-full origin-left bg-lime"
                        style={{
                          animation: paused ? "none" : "grow 7s linear forwards",
                          transform: paused ? "scaleX(1)" : undefined,
                        }}
                      />
                    )}
                  </span>
                </button>
              ))}
              <a
                href="#contact"
                className="hidden items-center justify-between rounded-2xl border border-dashed border-ink/20 p-5 text-sm text-ink/60 transition hover:border-ink hover:text-ink lg:flex"
              >
                Your product could be next
                <Icon name="arrow-right" className="h-4 w-4" />
              </a>
            </div>

            {/* Panel */}
            <div
              id="work-panel"
              role="tabpanel"
              aria-labelledby={`tab-${active}`}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink sm:aspect-[4/3]"
            >
              {projects.map((pr, i) => (
                <img
                  key={pr.client}
                  src={pr.img}
                  alt={pr.alt}
                  loading="lazy"
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                    active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"
                  )}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="absolute left-4 top-4 flex flex-wrap gap-1.5 sm:left-6 sm:top-6">
                {p.services.map((s) => (
                  <span key={s} className="glass rounded-full px-3 py-1 text-[11px] text-white">
                    {s}
                  </span>
                ))}
              </div>
              <div key={active} className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
                <div className="glass-dark grid grid-cols-3 divide-x divide-white/10 rounded-2xl py-4 text-white">
                  {p.metrics.map((m, i) => (
                    <div key={m.l} className="fade-up px-3 text-center sm:px-5" style={{ ["--d" as string]: `${i * 100}ms` }}>
                      <p className="text-2xl font-medium tracking-tight text-lime-2 sm:text-4xl">{m.v}</p>
                      <p className="mt-1 text-[11px] text-white/60 sm:text-xs">{m.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
