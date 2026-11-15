"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { LogoMark } from "./ui";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"load" | "exit" | "gone">("load");
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Resolve motion preference after mount so server and client markup match.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("gone");
      return;
    }
    document.body.style.overflow = "hidden";
    let raf = 0;
    const start = performance.now();
    const dur = 950;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else window.setTimeout(() => setPhase("exit"), 140);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  // Unlock scroll once exiting / gone + fallback exit cleanup
  useEffect(() => {
    if (phase !== "exit") {
      if (phase === "gone") document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "";
    const t = window.setTimeout(() => setPhase("gone"), 1400);
    const el = root.current;
    const end = (e: TransitionEvent) => e.propertyName === "transform" && setPhase("gone");
    el?.addEventListener("transitionend", end);
    return () => {
      window.clearTimeout(t);
      el?.removeEventListener("transitionend", end);
    };
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      ref={root}
      aria-hidden
      className={cn(
        "preloader fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-6 transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] sm:p-10",
        phase === "exit" && "-translate-y-full"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2.5">
          <LogoMark className="h-7 w-7" />
          <span className="text-lg font-medium tracking-tight text-white">
            Fieldwork<span className="text-lime">.</span>
          </span>
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
          Design studio — Est. 2019
        </span>
      </div>

      <div className="flex items-end justify-between">
        <div className="mb-1 max-w-[240px]">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-lime">
            UI / UX · SaaS
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/50">
            Loading a better first impression…
          </p>
        </div>
        <p className="text-right text-[18vw] font-normal leading-[0.8] tracking-[-0.06em] text-white sm:text-[140px]">
          {count}
          <span className="text-lime">%</span>
        </p>
      </div>

      <div className="absolute inset-x-6 bottom-0 h-[2px] bg-white/10 sm:inset-x-10">
        <div
          className="h-full bg-lime transition-[width] duration-100 ease-linear"
          style={{ width: `${count}%` }}
        />
      </div>
    </div>
  );
}
