import { CornerDots, Eyebrow, Icon, Reveal, spotlightMove } from "./ui";

const services = [
  {
    icon: "search",
    title: "UX Research & Strategy",
    desc: "User interviews, funnel audits and competitive teardown that reveal exactly where you're leaking revenue.",
    tags: ["Audits", "Interviews", "JTBD"],
  },
  {
    icon: "grid",
    title: "SaaS Product Design",
    desc: "End-to-end flows, dashboards and onboarding that make complex products feel effortless from day one.",
    tags: ["Web apps", "Dashboards", "Onboarding"],
  },
  {
    icon: "monitor",
    title: "Marketing Websites",
    desc: "High-converting landing pages and sites that tell your story clearly and turn traffic into pipeline.",
    tags: ["Landing pages", "Framer", "Webflow"],
  },
  {
    icon: "layers",
    title: "Design Systems",
    desc: "Scalable component libraries and tokens so your team ships consistent UI faster — without us.",
    tags: ["Tokens", "Figma", "Storybook"],
  },
  {
    icon: "sparkles",
    title: "Prototyping & Testing",
    desc: "Clickable, realistic prototypes validated with real users before a single line of code is written.",
    tags: ["Usability", "A/B", "Maze"],
  },
  {
    icon: "code",
    title: "Design-to-Dev Handoff",
    desc: "Annotated specs, dev-ready files and QA support so what ships matches what was designed. Pixel for pixel.",
    tags: ["Specs", "QA", "React"],
  },
];

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-paper-2 py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>What we do</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2
              id="services-title"
              className="mt-5 text-4xl font-normal tracking-[-0.03em] sm:text-5xl lg:text-6xl"
            >
              One studio. Every design lever.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-ink/60">
              Scattered freelancers leak momentum. Fieldwork brings research, product, brand and
              web design under one roof — so every screen moves a metric that matters.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16 grid border-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 90} className="relative">
              <article
                onMouseMove={spotlightMove}
                className="spotlight group relative flex h-full min-h-[300px] flex-col justify-between border border-ink/10 p-7 transition-colors duration-500 hover:bg-paper sm:-ml-px sm:-mt-px sm:p-8"
              >
                <CornerDots />
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-ink/10 bg-white text-ink transition-all duration-500 group-hover:-rotate-6 group-hover:bg-lime">
                    <Icon name={s.icon} />
                  </span>
                  <span className="font-mono text-[11px] text-ink/40">0{i + 1}</span>
                </div>
                <div className="mt-14">
                  <h3 className="text-xl font-medium tracking-tight">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/60">{s.desc}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-ink/10 bg-white/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink/60"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
