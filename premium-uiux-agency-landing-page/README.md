# Fieldwork — preview & deployable project

This workspace contains **two things**:

| Folder     | Purpose                                                                 |
| ---------- | ----------------------------------------------------------------------- |
| `/`        | Vite + React live preview of the finished design (all assets inlined).   |
| `/nextjs`  | The production Next.js (App Router) project — this is what you deploy.  |

## Deploy

The ready-to-upload project is `/nextjs`. It includes `package.json`, `package-lock.json`,
TypeScript and Next configs, `.env.example`, API route handlers, local images and a full README.

```bash
cd nextjs
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

On Vercel: import the repository, keep the framework preset **Next.js**, and (optionally) add the
environment variables documented in `nextjs/.env.example`.

## Preview app (this folder)

```bash
npm install
npm run dev      # Vite dev server
npm run build    # emits dist/index.html
```

The preview form simulates a booking. Set `VITE_BOOKING_ENDPOINT` (see `.env.example`) to the
deployed Next.js `/api/booking` URL to test real submissions end-to-end.
