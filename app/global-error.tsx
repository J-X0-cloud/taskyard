"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

import "./globals.css";

/** Last-resort boundary for errors in the root layout. Reports to Sentry, then offers a retry. */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-white font-sans text-text antialiased">
        <main className="ty-hero ty-wrap">
          <span className="ty-eyebrow">Something went wrong</span>
          <h1 className="text-h2" style={{ marginTop: 20 }}>
            We hit an error loading this page.
          </h1>
          <p className="ty-lead text-h5">
            Our on-call engineer has been notified
            {error.digest ? ` (reference ${error.digest})` : ""}.
          </p>
          <div className="ty-ctas">
            <button type="button" className="ty-btn ty-btn--primary" onClick={reset}>
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
