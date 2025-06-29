import { issueSession } from "@/lib/auth/session";
import type { Session, WorkspaceRole } from "@/lib/auth/types";
import { WORKSPACE_ID } from "@/lib/data/sandbox";

export function makeSession(
  userId: string,
  role: WorkspaceRole,
  overrides: Partial<Session> = {},
): Session {
  return {
    userId,
    role,
    workspaceId: WORKSPACE_ID,
    mfa: true,
    issuedAt: 1_760_000_000,
    expiresAt: 1_760_000_000 + 3600,
    ...overrides,
  };
}

/** A Request carrying a real signed session cookie, as the browser would send it. */
export function authedRequest(
  url: string,
  userId: string,
  role: WorkspaceRole,
  init: RequestInit = {},
): Request {
  const { token } = issueSession({ userId, role, workspaceId: WORKSPACE_ID, mfa: true });
  const headers = new Headers(init.headers);
  headers.set("cookie", `ty_session=${token}`);
  return new Request(new URL(url, "http://localhost:3000"), { ...init, headers });
}
