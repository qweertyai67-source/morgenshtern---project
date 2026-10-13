# Morgenshtern artist website

Use the repo-scoped `morgenshtern-site-stack` skill for frontend, CMS, audience integrations, analytics, and deployment work in this project.

Ignore `.codex/skills/artist-site-stack` if that bootstrap scaffold is present; the maintained skill is `.agents/skills/morgenshtern-site-stack`.

For a new implementation, the preferred baseline is Next.js with TypeScript, Tailwind CSS, Motion for React, Sanity, Formspree, Brevo, Supabase, Plausible, GitHub, and Vercel. Preserve existing choices once the application is initialized; do not add competing providers without a clear requirement.

Never commit secrets. Keep third-party credentials in environment variables and document only their names in `.env.example`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
