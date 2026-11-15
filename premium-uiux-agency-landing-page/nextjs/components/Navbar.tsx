"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon, LogoMark, Magnetic, PillButton } from "./ui";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? y / h : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="absolute left-0 top-0 h-[2px] bg-lime transition-[width] duration-150"
        style={{ width: `${progress * 100}%` }}
        aria-hidden
      />
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex max-w-[1280px] items-center justify-between px-4 transition-all duration-500 sm:px-6 lg:px-10",
          scrolled ? "pt-3" : "pt-5 sm:pt-7"
        )}
      >
        <div
          className={cn(
            "glass-dark flex items-center gap-2 rounded-2xl py-2 pl-3 pr-2 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 lg:gap-8 lg:pr-3",
            scrolled && "bg-ink/80"
          )}
        >
          <a href="#top" className="flex items-center gap-2.5 pr-2" aria-label="Fieldwork home">
            <LogoMark className="h-7 w-7 transition-transform duration-700 hover:rotate-180" />
            <span className="text-lg font-medium tracking-tight text-white">
              Fieldwork<span className="text-lime">.</span>
            </span>
          </a>
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={cn(
                    "relative rounded-lg px-3 py-1.5 text-[13px] transition-colors duration-300",
                    active === l.href
                      ? "bg-white/10 text-lime"
                      : "text-white/75 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <span className="glass hidden items-center gap-2 rounded-full px-3 py-2 text-xs text-white/90 md:inline-flex">
            <span className="pulse-ring relative h-2 w-2 rounded-full bg-lime text-lime" />
            2 spots open for Q3
          </span>
          <Magnetic strength={0.5} className="hidden sm:inline-block">
            <PillButton href="#contact">Book a call</PillButton>
          </Magnetic>
          <button
            type="button"
            className="glass-dark grid h-11 w-11 place-items-center rounded-xl text-white lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-3 top-[84px] origin-top rounded-3xl glass-dark p-3 transition-all duration-500 lg:hidden",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-3 scale-[0.98] opacity-0"
        )}
      >
        <ul className="flex flex-col">
          {links.map((l, i) => (
            <li
              key={l.href}
              className={cn(
                "transition-all duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              )}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
            >
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-4 text-lg text-white hover:bg-white/5"
              >
                {l.label}
                <Icon name="arrow-up-right" className="h-4 w-4 text-lime" />
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-lime px-4 py-4 font-medium text-ink"
        >
          Book a discovery call <Icon name="arrow-up-right" className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}
