# Audience forms and analytics

## Provider boundaries

- Contact form: default to Formspree. Use Tally when the desired form should be managed visually outside the codebase.
- Newsletter: default to Brevo. Use MailerLite only when the account or campaign workflow is already established there.
- "I want a concert in my city": store structured submissions in Supabase so demand can be grouped and counted. Sanity is acceptable only when the team explicitly wants these records handled as editorial documents.
- Analytics: use Plausible for page views, outbound links, form completion, newsletter signup, ticket clicks, and play intent.

## Data and abuse controls

- Collect only what the feature needs. City requests normally need city or country and an optional contact or consent flag, not a free-form personal profile.
- Validate on both client and server where a server boundary exists.
- Add honeypot, provider spam protection, throttling, or database constraints appropriate to the endpoint.
- Show explicit success and failure states and preserve entered values after recoverable failures.
- Do not expose Supabase service-role credentials to the browser. Apply Row Level Security before accepting public inserts.
- Separate newsletter consent from unrelated contact-form consent and link the privacy notice near submission controls.

## Plausible event convention

Use readable stable names such as `Contact Submitted`, `Newsletter Signup`, `City Request Submitted`, `Ticket Click`, and `Release Play`. Keep properties low-cardinality and non-personal, for example platform, release slug, event city slug, or CTA location.

Source documentation:

- Formspree: https://formspree.io/docs/
- Tally: https://tally.so/help
- Brevo: https://developers.brevo.com/
- MailerLite: https://developers.mailerlite.com/docs/
- Supabase: https://supabase.com/docs
- Plausible: https://plausible.io/docs
