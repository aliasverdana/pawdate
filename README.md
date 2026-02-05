# Pawdate Stockholm

Find compatible dog playdates in Stockholm.

## Stack

- Next.js (App Router) + TypeScript
- Radix UI Themes

## Local dev

1) Configure env

```bash
cp .env.local.example .env.local
```

Fill in at least:
- `DATABASE_URL`
- `AUTH_JWT_SECRET`
- `RESEND_API_KEY` (optional in dev; links will be logged if missing)

2) Install + migrate + run

```bash
npm install
npx prisma migrate dev
npm run dev
```

## Auth (magic link)

Backend endpoints:
- `POST /api/auth/magic-link` → `{ email, redirectTo? }` (creates a short-lived token and emails a sign-in link)
- `GET /api/auth/verify?token=...&redirectTo=/...` (consumes token, sets `pawdate_session` cookie)
- `POST /api/auth/logout`
- `GET /api/me`

## Roadmap (v0)

- Dog profiles (name, size, energy, play style, neighborhood)
- Browse and filters
- Playdate requests (request, accept, decline)
- Safety basics (block, report)
