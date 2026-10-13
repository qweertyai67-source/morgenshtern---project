# GitHub and Vercel delivery

Keep the repository deployable from a clean checkout. Pin the package manager through the project manifest, commit its lockfile, and make the production build independent of local-only files.

Expected workflow:

1. Run local lint, type checks, tests where present, and a production build.
2. Push a feature branch to GitHub.
3. Use the Vercel preview deployment for visual and integration checks.
4. Merge through the designated production branch only after checks pass.
5. Keep Production, Preview, and Development environment values separated in Vercel.

Never print or commit environment values. Maintain `.env.example` with names and safe comments only. If Sanity webhooks or revalidation secrets are added, verify signatures or shared secrets at the server boundary.

Do not create a GitHub repository, connect Vercel, change DNS, or deploy production without user authorization. When those actions are authorized, report the resulting repository or deployment URL and any remaining manual account steps.

Source documentation:

- Vercel Git deployments: https://vercel.com/docs/git
- Vercel environment variables: https://vercel.com/docs/environment-variables
- GitHub Actions: https://docs.github.com/actions
