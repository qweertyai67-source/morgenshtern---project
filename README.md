# MORGENSHTERN — artist website concept

Independent Next.js concept for an artist hub: releases, official embeds, tour dates, an optional Sanity Studio, audience forms, and analytics hooks.

## Local development

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The `/studio` page links to a separately deployed Sanity Studio when `NEXT_PUBLIC_SANITY_STUDIO_URL` is configured.

## Sanity Studio

The editor lives in its own `studio/` package so Sanity's CLI and administration dependencies never enter the public website bundle.

```bash
cd studio
npm install
copy .env.example .env.local
npm run dev
```

The site uses fallback content until `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are configured. Deploy the editor separately with `npm run deploy`, then place its URL in the website environment as `NEXT_PUBLIC_SANITY_STUDIO_URL`.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Integrations

- Sanity: releases, events, gallery, and site settings through the separate Studio package
- Formspree: contact endpoint
- Brevo: newsletter subscriptions
- Supabase: structured city-demand requests (`supabase/schema.sql`)
- Plausible: privacy-oriented conversion events

All integrations are disabled safely until their variables from `.env.example` are supplied. Never commit `.env.local`.

This repository is an independent concept and is not an official MORGENSHTERN website.
