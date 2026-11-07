import { createFileRoute } from "@tanstack/react-router";

// A small public server endpoint used for checking the server clock.
export const Route = createFileRoute("/api/time")({
  server: {
    handlers: {
      GET: async () => Response.json({ now: new Date().toISOString() }, { headers: { "cache-control": "no-store" } }),
    },
  },
});