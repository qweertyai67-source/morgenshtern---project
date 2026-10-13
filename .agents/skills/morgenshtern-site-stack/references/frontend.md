# Frontend and media

## Default choice

Use Next.js App Router and TypeScript for this project unless an existing scaffold or an explicit request selects Astro. Prefer Server Components for content-heavy sections and add Client Components only where browser state, embeds, or interaction requires them.

Use Tailwind CSS for layout, responsive behavior, typography, color tokens, and reduced-motion variants. Keep repeated visual primitives in reusable components instead of duplicating long class lists.

Use Motion for React for entrances, layout transitions, gestures, and small interactive effects. Consider GSAP only for complex timelines, pinned scroll scenes, or choreography that would otherwise become difficult to maintain. Respect `prefers-reduced-motion` in either system.

## Embeds

- YouTube: use the privacy-enhanced embed host when appropriate, load on intent or near viewport, and provide a poster or placeholder.
- Spotify, Apple Music, and SoundCloud: use each provider's supported embed URL, sandbox minimally where practical, and give every iframe a descriptive title.
- Do not copy third-party player code or expose undocumented tokens.
- Keep a stable aspect ratio to prevent layout shifts and provide an external-link fallback.

## Source documentation

- Next.js: https://nextjs.org/docs
- Astro: https://docs.astro.build/
- Tailwind CSS: https://tailwindcss.com/docs
- Motion for React: https://motion.dev/docs/react
- GSAP: https://gsap.com/docs/v3/
- YouTube embeds: https://developers.google.com/youtube/player_parameters
- Spotify embeds: https://developer.spotify.com/documentation/embeds
- Apple Music: https://tools.applemediaservices.com/apple-music
- SoundCloud embeds: https://developers.soundcloud.com/docs/api/html5-widget
