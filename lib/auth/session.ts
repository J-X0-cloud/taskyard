import { createHmac, timingSafeEqual } from "node:crypto";

import type { Session, WorkspaceRole } from "./types";

export const SESSION_COOKIE = "ty_session";

/** Guests get short sessions; team members stay signed in for a working week. */
const SESSION_TTL_SECONDS: Record<WorkspaceRole, number> = {
  owner: 5 * 24 * 3600,
  admin: 5 * 24 * 3600,
  member: 5 * 24 * 3600,
  guest: 12 * 3600,
};

export function sessionTtl(role: WorkspaceRole): number {
  return SESSION_TTL_SECONDS[role];
}

function secret(): string {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("SESSION_SECRET must be at least 32 characters");
  return value;
}

const sign = (payload: string) =>
  createHmac("sha256", secret()).update(payload).digest("base64url");

export function issueSession(
  input: Omit<Session, "issuedAt" | "expiresAt">,
  now = Math.floor(Date.now() / 1000),
): { token: string; session: Session } {
  const session: Session = { ...input, issuedAt: now, expiresAt: now + sessionTtl(input.role) };
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return { token: `${payload}.${sign(payload)}`, session };
}

/** Returns the session for a valid, unexpired token, otherwise null. Never throws on bad input. */
export function readSession(
  token: string | undefined,
  now = Math.floor(Date.now() / 1000),
): Session | null {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = Buffer.from(sign(payload));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as Session;
    return session.expiresAt > now ? session : null;
  } catch {
    return null;
  }
}

/** Studios can require two-factor for everyone; guests are held to the same policy. */
export function satisfiesMfaPolicy(session: Session, workspaceRequiresMfa: boolean): boolean {
  return !workspaceRequiresMfa || session.mfa;
}

export function sessionFromRequest(request: Request): Session | null {
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`));
  return readSession(match?.[1]);
}
