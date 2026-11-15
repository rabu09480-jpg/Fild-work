import { useState } from "react";
import { cn } from "@/utils/cn";
import { Eyebrow, Icon, PillButton, Reveal, Tilt } from "./ui";

const plans = [
  {
    name: "Sprint",
    tag: "For validating an idea",
    monthly: 6500,
    unit: "/ project",
    oneOff: true,
    desc: "A focused 2-week engagement to audit, redesign or prototype one critical flow.",
    features: [
      "UX audit & conversion teardown",
      "1 core flow redesigned (up to 12 screens)",
      "Clickable hi-fi prototype",
      "5 moderated user tests",
      "Dev-ready Figma handoff",
    ],
    cta: "Start a sprint",
  },
  {
    name: "Partner",
    tag: "Most popular for SaaS",
    monthly: 9800,
    unit: "/ month",
    popular: true,
    desc: "Your dedicated senior design team. Unlimited requests, one active task at a time, weekly delivery.",
    features: [
      "Lead product designer + UX researcher",
      "Unlimited requests & revisions",
      "Product, web & design system work",
      "Weekly sprints & Loom reviews",
      "Shared Slack channel, 24h response",
      "Pause or cancel anytime",
    ],
    cta: "Book a discovery call",
  },
  {
    name: "Scale",
    tag: "For growth-stage teams",
    monthly: 16500,
    unit: "/ month",
    desc: "Two parallel workstreams and a design lead embedded in your product rituals.",
    features: [
      "Everything in Partner",
      "2 active tasks in parallel",
      "Embedded design lead & PM rituals",
      "Design system governance",
      "Quarterly research programme",
      "Priority same-day support",
    ],
    cta: "Talk to us",
  },
];

const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function Pricing() {
  const [quarterly, setQuarterly] = useState(false);

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="bg-paper-2 py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>Pricing</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="pricing-title" className="mt-5 text-4xl font-normal tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Senior design. Predictable pricing.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-md text-ink/60">
              No hourly billing, no scope-creep invoices. Less than the cost of one full-time
              senior hire — with an entire team behind it.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-ink/10 bg-white p-1" role="radiogroup" aria-label="Billing period">
              {[
                { v: false, l: "Monthly" },
                { v: true, l: "Quarterly" },
              ].map((o) => (
                <button
                  key={o.l}
                  role="radio"
                  aria-checked={quarterly === o.v}
                  onClick={() => setQuarterly(o.v)}
                  className={cn(
                    "relative flex items-center gap-2 rounded-full px-5 py-2 text-sm transition-all duration-300",
                    quarterly === o.v ? "bg-ink text-white" : "text-ink/60 hover:text-ink"
                  )}
                >
                  {o.l}
                  {o.v && (
                    <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-medium", quarterly ? "bg-lime text-ink" : "bg-lime/40 text-ink")}>
                      −10%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid items-stretch gap-4 lg:grid-cols-3">
          {plans.map((p, i) => {
            const price = p.oneOff || !quarterly ? p.monthly : Math.round((p.monthly * 0.9) / 50) * 50;
            return (
              <Reveal key={p.name} delay={i * 110} className="h-full">
                <Tilt max={4} className="h-full">
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1.5 sm:p-8",
                    p.popular
                      ? "bg-ink text-white shadow-[0_40px_80px_-40px_rgba(12,15,11,0.7)]"
                      : "border border-ink/10 bg-white hover:shadow-[0_30px_60px_-40px_rgba(0,0,0,0.3)]"
                  )}
                >
                  {p.popular && (
                    <div className="blob pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-lime/25 blur-3xl" aria-hidden />
                  )}
                  <div className="relative flex items-center justify-between">
                    <h3 className="text-2xl font-medium tracking-tight">{p.name}</h3>
                    {p.popular ? (
                      <span className="rounded-full bg-lime px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink">
                        Popular
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink/45">{p.tag}</span>
                    )}
                  </div>
                  <p className={cn("relative mt-3 text-sm leading-relaxed", p.popular ? "text-white/60" : "text-ink/60")}>{p.desc}</p>
                  <div className="relative mt-8 flex items-baseline gap-1.5">
                    <span key={price} className="fade-up text-5xl font-normal tracking-[-0.03em]">
                      {fmt(price)}
                    </span>
                    <span className={cn("text-sm", p.popular ? "text-white/50" : "text-ink/50")}>{p.unit}</span>
                  </div>
                  <p className={cn("relative mt-1 h-4 text-xs", p.popular ? "text-lime" : "text-ink/50")}>
                    {p.oneOff ? "Fixed scope · 2 weeks" : quarterly ? `Billed ${fmt(price * 3)} quarterly` : "Billed monthly · cancel anytime"}
                  </p>

                  <div className={cn("relative my-7 h-px", p.popular ? "bg-white/10" : "bg-ink/10")} />

                  <ul className="relative flex-1 space-y-3.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <span className={cn("mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full", p.popular ? "bg-lime text-ink" : "bg-paper text-ink")}>
                          <Icon name="check" className="h-3 w-3" />
                        </span>
                        <span className={p.popular ? "text-white/85" : "text-ink/80"}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <PillButton
                    href="#contact"
                    variant={p.popular ? "lime" : "dark"}
                    className="relative mt-9 w-full justify-between"
                  >
                    {p.cta}
                  </PillButton>
                </article>
                </Tilt>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={100}>
          <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-3xl border border-dashed border-ink/20 px-6 py-5 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-ink/70">
              <span className="font-medium text-ink">Not sure which plan fits?</span> Every engagement
              starts with a free 30-minute discovery call and a written recommendation.
            </p>
            <a href="#contact" className="group inline-flex items-center gap-2 text-sm font-medium">
              Get a recommendation
              <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
