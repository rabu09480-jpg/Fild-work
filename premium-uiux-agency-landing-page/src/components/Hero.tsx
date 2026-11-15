import { useEffect, useRef, type CSSProperties } from "react";
import hero from "@/assets/hero.jpg";
import { Icon, Magnetic, PillButton } from "./ui";

const line1 = ["Design", "that", "turns"];
const line2 = ["visitors", "into", "customers."];

function Ruler({ side }: { side: "left" | "right" }) {
  const labels = ["01A", "250", "500", "750", "1K"];
  return (
    <div
      className={`pointer-events-none absolute inset-y-6 hidden w-6 flex-col justify-between md:flex ${
        side === "left" ? "left-3" : "right-3 items-end"
      }`}
      aria-hidden
    >
      {labels.map((l) => (
        <div key={l} className={`flex flex-col gap-1 ${side === "right" ? "items-end" : ""}`}>
          <span className="font-mono text-[8px] tracking-widest text-white/50 [writing-mode:vertical-rl]">
            {l}
          </span>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className={`h-px bg-white/35 ${i % 3 === 0 ? "w-3" : "w-1.5"}`} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Subtle mouse + scroll parallax
  useEffect(() => {
    const sec = sectionRef.current;
    const img = imgRef.current;
    if (!sec || !img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let mx = 0,
      my = 0,
      sy = 0,
      raf = 0;
    const apply = () => {
      img.style.transform = `translate3d(${mx * -14}px, ${my * -10 + sy * 0.18}px, 0)`;
      raf = 0;
    };
    const req = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onMove = (e: PointerEvent) => {
      const r = sec.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
      req();
    };
    const onScroll = () => {
      sy = Math.min(window.scrollY, 900);
      req();
    };
    sec.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      sec.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  let wi = 0;
  const renderWord = (w: string) => {
    const d = 250 + wi++ * 90;
    return (
      <span key={w + d} className="word mr-[0.22em]">
        <span style={{ "--d": `${d}ms` } as CSSProperties}>{w}</span>
      </span>
    );
  };

  return (
    <section id="top" ref={sectionRef} className="p-2 sm:p-3" aria-label="Introduction">
      <div className="grain relative isolate min-h-[100svh] overflow-hidden rounded-[22px] bg-ink sm:min-h-[760px] sm:rounded-[28px] lg:min-h-[min(100svh,920px)]">
        {/* Background image */}
        <div ref={imgRef} className="absolute -inset-8 -z-10 will-change-transform">
          <img
            src={hero}
            alt=""
            className="kenburns h-full w-full object-cover object-[70%_center]"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/75 via-ink/30 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />

        <Ruler side="left" />
        <Ruler side="right" />

        <div className="mx-auto flex min-h-[inherit] max-w-[1280px] flex-col justify-end px-5 pb-8 pt-32 sm:px-10 sm:pb-12 lg:px-16">
          <div className="fade-up mb-6 inline-flex w-fit items-center gap-2 rounded-full glass px-3 py-1.5" style={{ "--d": "100ms" } as CSSProperties}>
            <span className="flex -space-x-1.5">
              {["#a6e36e", "#f2c38b", "#9fc2ff"].map((c) => (
                <span key={c} className="h-4 w-4 rounded-full border border-ink/40" style={{ background: c }} />
              ))}
            </span>
            <span className="text-xs text-white/90">
              UI/UX studio for startups & SaaS · <span className="text-lime">120+ products shipped</span>
            </span>
          </div>

          <h1 className="max-w-[15ch] text-[44px] font-normal leading-[0.98] tracking-[-0.035em] text-lime-2 sm:text-7xl lg:text-[96px]">
            <span className="block">{line1.map(renderWord)}</span>
            <span className="block text-white">{line2.map(renderWord)}</span>
          </h1>

          <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="fade-up flex flex-col gap-6" style={{ "--d": "900ms" } as CSSProperties}>
              <p className="max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
                We help founders and product teams ship interfaces that users love and investors
                notice — research-led, conversion-obsessed, and dev-ready in weeks, not quarters.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Magnetic strength={0.45}>
                  <PillButton href="#contact" variant="lime">
                    Book a free discovery call
                  </PillButton>
                </Magnetic>
                <Magnetic strength={0.35}>
                  <a
                    href="#work"
                    className="group inline-flex items-center gap-2.5 rounded-full glass px-5 py-3 text-sm text-white transition hover:bg-white/20"
                  >
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-ink transition group-hover:scale-110">
                      <Icon name="play" className="h-2.5 w-2.5 translate-x-[1px]" />
                    </span>
                    See our work
                  </a>
                </Magnetic>
              </div>
            </div>

            <div className="fade-up flex max-w-xs items-start gap-3" style={{ "--d": "1100ms" } as CSSProperties}>
              <Icon name="asterisk" className="spin-slow mt-0.5 h-6 w-6 shrink-0 text-white" />
              <p className="text-[13px] leading-relaxed text-white/70">
                Senior designers only. Weekly sprints. Figma files your engineers will actually
                thank you for.
              </p>
            </div>
          </div>
        </div>

        {/* Floating glass metric cards */}
        <div
          className="fade-up absolute right-8 top-[26%] hidden lg:block xl:right-24"
          style={{ "--d": "1300ms" } as CSSProperties}
        >
          <div className="float glass w-60 rounded-2xl p-4 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                Trial → Paid
              </span>
              <span className="rounded-full bg-lime/90 px-2 py-0.5 text-[10px] font-medium text-ink">
                +38%
              </span>
            </div>
            <svg viewBox="0 0 200 60" className="mt-3 h-14 w-full" aria-hidden>
              <defs>
                <linearGradient id="hg" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#a6e36e" stopOpacity=".5" />
                  <stop offset="1" stopColor="#a6e36e" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 50 C30 48 40 40 60 42 S100 30 120 26 160 14 200 6 L200 60 L0 60Z" fill="url(#hg)" />
              <path d="M0 50 C30 48 40 40 60 42 S100 30 120 26 160 14 200 6" fill="none" stroke="#c6f29b" strokeWidth="2" />
            </svg>
            <p className="mt-1 text-xs text-white/70">After onboarding redesign · Layer</p>
          </div>
        </div>
        <div
          className="fade-up absolute right-[22%] top-[48%] hidden xl:block"
          style={{ "--d": "1500ms" } as CSSProperties}
        >
          <div className="float-slow glass flex items-center gap-3 rounded-2xl px-4 py-3 text-white shadow-2xl">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15">
              <Icon name="sparkles" className="h-4 w-4 text-lime" />
            </span>
            <div>
              <p className="text-sm font-medium">Design sprint · Week 2</p>
              <p className="text-[11px] text-white/60">Hi-fi prototype ready for testing</p>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <a
          href="#proof"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 transition hover:text-white lg:flex"
          aria-label="Scroll to content"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
          <span className="relative h-9 w-[1px] overflow-hidden bg-white/20">
            <span className="absolute inset-x-0 top-0 h-3 scroll-line bg-lime" />
          </span>
        </a>
      </div>
    </section>
  );
}
