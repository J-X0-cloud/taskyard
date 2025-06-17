import type { SpaceAccessRecord } from "@/lib/auth/types";
import type { CardStatus } from "@/lib/sprints/rollover";

/**
 * Sandbox workspace used by the API in development, the e2e suite and `prisma db seed`.
 * Brightfold Studio has four team members and two client guests.
 */

export const WORKSPACE_ID = "ws_brightfold";

export const users = [
  { id: "usr_dana", name: "Dana R.", email: "dana@brightfold.studio", role: "owner" },
  { id: "usr_maya", name: "Maya T.", email: "maya@brightfold.studio", role: "member" },
  { id: "usr_priya", name: "Priya N.", email: "priya@brightfold.studio", role: "member" },
  { id: "usr_jonah", name: "Jonah L.", email: "jonah@brightfold.studio", role: "member" },
  {
    id: "usr_juniper_guest",
    name: "Elena from Juniper",
    email: "elena@juniperbakehouse.com",
    role: "guest",
  },
  {
    id: "usr_halden_guest",
    name: "Sam from Halden",
    email: "sam@haldenoutdoor.com",
    role: "guest",
  },
] as const;

export interface SandboxSpace extends SpaceAccessRecord {
  name: string;
  color: string;
}

export const spaces: SandboxSpace[] = [
  {
    id: "spc_juniper",
    workspaceId: WORKSPACE_ID,
    name: "Juniper Bakehouse",
    color: "#1fa37a",
    visibility: "studio",
    members: { usr_juniper_guest: "commenter" },
  },
  {
    id: "spc_halden",
    workspaceId: WORKSPACE_ID,
    name: "Halden Outdoor",
    color: "#4f7cf0",
    visibility: "studio",
    members: { usr_halden_guest: "commenter" },
  },
  {
    id: "spc_mesa",
    workspaceId: WORKSPACE_ID,
    name: "Mesa Credit Union",
    color: "#f2705b",
    visibility: "private",
    members: { usr_priya: "editor", usr_jonah: "editor" },
  },
  {
    id: "spc_new_business",
    workspaceId: WORKSPACE_ID,
    name: "New business",
    color: "#e3a431",
    visibility: "private",
    members: { usr_dana: "editor" },
  },
];

export interface SandboxCard {
  id: string;
  spaceId: string;
  columnId: string;
  position: number;
  title: string;
  status: CardStatus;
  assigneeId: string;
  /** Internal only: never serialised for guests. */
  estimateHours: number;
  loggedHours: number;
}

const columns: Array<{ id: string; status: CardStatus }> = [
  { id: "brief", status: "todo" },
  { id: "in-progress", status: "in_progress" },
  { id: "client-review", status: "client_review" },
  { id: "approved", status: "done" },
];
const team = ["usr_dana", "usr_maya", "usr_priya", "usr_jonah"];

/**
 * The Juniper launch board: 60 cards per column, which is what used to freeze the old
 * board view when it loaded everything at once.
 */
export const cards: SandboxCard[] = columns.flatMap((column, columnIndex) =>
  Array.from({ length: 60 }, (_, index) => ({
    id: `crd_${column.id}_${String(index + 1).padStart(3, "0")}`,
    spaceId: "spc_juniper",
    columnId: column.id,
    position: (index + 1) * 1024,
    title: `${column.id === "approved" ? "Signed off" : "Launch task"} ${columnIndex + 1}.${index + 1}`,
    status: column.status,
    assigneeId: team[(index + columnIndex) % team.length]!,
    estimateHours: 2 + (index % 5),
    loggedHours: column.status === "todo" ? 0 : 1 + (index % 4),
  })),
);

export interface SandboxSprint {
  id: string;
  spaceId: string;
  number: number;
  endsAt: string;
  closedAt: string | null;
}

export const sprints: SandboxSprint[] = [
  {
    id: "spr_halden_18",
    spaceId: "spc_halden",
    number: 18,
    endsAt: "2026-10-03T23:59:59Z",
    closedAt: "2026-10-04T00:05:00Z",
  },
  {
    id: "spr_halden_19",
    spaceId: "spc_halden",
    number: 19,
    endsAt: "2026-10-17T23:59:59Z",
    closedAt: null,
  },
  {
    id: "spr_halden_20",
    spaceId: "spc_halden",
    number: 20,
    endsAt: "2026-10-31T23:59:59Z",
    closedAt: null,
  },
];
