// A fixed secret so signed session tokens are deterministic across test runs.
process.env.SESSION_SECRET = "test-secret-for-vitest-only-0123456789abcdef";
