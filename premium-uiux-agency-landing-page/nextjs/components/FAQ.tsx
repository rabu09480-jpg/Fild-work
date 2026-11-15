"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow, Icon, PillButton, Reveal } from "./ui";

const faqs = [
  {
    q: "How quickly can we get started?",
    a: "Usually within 5 business days of your discovery call. We'll send a written proposal within 48 hours, and your first deliverables land at the end of week one.",
  },
  {
    q: "Do you work with early-stage startups or only established companies?",
    a: "Both. Around half our clients are pre-seed to Series A founders validating product-market fit; the rest are growth-stage SaaS teams scaling their product and design system. Our Sprint plan is built specifically for early-stage teams.",
  },
  {
    q: "What does “unlimited requests” actually mean?",
    a: "Add as many requests to your board as you like — we work through them one at a time (two on Scale), delivering every few days. Most tasks are turned around in 2–4 business days.",
  },
  {
    q: "Will you work with our existing engineering team?",
    a: "Absolutely — that's the point. We join your Slack, Linear or Jira, attend key rituals, and hand off annotated, component-based Figma files. We also offer QA reviews before release so nothing gets lost in translation.",
  },
  {
    q: "Who owns the design files and IP?",
    a: "You do, 100%, from day one. All work lives in your Figma workspace and you retain full ownership of every file, asset and component.",
  },
  {
    q: "What if we're not happy with the work?",
    a: "We revise until you are. And if after your first two weeks it isn't the right fit, we'll refund 50% of your first payment — no awkward conversations.",
  },
  {
    q: "Can we pause or cancel our subscription?",
    a: "Yes. Pause anytime and your unused days roll over. Cancel with no notice period and no long-term contracts.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:px-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="faq-title" className="mt-5 text-4xl font-normal tracking-[-0.03em] sm:text-5xl">
              Questions, answered.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 max-w-sm text-ink/60">
              Can't find what you're looking for? Our founders reply personally — usually within a
              few hours.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-8 flex flex-wrap gap-3">
              <PillButton href="#contact" variant="dark">
                Ask us anything
              </PillButton>
              <a
                href="mailto:hello@fieldwork.studio"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-sm transition hover:border-ink"
              >
                <Icon name="mail" className="h-4 w-4" /> hello@fieldwork.studio
              </a>
            </div>
          </Reveal>
        </div>

        <ul className="border-t border-ink/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={f.q} delay={i * 60} className="border-b border-ink/10">
                <h3>
                  <button
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className={cn("text-lg tracking-tight transition-colors sm:text-xl", isOpen ? "text-ink" : "text-ink/80 group-hover:text-ink")}>
                      {f.q}
                    </span>
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500",
                        isOpen ? "rotate-45 border-lime bg-lime" : "border-ink/15 group-hover:border-ink"
                      )}
                    >
                      <Icon name="plus" className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-6 pr-12 leading-relaxed text-ink/60">{f.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
