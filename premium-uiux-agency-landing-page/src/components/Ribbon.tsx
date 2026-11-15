import { Icon } from "./ui";
import { cn } from "@/utils/cn";

const phrases = ["Book a discovery call", "Lift your metrics", "Ship every week", "Design people love"];

function Strip({ tone }: { tone: "lime" | "ink" }) {
  const row = Array(6).fill(phrases).flat();
  const doubled = [...row, ...row];
  return (
    <div
      aria-hidden
      className={cn("marquee-wrap w-[112%] -ml-[6%] overflow-hidden py-4 sm:py-6", tone === "lime" ? "rotate-[1.6deg] bg-lime text-ink" : "-rotate-[1.8deg] glass-dark text-white")}
    >
      <ul className={cn("marquee flex w-max items-center gap-10 pr-10", tone === "lime" ? "[animation-duration:34s]" : "[animation-duration:40s] [animation-direction:reverse]")}>
        {doubled.map((p, i) => (
          <li key={i} className="flex items-center gap-10">
            <span
              className={cn(
                "whitespace-nowrap text-2xl font-medium tracking-[-0.02em] sm:text-4xl",
                i % 2 === 1 && (tone === "lime" ? "text-outline-ink" : "text-outline")
              )}
            >
              {p}
            </span>
            <Icon name="asterisk" className="spin-slow h-6 w-6 shrink-0 opacity-80 sm:h-8 sm:w-8" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Ribbon() {
  return (
    <section aria-label="Book a call" className="relative overflow-hidden py-10">
      <span className="sr-only">Book a free discovery call with Fieldwork</span>
      <Strip tone="ink" />
      <div className="-mt-6 sm:-mt-9">
        <Strip tone="lime" />
      </div>
    </section>
  );
}
