# Fieldwork — UI/UX Studio Landing Page

A premium, conversion-focused landing page for a UI/UX design studio serving startup founders,
SaaS companies and growing businesses. Built with **Next.js (App Router)**, **React 19**,
**TypeScript** and **Tailwind CSS v4**.

The design, copy, imagery, animations and page structure are preserved exactly as designed.

---

## Tech stack

| Layer     | Choice                                       |
| --------- | -------------------------------------------- |
| Framework | Next.js 15 (App Router, Server Components)   |
| UI        | React 19 + TypeScript (strict)               |
| Styling   | Tailwind CSS v4 + a small custom CSS layer   |
| Backend   | Next.js Route Handlers (`/app/api/*`)        |
| Email     | Optional Resend REST API (no extra packages) |
| Deploy    | Vercel (zero-config) or any Node host        |

No UI framework, animation library or ORM is required — all motion is CSS + a few small hooks.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # optional; the site runs without it
npm run dev                    # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

Type checking:

```bash
npm run typecheck
```

**Requirements:** Node.js 18.18+ (Node 20 LTS recommended) and npm 9+.

---

## Environment variables

All variables are optional — the site and APIs work without them.

| Variable                 | Purpose                                                    |
| ------------------------ | ---------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`   | Canonical URL for metadata, Open Graph, sitemap and robots |
| `RESEND_API_KEY`         | Enables email notifications for bookings & newsletter      |
| `BOOKING_TO_EMAIL`       | Inbox that receives discovery-call requests                |
| `NEWSLETTER_TO_EMAIL`    | Inbox that receives newsletter signups                     |
| `BOOKING_FROM_EMAIL`     | Verified Resend sender, e.g. `Fieldwork <hi@yourdomain>`   |

Without `RESEND_API_KEY` + a recipient address, both API routes still validate input,
rate-limit abusive clients, and log the payload server-side — so nothing breaks in preview.

---

## API

| Route              | Method | Body                                                                                       | Responses                              |
| ------------------ | ------ | ------------------------------------------------------------------------------------------ | -------------------------------------- |
| `/api/booking`     | POST   | `{ name, email, company?, needs[], budget, date, time, timezone }`                          | `201 {ok, bookingId}`, `422`, `429`    |
| `/api/newsletter`  | POST   | `{ email }`                                                                                 | `201 {ok}`, `422`, `429`               |

Both routes validate and normalise input, cap string lengths, escape HTML in emails, and apply
a lightweight per-IP rate limit (5 requests/minute). They use the Node.js runtime.

> The contact form only shows its success screen after the API returns a success status. If the
> request fails, an inline error message with a direct email fallback is displayed.

---

## Project structure

```
├── app/
│   ├── api/booking/route.ts       # Discovery-call endpoint
│   ├── api/newsletter/route.ts    # Newsletter endpoint
│   ├── globals.css                # Tailwind v4 theme + custom animation layer
│   ├── layout.tsx                 # Fonts, metadata, viewport, icons
│   ├── page.tsx                   # Landing page composition
│   ├── robots.ts                  # /robots.txt
│   └── sitemap.ts                 # /sitemap.xml
├── components/
│   ├── Navbar.tsx                 # Sticky nav, scroll progress, mobile menu
│   ├── Hero.tsx                   # Cinematic hero + parallax
│   ├── Proof.tsx                  # Logo marquee + about/stats
│   ├── Services.tsx               # Service grid
│   ├── BeforeAfter.tsx            # Draggable redesign comparison
│   ├── Showcase.tsx               # Interactive case studies
│   ├── Benefits.tsx               # Benefits + workflow diagram + process
│   ├── Testimonials.tsx           # Carousel + quote cards
│   ├── Pricing.tsx                # Plans + billing toggle
│   ├── FAQ.tsx                    # Accessible accordion
│   ├── Ribbon.tsx                 # Animated CTA ribbons
│   ├── Contact.tsx                # Booking form
│   ├── Footer.tsx                 # Newsletter + info dialogs
│   ├── Preloader.tsx              # Branded loading screen
│   ├── Chrome.tsx                 # Cursor glow + mobile CTA
│   ├── ui.tsx                     # Shared primitives & icons
│   └── Footer.data.ts             # Footer destinations & policy copy
├── lib/cn.ts                      # clsx + tailwind-merge helper
├── public/images/                 # Optimised local imagery (inlined in the original design)
├── .env.example
├── next.config.ts
└── package.json
```

---

## Accessibility & UX

- Semantic landmarks, one `<h1>`, and a visible “Skip to content” link.
- Full keyboard support: focus-visible rings, Escape closes the mobile menu/dialogs,
  arrow-key navigation for case-study tabs, focus trap in the info dialog.
- Accessible names for icon-only controls; `aria-expanded`, `aria-pressed`, `aria-selected`,
  `aria-live` and `role="alert"` used where appropriate.
- All motion (preloader, marquee, glow, tilt, reveals) respects `prefers-reduced-motion`.
- Form validation announces errors inline and moves focus to the first invalid field.
- Mobile-first layout with fluid breakpoints at 360 px, 390 px, 640 px, 768 px, 1024 px, 1280 px and 1536 px. Cursor/tilt effects are automatically disabled on touch devices.

---

## Deploy to Vercel

1. Create a new GitHub repository and push this folder:
   ```bash
   git init
   git add .
   git commit -m "feat: Fieldwork landing page"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. In Vercel: **Add New → Project → Import** the repository.
3. Framework preset **Next.js** is detected automatically. Build command `next build`,
   output is handled by Vercel — no extra configuration needed.
4. (Optional) Add environment variables from `.env.example` under **Settings → Environment Variables**,
   including `NEXT_PUBLIC_SITE_URL` set to your production domain.
5. Deploy. Add your custom domain under **Settings → Domains** when ready.

`package-lock.json` is committed, so `npm install` / Vercel installs are reproducible.

---

## Content that should be replaced before launch

The design is production-ready; these business details are illustrative:

- Studio name, email (`hello@fieldwork.studio`), social URLs and locations.
- Client logos, case-study metrics, testimonials and team quotes.
- Pricing figures and plan inclusions.
- The availability strip (“2 spots open for Q3”) and booking slot availability.
- Optionally, connect a real scheduling provider (Calendly / Cal.com) by redirecting
  `/api/booking` or adding its URL to the success state.

---

## Verification performed

- `npm install` (locked, reproducible) — clean.
- `npm run build` — compiled successfully; 6 routes; homepage statically prerendered (137 kB first-load JS).
- `next start` smoke test — `/` 200, every local image 200 (hero, case studies, before/after, avatars), `/robots.txt` 200, `/sitemap.xml` 200.
- `POST /api/booking` — valid payload → `201 {ok:true, bookingId}`, invalid → `422` with field errors.
- `POST /api/newsletter` — valid → `201`, invalid → `422`.
- Clean-room test: ZIP extracted to an empty folder → `npm ci` → `npm run build` → production server + API smoke tests all pass.
- No TypeScript errors, no unresolved imports, no missing assets, no runtime dependencies on third-party image hosts.

---

© Fieldwork Studio. Design and code delivered as a complete, deployable project.
