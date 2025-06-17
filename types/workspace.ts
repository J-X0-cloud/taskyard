/** Shapes used by the product mockups and mirrored by the API. */

export type AvatarTone = "a" | "b" | "c" | "d" | "f";

export interface Person {
  initials: string;
  name: string;
  tone: AvatarTone;
}

export type TagKind = "copy" | "seo" | "design" | "dev" | "gray" | "ok";

export interface BoardCard {
  id: string;
  title: string;
  tags: Array<{ label: string; kind: TagKind }>;
  due: string;
  assignee: string;
  progress?: number;
  comments?: number;
  dragging?: boolean;
}

export interface BoardColumn {
  id: string;
  title: string;
  color: string;
  total: number;
  cards: BoardCard[];
}

export type SpaceAccess = "view" | "comment" | "private" | "studio";

export interface SpaceSummary {
  id: string;
  code: string;
  name: string;
  engagement: string;
  color: string;
  access: SpaceAccess;
  team: string[];
  progress: number;
  nextMilestone: string;
}

export interface SprintSummary {
  number: number;
  cards: number;
  dates: string;
  done: number;
  rolledOver: number;
  cancelled: number;
  hours: number;
}
