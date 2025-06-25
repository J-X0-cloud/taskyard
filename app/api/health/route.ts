import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/** Polled by the public status page and the uptime monitor. */
export async function GET() {
  const startedAt = performance.now();
  const release = process.env.NEXT_PUBLIC_RELEASE ?? "dev";
  try {
    await db.$queryRaw`SELECT 1`;
    return Response.json({
      status: "ok",
      release,
      database: { status: "ok", latencyMs: Math.round(performance.now() - startedAt) },
    });
  } catch {
    return Response.json(
      { status: "degraded", release, database: { status: "unreachable" } },
      { status: 503 },
    );
  }
}
