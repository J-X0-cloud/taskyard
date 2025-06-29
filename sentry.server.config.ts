import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT ?? process.env.NODE_ENV,
  release: process.env.NEXT_PUBLIC_RELEASE,
  enabled: process.env.NODE_ENV === "production",
  // Every request is traced in staging; production samples to keep volume predictable.
  tracesSampleRate: process.env.SENTRY_ENVIRONMENT === "staging" ? 1 : 0.1,
  // Client names and emails live in request bodies; never attach them to events.
  sendDefaultPii: false,
  ignoreErrors: ["NEXT_NOT_FOUND", "NEXT_REDIRECT"],
});
