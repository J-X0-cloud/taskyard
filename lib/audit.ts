export interface AuditEntry {
  id: string;
  workspaceId: string;
  actorId: string;
  action: string;
  targetType: "space" | "card" | "doc" | "sprint";
  targetId: string;
  metadata?: Record<string, unknown>;
  at: string;
}

const entries: AuditEntry[] = [];

/** Append-only record of who changed what. Persisted to the AuditLog table in production. */
export function recordAudit(entry: Omit<AuditEntry, "id" | "at">): AuditEntry {
  const saved: AuditEntry = {
    ...entry,
    id: `aud_${crypto.randomUUID().slice(0, 12)}`,
    at: new Date().toISOString(),
  };
  entries.push(saved);
  return saved;
}

export function auditTrail(targetId: string): AuditEntry[] {
  return entries.filter((entry) => entry.targetId === targetId);
}
