import { describe, expect, it } from "vitest";

import { issueSession, readSession, satisfiesMfaPolicy, sessionTtl } from "@/lib/auth/session";

const base = {
  userId: "usr_maya",
  workspaceId: "ws_brightfold",
  role: "member" as const,
  mfa: true,
};
const NOW = 1_760_000_000;

describe("session tokens", () => {
  it("round-trips a signed session", () => {
    const { token, session } = issueSession(base, NOW);
    expect(readSession(token, NOW + 60)).toEqual(session);
  });

  it("rejects a token whose payload was edited", () => {
    const { token } = issueSession({ ...base, role: "guest" }, NOW);
    const [payload, signature] = token.split(".");
    const forged = Buffer.from(
      Buffer.from(payload!, "base64url").toString().replace('"guest"', '"owner"'),
    ).toString("base64url");
    expect(readSession(`${forged}.${signature}`, NOW)).toBeNull();
  });

  it("rejects expired, empty and malformed tokens", () => {
    const { token } = issueSession(base, NOW);
    expect(readSession(token, NOW + sessionTtl("member") + 1)).toBeNull();
    expect(readSession(undefined)).toBeNull();
    expect(readSession("not-a-token")).toBeNull();
    expect(readSession("abc.def")).toBeNull();
  });

  it("gives guests a much shorter session than the team", () => {
    expect(sessionTtl("guest")).toBeLessThan(sessionTtl("member"));
    const { session } = issueSession({ ...base, role: "guest" }, NOW);
    expect(session.expiresAt - session.issuedAt).toBe(12 * 3600);
  });
});

describe("two-factor policy", () => {
  it("requires a second factor only when the studio enforces it", () => {
    const { session } = issueSession({ ...base, mfa: false }, NOW);
    expect(satisfiesMfaPolicy(session, false)).toBe(true);
    expect(satisfiesMfaPolicy(session, true)).toBe(false);
    expect(satisfiesMfaPolicy({ ...session, mfa: true }, true)).toBe(true);
  });
});
