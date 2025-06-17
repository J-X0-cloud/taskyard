import type { IconName } from "@/components/ui/icon";
import { links } from "@/lib/site";
import type { FaqItem } from "@/types/content";

export const productChips = [
  "Boards",
  "Client spaces",
  "Sprints",
  "Docs",
  "Time tracking",
  "Approvals",
];

export const studioWordmarks: Array<{ className: string; name: string; bold?: string }> = [
  { className: "wm-1", name: "Fielder & Co." },
  { className: "wm-2", name: "Northpaw" },
  { className: "wm-3", name: "loom", bold: "work" },
  { className: "wm-4", name: "Halfmoon Digital" },
  { className: "wm-5", name: "brightfold" },
  { className: "wm-6", name: "KESTREL/CREATIVE" },
];

export interface Automation {
  trigger: string;
  triggerIcon: IconName;
  title: string;
  body: string;
  template: string;
  steps: string[];
  footnote: string;
}

export const automations: Automation[] = [
  {
    trigger: "When a brief is approved",
    triggerIcon: "flag",
    title: "Turn a brief into a project plan",
    body: "Taskyard builds milestones, tasks, owners and due dates from your studio’s own template, ready before the kickoff call.",
    template: "Website build template",
    steps: [
      "Discovery & sitemap",
      "Design rounds with client review",
      "Build, QA and accessibility pass",
      "Launch checklist & handoff",
    ],
    footnote: "Template included",
  },
  {
    trigger: "When a client leaves feedback",
    triggerIcon: "message",
    title: "Route feedback to the right person",
    body: "Comments from the client portal land on the card they’re about, tagged and assigned, instead of getting buried in someone’s inbox.",
    template: "Feedback triage rule",
    steps: [
      "Match the comment to its deliverable",
      "Assign to the card owner",
      "Flag anything past its review date",
      "Notify the account lead",
    ],
    footnote: "Works in every space",
  },
  {
    trigger: "Every Friday at 3pm",
    triggerIcon: "calendar",
    title: "Send the weekly client update",
    body: "A tidy summary of what shipped, what’s next and what’s waiting on the client, drafted from the board for you to review and send.",
    template: "Weekly status draft",
    steps: [
      "Cards moved to Approved",
      "Work planned for next week",
      "Items blocked on the client",
      "Hours logged against budget",
    ],
    footnote: "You approve before it sends",
  },
];

export const reliabilityPoints: Array<{ icon: IconName; title: string; body: string }> = [
  {
    icon: "shield",
    title: "Single sign-on and 2FA",
    body: "Sign in with your company’s identity provider, require two-factor for the whole studio, and set shorter sessions for client guests.",
  },
  {
    icon: "zap",
    title: "Boards that stay quick",
    body: "Big launch boards load progressively and stay responsive as cards, comments and attachments pile up.",
  },
  {
    icon: "git-branch",
    title: "Tested, staged releases",
    body: "Every change runs through an automated test suite and a staged rollout before it reaches your workspace.",
  },
  {
    icon: "activity",
    title: "Errors caught early",
    body: "Production errors are tracked and alerted to an on-call engineer, often before anyone on your team notices.",
  },
  {
    icon: "database",
    title: "Backups and audit log",
    body: "Daily backups with point-in-time restore, plus a searchable record of who changed what, and when.",
  },
  {
    icon: "radio",
    title: "Public status page",
    body: "Live uptime and a full incident history, so you can answer a client’s question before they ask it.",
  },
];

export const testimonials = [
  {
    quote:
      "We run nine retainers out of Taskyard. Each client sees their own space and nothing else, which ended a lot of awkward screenshot-editing before calls.",
    name: "Dana R.",
    role: "Operations Lead, Fielder & Co.",
    initials: "DR",
    tone: "a",
  },
  {
    quote:
      "Our biggest launch board used to stutter whenever we opened it. Now it just opens. That sounds small until you’re sharing your screen with a client.",
    name: "Marcus T.",
    role: "Founder, Halfmoon Digital",
    initials: "MT",
    tone: "b",
  },
  {
    quote:
      "Tying sprints to each client’s review cycle made our Friday updates boring, in the best possible way. Nobody asks where things are anymore.",
    name: "Priya N.",
    role: "Delivery Manager, Loomwork Studio",
    initials: "PN",
    tone: "c",
  },
] as const;

export const planFeatures = [
  "Unlimited client spaces",
  "Board, list, timeline & calendar",
  "Sprints and time tracking",
  "Docs and client-facing pages",
  "Intake forms and approvals",
  "Automations and templates",
  "SSO, 2FA and audit log",
  "Daily backups, priority support",
];

export const toolTiles: Array<{ icon: IconName; label: string; href: string }> = [
  { icon: "briefcase", label: "Client spaces", href: "/spaces" },
  { icon: "columns", label: "Boards", href: "/" },
  { icon: "repeat", label: "Sprints", href: "/sprints" },
  { icon: "file-text", label: "Docs", href: "/docs" },
  { icon: "bar-chart", label: "Timeline", href: "/sprints" },
  { icon: "calendar", label: "Calendar", href: "/sprints" },
  { icon: "clock", label: "Time tracking", href: "/sprints" },
  { icon: "check-square", label: "Approvals", href: "/spaces" },
  { icon: "inbox", label: "Intake forms", href: "/docs" },
  { icon: "search", label: "Universal search", href: "/docs" },
  { icon: "copy", label: "Templates", href: "/" },
  { icon: "shield", label: "Audit log", href: "/#reliability" },
];

export const reliabilityLinks = {
  security: { label: "Read our security overview", href: links.security },
  status: { label: "View system status", href: links.status },
};

export const homeFaq: FaqItem[] = [
  {
    question: "What is Taskyard?",
    answer:
      "Taskyard is a project workspace built for small agencies and studios. It brings client spaces, boards, sprints, time tracking, docs and approvals together, so the whole lifecycle of a client project lives in one place.",
  },
  {
    question: "Who is it built for?",
    answer:
      "Design, web, marketing and content studios of roughly three to fifty people who juggle several clients at once and want their clients to see progress without living in their inbox.",
  },
  {
    question: "Can our clients see their projects?",
    answer:
      "Yes. Invite clients as guests to their own space. They can view progress, comment and approve work, and they never see other clients or your internal planning. Guests are free on every plan.",
  },
  {
    question: "How does pricing work?",
    answer:
      "One plan with every feature: $12 per team seat per month billed annually, or $15 month to month. Client guests don’t count as seats. Every workspace starts with a 14-day trial, no card required.",
  },
  {
    question: "Can we bring our existing projects over?",
    answer:
      "Yes. Import boards and tasks from a CSV export or spreadsheet, or use the REST API for anything more custom. We’re happy to help you plan the move during a walkthrough.",
  },
  {
    question: "How do you keep our work safe?",
    answer:
      "Taskyard supports single sign-on and enforced two-factor authentication, encrypts data in transit and at rest, keeps daily backups with point-in-time restore and records an audit log of changes. Current uptime is always visible on our public status page.",
  },
];
