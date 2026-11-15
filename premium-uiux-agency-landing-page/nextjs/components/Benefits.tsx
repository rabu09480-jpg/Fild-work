"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow, Icon, LogoMark, Reveal, spotlightMove } from "./ui";

const benefits = [
  { icon: "users", title: "Senior-only team", desc: "No juniors learning on your dime. Every designer has 8+ years shipping SaaS." },
  { icon: "bolt", title: "Weekly sprints", desc: "Fresh, testable work in your inbox every Friday. Momentum you can feel." },
  { icon: "target", title: "Metric-driven", desc: "We tie every decision to activation, retention or revenue — and report on it." },
  { icon: "shield", title: "Zero lock-in", desc: "You own every file from day one. Pause or cancel your plan anytime." },
];

const left = [
  { label: "Figma", y: 70 },
  { label: "Notion", y: 170 },
  { label: "Slack", y: 270 },
];
const right = [
  { label: "Linear", y: 70 },
  { label: "Loom", y: 170 },
  { label: "Webflow", y: 270 },
];

function Diagram() {
  const pathL = (y: number) =>
    y === 170
      ? `M150 170 H245`
      : `M150 ${y} H185 Q200 ${y} 200 ${y < 170 ? y + 15 : y - 15} V${y < 170 ? 155 : 185} Q200 170 215 170 H245`;
  const pathR = (y: number) =>
    y === 170
      ? `M450 170 H355`
      : `M450 ${y} H415 Q400 ${y} 400 ${y < 170 ? y + 15 : y - 15} V${y < 170 ? 155 : 185} Q400 170 385 170 H355`;

  return (
    <div className="relative mx-auto aspect-[600/340] w-full max-w-[600px]" aria-hidden>
      <svg viewBox="0 0 600 340" className="absolute inset-0 h-full w-full">
        {left.map((c) => (
          <g key={c.label}>
            <path d={pathL(c.y)} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
            <path d={pathL(c.y)} fill="none" stroke="#a6e36e" strokeWidth="1.4" className="dash-flow" />
          </g>
        ))}
        {right.map((c) => (
          <g key={c.label}>
            <path d={pathR(c.y)} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
            <path d={pathR(c.y)} fill="none" stroke="#a6e36e" strokeWidth="1.4" className="dash-flow [animation-direction:reverse]" />
          </g>
        ))}
      </svg>
      {[...left.map((c) => ({ ...c, x: 90 })), ...right.map((c) => ({ ...c, x: 510 }))].map((c, i) => (
        <span
          key={c.label}
          className="float absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.06] px-2 py-1 font-mono text-[8px] uppercase tracking-widest text-white/80 backdrop-blur sm:px-3 sm:py-1.5 sm:text-[10px]"
          style={{ left: `${(c.x / 600) * 100}%`, top: `${(c.y / 340) * 100}%`, animationDelay: `${i * 0.6}s` }}
        >
          <span className="h-1.5 w-1.5 rounded-sm bg-lime" />
          {c.label}
        </span>
      ))}
      <div className="absolute left-1/2 top-1/2 grid aspect-square w-[18.5%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-white/20 bg-paper shadow-[0_0_80px_-10px_rgba(166,227,110,0.55)]">
        <LogoMark className="h-1/2 w-1/2 spin-slow" />
      </div>
    </div>
  );
}

const steps = [
  { n: "01", t: "Discover", d: "A 30-min call and a deep-dive audit of your product, users and metrics.", w: "Week 0" },
  { n: "02", t: "Define", d: "We map the riskiest assumptions, align on goals and lock a sprint plan.", w: "Week 1" },
  { n: "03", t: "Design", d: "Rapid iterations, weekly reviews and usability tests with real customers.", w: "Weeks 2–5" },
  { n: "04", t: "Deliver", d: "Dev-ready specs, design system handoff and QA until it's live.", w: "Week 6+" },
];

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [horizontal, setHorizontal] = useState(false);

  // Track the rail orientation after mount so it stays correct on resize
  // (and never renders differently on the server vs. the client).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setHorizontal(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const v = (vh * 0.8 - r.top) / (r.height + vh * 0.2);
      setP(Math.max(0, Math.min(1, v)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="process" ref={ref} className="mt-28 scroll-mt-24 sm:mt-36">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal>
            <Eyebrow dark>Our process</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h3 className="mt-5 max-w-lg text-3xl font-normal tracking-[-0.03em] text-white sm:text-5xl">
              From first call to shipped product in six weeks.
            </h3>
          </Reveal>
        </div>
        <Reveal delay={160}>
          <p className="max-w-sm text-white/55">A proven rhythm that de-risks every decision and keeps your team in the loop.</p>
        </Reveal>
      </div>

      <div className="relative mt-14">
        <div className="absolute left-[15px] top-0 h-full w-px bg-white/10 md:left-0 md:top-[15px] md:h-px md:w-full" aria-hidden>
          <div
            className="h-full w-full origin-top bg-lime md:origin-left"
            style={{ transform: horizontal ? `scaleX(${p})` : `scaleY(${p})` }}
          />
        </div>
        <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
          {steps.map((s, i) => {
            const on = p >= i / steps.length + 0.05;
            return (
              <li key={s.n} className="relative pl-12 md:pl-0 md:pt-12">
                <span
                  className={`absolute left-0 top-0 grid h-[31px] w-[31px] place-items-center rounded-full border font-mono text-[10px] transition-all duration-500 ${
                    on ? "border-lime bg-lime text-ink" : "border-white/20 bg-ink text-white/60"
                  }`}
                >
                  {s.n}
                </span>
                <p className="font-mono text-[10px] uppercase tracking-widest text-lime/80">{s.w}</p>
                <h4 className="mt-2 text-xl font-medium text-white">{s.t}</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{s.d}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default function Benefits() {
  return (
    <section aria-labelledby="benefits-title" className="p-2 sm:p-3">
      <div className="grain relative overflow-hidden rounded-[22px] bg-ink py-24 sm:rounded-[28px] sm:py-32">
        <div className="blob pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-lime/10 blur-[100px]" aria-hidden />
        <div className="blob pointer-events-none absolute -right-40 bottom-40 h-[380px] w-[380px] rounded-full bg-moss/60 blur-[100px] [animation-delay:-6s]" aria-hidden />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <Reveal>
                <Eyebrow dark>Why Fieldwork</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h2 id="benefits-title" className="mt-5 text-4xl font-normal tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
                  An in-house design team. <span className="text-white/40">Without the overhead.</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 max-w-md text-white/60">
                  We plug straight into your tools and rituals. Async-first, timezone-friendly and
                  as invested in your KPIs as your own team.
                </p>
              </Reveal>
            </div>
            <Reveal delay={200}>
              <Diagram />
            </Reveal>
          </div>

          <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 90}>
                <div
                  onMouseMove={spotlightMove}
                  className="spotlight group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.06] text-lime transition-transform duration-500 group-hover:scale-110">
                    <Icon name={b.icon} />
                  </span>
                  <h3 className="mt-8 text-lg font-medium text-white">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Process />
        </div>
      </div>
    </section>
  );
}
