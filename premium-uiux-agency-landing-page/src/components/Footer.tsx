import { useCallback, useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { cn } from "@/utils/cn";
import { Icon, LogoMark } from "./ui";
import { footerCols, legalCopy, type FooterLink } from "./Footer.data";

const socials = [
  { n: "x", l: "X (Twitter)", href: "https://x.com" },
  { n: "linkedin", l: "LinkedIn", href: "https://www.linkedin.com" },
  { n: "dribbble", l: "Dribbble", href: "https://dribbble.com" },
  { n: "instagram", l: "Instagram", href: "https://www.instagram.com" },
];

function StudioClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () =>
      setT(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Lisbon",
        })
      );
    f();
    const i = setInterval(f, 30_000);
    return () => clearInterval(i);
  }, []);
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink/55">
      <span className="pulse-ring relative h-1.5 w-1.5 rounded-full bg-lime text-lime" aria-hidden />
      Lisbon {t || "--:--"} · Open for Q3 projects
    </span>
  );
}

function InfoDialog({
  id,
  onClose,
}: {
  id: string | null;
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const content = id ? legalCopy[id] : null;

  useEffect(() => {
    if (!id) return;
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const nodes = panel.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
        );
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [id, onClose]);

  if (!id || !content) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-3 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/60 backdrop-blur-sm"
        tabIndex={-1}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="info-title"
        tabIndex={-1}
        className="fade-up relative w-full max-w-xl rounded-3xl bg-paper p-6 shadow-2xl outline-none sm:p-8"
      >
        <div className="flex items-start justify-between gap-6">
          <h2 id="info-title" className="text-2xl font-normal tracking-tight sm:text-3xl">
            {content.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/15 transition hover:bg-ink hover:text-white"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-5 max-h-[60vh] space-y-3 overflow-y-auto pr-1 text-sm leading-relaxed text-ink/70">
          {content.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <a
          href="mailto:hello@fieldwork.studio"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-white transition hover:bg-ink-2"
        >
          hello@fieldwork.studio <Icon name="arrow-up-right" className="h-3.5 w-3.5 text-lime" />
        </a>
      </div>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [dialog, setDialog] = useState<string | null>(null);
  const closeDialog = useCallback(() => setDialog(null), []);

  const sub = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address");
      return;
    }
    setError("");
    setDone(true);
  };

  const newsletter = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("news")?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => document.getElementById("news")?.focus({ preventScroll: true }), 550);
  };

  const renderLink = (l: FooterLink) => {
    if (l.href === "#news") {
      return (
        <a href="#news" onClick={newsletter} className="group inline-flex items-center gap-1 text-sm text-ink/75 transition hover:text-ink">
          {l.label}
        </a>
      );
    }
    return (
      <a
        href={l.href}
        onClick={
          l.kind === "info"
            ? (e) => {
                e.preventDefault();
                setDialog(l.href);
              }
            : undefined
        }
        className="group inline-flex items-center gap-1 text-sm text-ink/75 transition hover:text-ink"
      >
        <span className="bg-gradient-to-r from-ink to-ink bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
          {l.label}
        </span>
      </a>
    );
  };

  return (
    <footer className="pb-8 pt-20 sm:pt-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5" aria-label="Fieldwork home">
              <LogoMark className="h-8 w-8" />
              <span className="text-xl font-medium tracking-tight">
                Fieldwork<span className="text-moss">.</span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink/60">
              A senior UI/UX studio helping startups and SaaS teams design products that grow.
            </p>
            <form onSubmit={sub} className="mt-8 max-w-sm" noValidate>
              <label htmlFor="news" className="text-xs font-medium">
                The Fieldnotes — one sharp UX insight, every other Tuesday.
              </label>
              <div
                className={cn(
                  "mt-3 flex items-center gap-1 rounded-full border bg-white p-1 focus-within:ring-2 focus-within:ring-lime",
                  error ? "border-red-500/60" : "border-ink/15"
                )}
              >
                <input
                  id="news"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder={done ? "You're subscribed" : "you@company.com"}
                  disabled={done}
                  aria-invalid={!!error}
                  aria-describedby={error ? "news-err" : undefined}
                  className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-ink/40"
                />
                <button
                  type="submit"
                  disabled={done}
                  aria-label={done ? "Subscribed" : "Subscribe to the newsletter"}
                  className="grid h-9 w-9 place-items-center rounded-full bg-ink text-white transition hover:bg-lime hover:text-ink disabled:bg-lime disabled:text-ink"
                >
                  <Icon name={done ? "check" : "arrow-right"} className="h-4 w-4" />
                </button>
              </div>
              {error && (
                <p id="news-err" role="alert" className="mt-2 text-xs text-red-600">
                  {error}
                </p>
              )}
              {done && (
                <p role="status" className="mt-2 text-xs text-ink/55">
                  Thanks — check your inbox to confirm.
                </p>
              )}
            </form>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerCols.map((c) => (
              <div key={c.heading}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45">{c.heading}</h3>
                <ul className="mt-5 space-y-3">
                  {c.links.map((l) => (
                    <li key={l.label}>{renderLink(l)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-20 select-none overflow-hidden" aria-hidden>
          <p className="bg-gradient-to-b from-ink/90 to-ink/10 bg-clip-text text-center text-[22vw] font-medium leading-[0.8] tracking-[-0.06em] text-transparent lg:text-[240px]">
            Fieldwork
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-5 border-t border-ink/10 pt-6 sm:flex-row">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-ink/50">
              © {new Date().getFullYear()} Fieldwork Studio Ltd. Designed with intent in Lisbon & London.
            </p>
            <StudioClock />
          </div>
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.n}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.l}
                className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 text-ink/70 transition hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-lime"
              >
                <Icon name={s.n} className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="flex gap-5 text-xs text-ink/50">
            <button type="button" onClick={() => setDialog("privacy")} className="hover:text-ink">
              Privacy
            </button>
            <button type="button" onClick={() => setDialog("terms")} className="hover:text-ink">
              Terms
            </button>
          </div>
        </div>
      </div>

      <InfoDialog id={dialog} onClose={closeDialog} />
    </footer>
  );
}
