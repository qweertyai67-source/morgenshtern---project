# Sanity content model

Use Sanity for content the artist or manager should edit without a code release. Keep schema names stable once production data exists.

Recommended document types:

- `siteSettings`: artist name, navigation, social links, SEO defaults, and contact destinations;
- `release`: title, slug, date, cover, description, platform links, tracks, credits, and featured state;
- `event`: city, venue, start time, ticket URL, status, and optional poster;
- `galleryItem`: image or video, caption, credit, alt text, date, and ordering metadata;
- `announcement`: title, body, publish window, call to action, and priority.

Use Sanity image assets for editorial imagery and keep large audio or video on their specialized platforms. Add validation for required dates, URLs, alt text, and mutually exclusive event states. Use preview configuration so editors can distinguish entries quickly.

Prefer a Studio workspace in the same repository when shared types and one deployment workflow matter. A separately deployed Studio is acceptable when access or release cadence needs to be isolated.

Use read-only public queries without a secret token where the dataset permits it. Keep preview and mutation credentials server-side. Document required variables in `.env.example`.

Source documentation:

- Studio: https://www.sanity.io/docs/studio
- Next.js integration: https://www.sanity.io/docs/next-js-quickstart
- Astro integration: https://www.sanity.io/docs/astro-quickstart
