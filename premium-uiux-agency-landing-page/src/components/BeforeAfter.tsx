import { useRef, useState, type PointerEvent } from "react";
import before from "@/assets/before.jpg";
import after from "@/assets/after.jpg";
import { CornerDots, Eyebrow, Icon, Reveal } from "./ui";

export default function BeforeAfter() {
  const [pos, setPos] = useState(58);
  const [touched, setTouched] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  const update = (clientX: number) => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(3, Math.min(97, ((clientX - r.left) / r.width) * 100)));
    setTouched(true);
  };
  const down = (e: PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    update(e.clientX);
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.buttons === 1) update(e.clientX);
  };

  return (
    <section aria-labelledby="ba-title" className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 sm:px-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16 lg:px-16">
        <div>
          <Reveal>
            <Eyebrow>Before / After</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="ba-title" className="mt-5 text-4xl font-normal tracking-[-0.03em] sm:text-5xl">
              The redesign effect, in one drag.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 max-w-sm leading-relaxed text-ink/60">
              Layer's dashboard went from a cluttered enterprise admin to a product people actively
              enjoy using. Drag the handle — that's six weeks of research, iteration and craft.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <ul className="mt-8 space-y-3.5">
              {[
                "−52% time-to-value for new users",
                "+41% activation after relaunch",
                "Design system: 140+ reusable components",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-ink/80">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-lime text-ink">
                    <Icon name="check" className="h-3 w-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div
            ref={wrap}
            onPointerDown={down}
            onPointerMove={move}
            className="group relative aspect-[4/3] touch-none select-none overflow-hidden rounded-3xl bg-ink shadow-[0_40px_80px_-40px_rgba(12,15,11,0.5)] ring-lime ring-offset-paper ring-offset-2 has-[input:focus-visible]:ring-4"
          >
            {/* After (base) */}
            <img src={after} alt="Redesigned Layer dashboard" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            {/* Before (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
              aria-hidden
            >
              <img src={before} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <span className="absolute left-4 top-4 rounded-full glass-dark px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/90">
                Before
              </span>
            </div>
            <span className="absolute right-4 top-4 rounded-full bg-lime px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink">
              After
            </span>

            <CornerDots className="absolute inset-0 z-20 [&>span]:bg-white/90" />

            {/* Handle */}
            <div className="absolute inset-y-0 z-10" style={{ left: `${pos}%` }} aria-hidden>
              <div className="absolute inset-y-0 w-[2px] -translate-x-1/2 bg-white shadow-[0_0_20px_rgba(0,0,0,0.4)]" />
              <div
                className={`absolute top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-white text-ink shadow-xl transition-transform duration-300 group-active:scale-95 ${
                  touched ? "" : "nudge"
                }`}
              >
                <span className="flex gap-1" aria-hidden>
                  <Icon name="arrow-left" className="h-3.5 w-3.5" />
                  <Icon name="arrow-right" className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>

            {/* Accessible keyboard control */}
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(pos)}
              onChange={(e) => {
                setPos(Number(e.target.value));
                setTouched(true);
              }}
              aria-label="Reveal slider: compare before and after design"
              className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
            />
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs text-ink/50">
            <Icon name="arrow-left" className="h-3 w-3" />
            Drag, or use arrow keys
            <Icon name="arrow-right" className="h-3 w-3" />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
