import type { IconName } from "@/components/ui/icon";
import type { BoardColumn, Person, SpaceSummary, SprintSummary } from "@/types/workspace";

export const studioName = "Brightfold Studio";

export const people: Record<string, Person> = {
  DR: { initials: "DR", name: "Dana R.", tone: "a" },
  MT: { initials: "MT", name: "Maya T.", tone: "b" },
  PN: { initials: "PN", name: "Priya N.", tone: "c" },
  JL: { initials: "JL", name: "Jonah L.", tone: "d" },
};

export const sidebarNav: Array<{ id: string; label: string; icon: IconName; badge?: number }> = [
  { id: "inbox", label: "Inbox", icon: "inbox", badge: 4 },
  { id: "my-work", label: "My work", icon: "check-square" },
  { id: "timesheets", label: "Timesheets", icon: "clock" },
  { id: "spaces", label: "All spaces", icon: "layers" },
  { id: "docs", label: "Docs", icon: "book-open" },
];

export const clientSpaces = [
  { id: "juniper", name: "Juniper Bakehouse", color: "#1fa37a" },
  { id: "halden", name: "Halden Outdoor", color: "#4f7cf0" },
  { id: "mesa", name: "Mesa Credit Union", color: "#f2705b" },
  { id: "oakline", name: "Oakline Dental", color: "#a86ad8" },
  { id: "studio-ops", name: "Studio ops", color: "#8a9891" },
];

export const favorites = ["Launch checklist", "Q4 retainer plan"];

export const websiteRebuildBoard: BoardColumn[] = [
  {
    id: "brief",
    title: "Brief",
    color: "#8a9891",
    total: 3,
    cards: [
      {
        id: "c1",
        title: "Wholesale page messaging",
        tags: [{ label: "Copy", kind: "copy" }],
        due: "Oct 18",
        assignee: "PN",
      },
      {
        id: "c2",
        title: "Redirect map for old menu URLs",
        tags: [{ label: "SEO", kind: "seo" }],
        due: "Oct 21",
        assignee: "JL",
      },
      {
        id: "c3",
        title: "Seasonal photography shot list",
        tags: [{ label: "Design", kind: "design" }],
        due: "Oct 24",
        assignee: "MT",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In progress",
    color: "#4f7cf0",
    total: 4,
    cards: [
      {
        id: "c4",
        title: "Menu CMS model & editor",
        tags: [{ label: "Dev", kind: "dev" }],
        due: "Oct 14",
        assignee: "JL",
        progress: 60,
      },
      {
        id: "c5",
        title: "Homepage hero, round 2",
        tags: [{ label: "Design", kind: "design" }],
        due: "Oct 15",
        assignee: "MT",
        dragging: true,
      },
      {
        id: "c6",
        title: "Keyboard pass on order form",
        tags: [
          { label: "Dev", kind: "dev" },
          { label: "A11y", kind: "gray" },
        ],
        due: "Oct 16",
        assignee: "DR",
      },
    ],
  },
  {
    id: "client-review",
    title: "Client review",
    color: "#e3a431",
    total: 2,
    cards: [
      {
        id: "c7",
        title: "Brand color refresh",
        tags: [{ label: "Design", kind: "design" }],
        due: "Oct 11",
        assignee: "MT",
        comments: 3,
      },
      {
        id: "c8",
        title: "About page draft v2",
        tags: [{ label: "Copy", kind: "copy" }],
        due: "Oct 12",
        assignee: "PN",
      },
    ],
  },
  {
    id: "approved",
    title: "Approved",
    color: "#1fa37a",
    total: 5,
    cards: [
      {
        id: "c9",
        title: "Sitemap & page inventory",
        tags: [{ label: "Approved", kind: "ok" }],
        due: "Oct 2",
        assignee: "DR",
      },
      {
        id: "c10",
        title: "Typography and grid",
        tags: [{ label: "Approved", kind: "ok" }],
        due: "Oct 4",
        assignee: "MT",
      },
      {
        id: "c11",
        title: "Locations page wireframe",
        tags: [{ label: "Approved", kind: "ok" }],
        due: "Oct 7",
        assignee: "JL",
      },
    ],
  },
];

export const spaceSummaries: SpaceSummary[] = [
  {
    id: "juniper",
    code: "JB",
    name: "Juniper Bakehouse",
    engagement: "Website rebuild",
    color: "#1fa37a",
    access: "view",
    team: ["DR", "MT", "PN"],
    progress: 72,
    nextMilestone: "Launch · Oct 28",
  },
  {
    id: "halden",
    code: "HO",
    name: "Halden Outdoor",
    engagement: "Monthly retainer",
    color: "#4f7cf0",
    access: "comment",
    team: ["JL", "DR"],
    progress: 45,
    nextMilestone: "Oct report · Oct 31",
  },
  {
    id: "mesa",
    code: "MC",
    name: "Mesa Credit Union",
    engagement: "Accessibility audit",
    color: "#f2705b",
    access: "private",
    team: ["PN", "JL"],
    progress: 30,
    nextMilestone: "Findings · Nov 4",
  },
  {
    id: "oakline",
    code: "OD",
    name: "Oakline Dental",
    engagement: "Local SEO sprint",
    color: "#a86ad8",
    access: "view",
    team: ["MT", "DR"],
    progress: 88,
    nextMilestone: "Handoff · Oct 17",
  },
  {
    id: "new-business",
    code: "NP",
    name: "New business",
    engagement: "Pitches & proposals",
    color: "#e3a431",
    access: "private",
    team: ["DR"],
    progress: 20,
    nextMilestone: "Pitch · Oct 22",
  },
  {
    id: "studio-ops",
    code: "SO",
    name: "Studio ops",
    engagement: "Handbook & hiring",
    color: "#8a9891",
    access: "studio",
    team: ["DR", "MT", "PN", "JL"],
    progress: 60,
    nextMilestone: "Review · Nov 1",
  },
];

export const statusColors = {
  todo: "#8a9891",
  inProgress: "#4f7cf0",
  clientReview: "#e3a431",
  done: "#1fa37a",
  cancelled: "#c4ccc8",
} as const;

export const currentSprint = {
  number: 19,
  dates: "Mon Oct 6 – Fri Oct 17",
  team: ["DR", "MT", "JL"],
  counts: [
    { label: "To do", value: 3, color: statusColors.todo },
    { label: "In progress", value: 4, color: statusColors.inProgress },
    { label: "Client review", value: 2, color: statusColors.clientReview },
    { label: "Done", value: 9, color: statusColors.done },
  ],
};

export const pastSprints: SprintSummary[] = [
  {
    number: 18,
    cards: 21,
    dates: "Sep 22 – Oct 3",
    done: 18,
    rolledOver: 3,
    cancelled: 0,
    hours: 112,
  },
  {
    number: 17,
    cards: 19,
    dates: "Sep 8 – Sep 19",
    done: 17,
    rolledOver: 2,
    cancelled: 0,
    hours: 104,
  },
  {
    number: 16,
    cards: 23,
    dates: "Aug 25 – Sep 5",
    done: 19,
    rolledOver: 3,
    cancelled: 1,
    hours: 121,
  },
  {
    number: 15,
    cards: 17,
    dates: "Aug 11 – Aug 22",
    done: 15,
    rolledOver: 2,
    cancelled: 0,
    hours: 96,
  },
  {
    number: 14,
    cards: 20,
    dates: "Jul 28 – Aug 8",
    done: 18,
    rolledOver: 1,
    cancelled: 1,
    hours: 109,
  },
];
