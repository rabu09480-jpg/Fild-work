"use client";

import { Counter, Eyebrow, Icon, Reveal } from "./ui";

const logos = [
  { name: "Layer", shape: "M4 8l8-4 8 4-8 4-8-4Zm0 5 8 4 8-4" },
  { name: "Northbeam", shape: "M12 3l9 16H3L12 3Z" },
  { name: "Quanta", shape: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 5a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" },
  { name: "Halcyon", shape: "M3 12h18M12 3v18" },
  { name: "Ploy", shape: "M4 4h7v7H4zM13 13h7v7h-7z" },
  { name: "Arcwise", shape: "M3 18A9 9 0 0 1 21 18" },
  { name: "Lumen AI", shape: "M12 2v4M12 18v4M2 12h4M18 12h4M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" },
  { name: "Stackr", shape: "M4 6h16M4 12h16M4 18h16" },
];

export function LogoMarquee() {
  const row = [...logos, ...logos];
  return (
    <section id="proof" aria-label="Clients" className="py-14 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
        <Reveal className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-ink/60">
            Trusted by founders backed by{" "}
            <span className="font-medium text-ink">Y Combinator, Sequoia, Index</span> & a16z
          </p>
        </Reveal>
      </div>
      <div className="marquee-wrap relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <ul className="marquee flex w-max items-center gap-14 pr-14 sm:gap-20 sm:pr-20">
          {row.map((l, i) => (
            <li
              key={i}
              aria-hidden={i >= logos.length}
              className="flex items-center gap-2.5 text-ink/45 transition-colors duration-300 hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
                <path d={l.shape} />
              </svg>
              <span className="whitespace-nowrap text-xl font-semibold tracking-tight sm:text-2xl">
                {l.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const avatarMarcus = "/images/avatar-marcus.jpg";
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="pb-24 sm:pb-32">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 sm:px-10 lg:grid-cols-[220px_1fr] lg:gap-16 lg:px-16">
        <Reveal>
          <Eyebrow>About the studio</Eyebrow>
        </Reveal>
        <div>
          <Reveal delay={80}>
            <h2
              id="about-title"
              className="max-w-4xl text-[28px] font-normal leading-[1.18] tracking-[-0.02em] sm:text-4xl lg:text-[44px]"
            >
              Great products don't win on features — they win on feel. We're a senior team of
              product designers{" "}
              <span className="text-ink/35">
                who turn messy roadmaps into clear, intuitive interfaces that lift activation,
                retention and revenue.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <a
              href="#process"
              className="group mt-8 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-sm font-medium transition hover:border-ink"
            >
              How we work
              <Icon name="arrow-up-right" className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr]">
            <Reveal delay={0} className="sm:row-span-2 lg:row-span-1">
              <figure className="flex h-full flex-col justify-between rounded-3xl bg-white p-7 shadow-[0_1px_0_rgba(0,0,0,0.04),0_20px_50px_-30px_rgba(0,0,0,0.25)] transition-transform duration-500 hover:-translate-y-1">
                <div>
                  <div className="flex gap-0.5 text-ink" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon key={i} name="star" className="h-4 w-4" />
                    ))}
                  </div>
                  <blockquote className="mt-5 text-[15px] leading-relaxed text-ink/75">
                    “They didn't just redesign our app — they rebuilt how users understand our
                    product. Activation jumped 41% in the first month after launch.”
                  </blockquote>
                </div>
                <figcaption className="mt-8 flex items-center gap-3">
                  <img
                    src={avatarMarcus}
                    alt="Marcus Hale"
                    className="h-11 w-11 rounded-full object-cover grayscale"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm font-medium">Marcus Hale</p>
                    <p className="text-xs text-ink/55">Co-founder & CEO, Layer</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={120}>
              <div className="group flex h-full min-h-[180px] flex-col justify-between rounded-3xl bg-lime p-7 transition-transform duration-500 hover:-translate-y-1">
                <p className="text-5xl font-normal tracking-tight sm:text-6xl">
                  <Counter to={120} suffix="+" />
                </p>
                <div className="flex items-end justify-between">
                  <p className="text-sm">Products designed & shipped</p>
                  <Icon name="arrow-up-right" className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div className="group relative flex h-full min-h-[180px] flex-col justify-between overflow-hidden rounded-3xl bg-ink p-7 text-white transition-transform duration-500 hover:-translate-y-1">
                <div className="blob absolute -right-10 -top-10 h-40 w-40 rounded-full bg-lime/25 blur-3xl" aria-hidden />
                <p className="relative text-5xl font-normal tracking-tight sm:text-6xl">
                  <Counter to={37} suffix="%" />
                </p>
                <p className="relative text-sm text-white/70">Average lift in conversion</p>
              </div>
            </Reveal>

            <Reveal delay={120} className="sm:col-span-2 lg:col-span-2 lg:col-start-2">
              <div className="grid grid-cols-3 divide-x divide-ink/10 rounded-3xl border border-ink/10 bg-paper-2/60 py-6">
                {[
                  { v: 1.2, s: "B", p: "$", d: 1, l: "Raised by clients" },
                  { v: 4.9, s: "/5", p: "", d: 1, l: "Clutch rating" },
                  { v: 14, s: " days", p: "", d: 0, l: "Avg. to first prototype" },
                ].map((s) => (
                  <div key={s.l} className="px-4 text-center sm:px-6">
                    <p className="text-xl font-medium tracking-tight sm:text-3xl">
                      <Counter to={s.v} suffix={s.s} prefix={s.p} decimals={s.d} />
                    </p>
                    <p className="mt-1 text-[11px] text-ink/55 sm:text-xs">{s.l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
