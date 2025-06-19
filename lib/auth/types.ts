/** Workspace-level role. Owners, admins and members hold paid seats; guests are clients. */
export type WorkspaceRole = "owner" | "admin" | "member" | "guest";

/** Role a person holds inside one space. */
export type SpaceRole = "editor" | "commenter" | "viewer";

export type SpaceVisibility = "studio" | "private";

export type Action =
  | "space:view"
  | "space:manage"
  | "card:comment"
  | "card:edit"
  | "card:approve"
  | "time:view"
  | "doc:edit";

export interface Session {
  userId: string;
  workspaceId: string;
  role: WorkspaceRole;
  /** True once the user has completed a second factor in this session. */
  mfa: boolean;
  /** Unix seconds. */
  issuedAt: number;
  expiresAt: number;
}

export interface SpaceAccessRecord {
  id: string;
  workspaceId: string;
  visibility: SpaceVisibility;
  /** Explicit memberships: private-space members and every invited guest. */
  members: Record<string, SpaceRole>;
}
