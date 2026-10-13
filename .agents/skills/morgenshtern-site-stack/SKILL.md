---
name: morgenshtern-site-stack
description: Build and maintain this artist website across its frontend, media embeds, Sanity content, audience forms, analytics, and GitHub-to-Vercel delivery. Use for implementation, integration, architecture, or deployment work in this repository.
---

# Artist Site Stack

Use the existing repository choices first. For a new implementation, prefer this baseline:

- Next.js App Router with TypeScript;
- Tailwind CSS for responsive styling and design tokens;
- Motion for React for ordinary transitions and interaction animation;
- Sanity for editorial content and the artist-facing Studio;
- Formspree for the contact form, Brevo for newsletter signup, and Supabase for structured city-demand submissions;
- Plausible for privacy-oriented traffic and conversion events;
- GitHub connected to Vercel for preview and production deployments.

Astro is a valid alternative when the site is overwhelmingly static. Use GSAP only for animation sequences that Motion cannot express cleanly. Tally and MailerLite are alternatives, not parallel dependencies. Do not replace an established provider without an explicit request or a concrete migration reason.

## Working rules

1. Inspect the current package manifest, framework configuration, environment examples, and existing architecture before changing dependencies.
2. Keep public presentation fast: render media embeds lazily, reserve their aspect ratio, provide accessible titles, and avoid autoplay with sound.
3. Keep secrets server-side. Commit only `.env.example`; never commit real tokens, service-role keys, form endpoints intended to stay private, or Sanity write tokens.
4. Model artist-managed data in Sanity. Store transactional submissions such as city requests in Supabase unless the repository already uses another approved destination.
5. Track meaningful outcomes rather than every click. Use stable Plausible event names and never send email addresses, free-text messages, or other personal data as analytics properties.
6. Treat external mutations as gated actions: prepare code freely, but require user authorization before creating external projects, linking accounts, pushing a repository, or deploying production.
7. Verify proportionally: run lint and type checks, test responsive layouts and keyboard interaction, and confirm production builds before deployment.

## Task routing

- Read [references/frontend.md](references/frontend.md) for framework, styling, animation, or media embed work.
- Read [references/content.md](references/content.md) for Sanity schemas, Studio, previews, or editorial content.
- Read [references/audience.md](references/audience.md) for forms, newsletters, city requests, or analytics.
- Read [references/deployment.md](references/deployment.md) for GitHub, environment variables, previews, domains, or Vercel releases.
