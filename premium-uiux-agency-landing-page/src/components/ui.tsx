import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ElementType,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { cn } from "@/utils/cn";

/* ---------- useInView ---------- */
export function useInView<T extends Element>(threshold = 0.15, once = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);
  return { ref, inView };
}

/* ---------- Reveal ---------- */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={cn("reveal", inView && "is-in", className)}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/* ---------- Counter ---------- */
export function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1800,
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ---------- Eyebrow label ---------- */
export function Eyebrow({
  children,
  className,
  dark,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]",
        dark ? "text-white/60" : "text-ink/60",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-[1px] bg-lime" aria-hidden />
      {children}
    </span>
  );
}

/* ---------- Buttons ---------- */
export function ArrowBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-full bg-lime text-ink",
        className
      )}
      aria-hidden
    >
      <Icon
        name="arrow-up-right"
        className="h-3.5 w-3.5 transition-transform duration-500 ease-out group-hover:-translate-y-6 group-hover:translate-x-6"
      />
      <Icon
        name="arrow-up-right"
        className="absolute h-3.5 w-3.5 -translate-x-6 translate-y-6 transition-transform duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0"
      />
    </span>
  );
}

export function PillButton({
  href,
  children,
  variant = "light",
  className,
  onClick,
  type,
}: {
  href?: string;
  children: ReactNode;
  variant?: "light" | "dark" | "lime" | "ghost";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const styles = {
    light: "bg-white text-ink hover:bg-paper-2",
    dark: "bg-ink text-white hover:bg-ink-2",
    lime: "bg-lime text-ink hover:bg-lime-2",
    ghost: "glass text-white hover:bg-white/20",
  }[variant];
  const cls = cn(
    "group inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-sm font-medium transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)] active:scale-[0.97]",
    styles,
    className
  );
  const badge =
    variant === "lime" ? (
      <ArrowBadge className="bg-ink text-lime" />
    ) : (
      <ArrowBadge />
    );
  if (href)
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
        {badge}
      </a>
    );
  return (
    <button type={type ?? "button"} className={cls} onClick={onClick}>
      {children}
      {badge}
    </button>
  );
}

/* ---------- Magnetic (pointer-attraction wrapper) ---------- */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const range = Math.max(r.width, r.height) / 2 + 70;
      if (Math.hypot(dx, dy) < range) {
        el.style.transition = "transform 120ms linear";
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      } else if (el.style.transform) {
        el.style.transition = "transform 650ms cubic-bezier(0.22,1,0.36,1)";
        el.style.transform = "";
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [strength]);
  return (
    <div ref={ref} className={cn("inline-block", className)}>
      {children}
    </div>
  );
}

/* ---------- Tilt (3D card hover) ---------- */
export function useTilt<T extends HTMLElement>(max = 6) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -max;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * max;
        el.style.transition = "transform 80ms linear";
        el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      });
    };
    const onLeave = () => {
      el.style.transition = "transform 800ms cubic-bezier(0.22,1,0.36,1)";
      el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [max]);
  return ref;
}

export function Tilt({
  children,
  className,
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useTilt<HTMLDivElement>(max);
  return (
    <div ref={ref} className={cn("will-change-transform [transform-style:preserve-3d]", className)}>
      {children}
    </div>
  );
}

/* ---------- Spotlight handler ---------- */
export function spotlightMove(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/* ---------- Corner dots (Orin-style grid markers) ---------- */
export function CornerDots({ className }: { className?: string }) {
  const base = "absolute h-1.5 w-1.5 rounded-full bg-ink/70";
  return (
    <span className={cn("pointer-events-none", className)} aria-hidden>
      <span className={cn(base, "-left-[3px] -top-[3px]")} />
      <span className={cn(base, "-right-[3px] -top-[3px]")} />
      <span className={cn(base, "-bottom-[3px] -left-[3px]")} />
      <span className={cn(base, "-bottom-[3px] -right-[3px]")} />
    </span>
  );
}

/* ---------- Logo mark ---------- */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="16" fill="#a6e36e" />
      <path
        d="M16 5v22M5 16h22M8.2 8.2l15.6 15.6M23.8 8.2 8.2 23.8"
        stroke="#0c0f0b"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="4" fill="#a6e36e" stroke="#0c0f0b" strokeWidth="2.2" />
    </svg>
  );
}

/* ---------- Icons ---------- */
const paths: Record<string, ReactNode> = {
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  "arrow-left": <path d="M19 12H5M11 6l-6 6 6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  menu: <path d="M4 8h16M4 16h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  star: (
    <path
      d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="m6.3 6.3 2.1 2.1M15.6 15.6l2.1 2.1M6.3 17.7l2.1-2.1M15.6 8.4l2.1-2.1" />
    </>
  ),
  code: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </>
  ),
  bolt: <path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z" />,
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.5" />
      <path d="M2.5 20c.6-3.5 3.3-5.5 6.5-5.5s5.9 2 6.5 5.5" />
      <path d="M16 5.2a3.5 3.5 0 0 1 0 6.6M18 14.8c2 .7 3.2 2.5 3.5 5.2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  play: <path d="M8 5.5v13l10-6.5-10-6.5Z" fill="currentColor" stroke="none" />,
  asterisk: (
    <path
      d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7"
      strokeWidth="2.6"
    />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </>
  ),
  x: <path d="M4 4l16 16M20 4 4 20" />,
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V17M8 7.2v.1M12 17v-3.8c0-1.6 1-2.7 2.4-2.7 1.4 0 2.1 1 2.1 2.7V17M12 10.5V17" />
    </>
  ),
  dribbble: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 10.2c5.4.2 10.3-1.2 13.9-4.6M7.5 20c2-4.6 5.9-7.6 12.9-6.6M9 3.5c3 3.6 5.6 9 6.6 16.6" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
    </>
  ),
};

export function Icon({
  name,
  className,
}: {
  name: keyof typeof paths | string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-5 w-5", className)}
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
