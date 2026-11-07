# Africa Compliance

A React 19 application built with TanStack Start, TanStack Router and Cloudflare's Vite plugin. The project is currently detached from Base44. Supabase will be added in a later migration phase.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Project structure

- `src/routes/` — file-based application routes.
- `src/components/` — page and shared UI components.
- `src/data/` — current static site content.
- `src/server.js` — TanStack Start server entry.
- `wrangler.jsonc` — Cloudflare Worker configuration.

## Backend status

Base44 SDK, Vite plugin, authentication middleware, server gateway integration and Base44 entity configuration have been removed. Contact form submissions temporarily open a prefilled email draft to the configured contact address; they are not stored in a database until Supabase is configured. See `docs/backend-migration-notes.md` for the data model and security requirements to recreate in Supabase.

## Environment variables

No backend environment variables are currently required. When Supabase is added, only the Supabase project URL and publishable key should be exposed to the browser. Never place a Supabase secret/service-role key in a `VITE_` variable or client-side code.
