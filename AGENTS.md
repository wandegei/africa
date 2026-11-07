# Project guidance

- Preserve the existing visual design, page content and responsive behavior unless the task explicitly changes them.
- This project uses React 19, JavaScript, TanStack Start, TanStack Router and Cloudflare's Vite plugin.
- Keep server-only secrets and privileged operations on the server.
- Supabase is not configured yet. Do not add fake credentials or claim that database writes work until a real project and secure policies are configured.
- Before implementing Supabase writes, define and test Row Level Security policies. Never expose a service-role key to the browser.
- Keep static content in `src/data/` unless a feature needs dynamic backend data.
