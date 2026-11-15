"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./ui";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.style.display = "none";
      return;
    }
    let raf = 0;
    let x = window.innerWidth / 2;
    let y = -300;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        el.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="cursor-glow pointer-events-none fixed left-0 top-0 z-30 h-[600px] w-[600px] rounded-full will-change-transform"
    />
  );
}

export function MobileCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById("contact");
      const nearContact = contact ? contact.getBoundingClientRect().top < window.innerHeight : false;
      setShow(window.scrollY > window.innerHeight * 0.8 && !nearContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={cn(
        "fixed inset-x-3 bottom-3 z-40 transition-all duration-500 sm:hidden",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
    >
      <a
        href="#contact"
        className="glass-dark flex items-center justify-between rounded-2xl py-2 pl-5 pr-2 text-white shadow-2xl"
      >
        <span className="text-sm">
          <span className="block font-medium">Book a free discovery call</span>
          <span className="text-xs text-white/55">30 min · No commitment</span>
        </span>
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-lime text-ink">
          <Icon name="arrow-up-right" className="h-4 w-4" />
        </span>
      </a>
    </div>
  );
}
