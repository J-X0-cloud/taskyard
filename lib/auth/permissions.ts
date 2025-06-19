import type { Action, Session, SpaceAccessRecord, SpaceRole } from "./types";

const SPACE_ROLE_ACTIONS: Record<SpaceRole, readonly Action[]> = {
  editor: ["space:view", "card:comment", "card:edit", "card:approve", "doc:edit"],
  commenter: ["space:view", "card:comment", "card:approve"],
  viewer: ["space:view"],
};

/** Everything a seated team member can do in a space they can see. */
const TEAM_ACTIONS: readonly Action[] = [
  "space:view",
  "card:comment",
  "card:edit",
  "card:approve",
  "time:view",
  "doc:edit",
];

/**
 * The single authority for space access. Rules, in order:
 *
 * 1. Nothing crosses workspaces.
 * 2. Guests only reach spaces they were explicitly invited to, and never see internal
 *    time or hours — regardless of the role they were given.
 * 3. Team members see every studio-visible space; private spaces need an explicit membership.
 * 4. Owners and admins can manage any space in their workspace, private ones included.
 */
export function can(session: Session, action: Action, space: SpaceAccessRecord): boolean {
  if (session.workspaceId !== space.workspaceId) return false;

  if (session.role === "guest") {
    const membership = space.members[session.userId];
    if (!membership || action === "time:view" || action === "space:manage") return false;
    return SPACE_ROLE_ACTIONS[membership].includes(action);
  }

  if (session.role === "owner" || session.role === "admin") return true;

  const explicit = space.members[session.userId];
  if (space.visibility === "private" && !explicit) return false;
  if (action === "space:manage") return false;
  return explicit
    ? [...SPACE_ROLE_ACTIONS[explicit], "time:view"].includes(action)
    : TEAM_ACTIONS.includes(action);
}

/** Spaces a session may list. Private and uninvited spaces are omitted, not redacted. */
export function visibleSpaces<T extends SpaceAccessRecord>(session: Session, spaces: T[]): T[] {
  return spaces.filter((space) => can(session, "space:view", space));
}

export class ForbiddenError extends Error {
  constructor(readonly action: Action) {
    super(`Not allowed: ${action}`);
    this.name = "ForbiddenError";
  }
}

export function assertCan(session: Session, action: Action, space: SpaceAccessRecord): void {
  if (!can(session, action, space)) throw new ForbiddenError(action);
}
