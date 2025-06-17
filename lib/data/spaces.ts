import type { Callout, FaqItem, FeatureCard, PageHeroContent, UseCase } from "@/types/content";

export const spacesHero: PageHeroContent = {
  eyebrow: "Client spaces",
  title: "Give every client a space of their own",
  lead: "Keep briefs, boards, files and approvals for each account together, and decide exactly what your client can see, comment on or change.",
};

export const spacesFeatures = {
  eyebrow: "Clear boundaries",
  title: "Organized by client, not by chaos",
  lead: "Spaces give each account a clean boundary while everything stays inside one searchable workspace.",
  cards: [
    {
      icon: "folder",
      title: "One home per account",
      body: "Boards, docs, sprints, forms and files for a client live together. New team members find everything in one place on day one.",
    },
    {
      icon: "eye",
      title: "Client view, built in",
      body: "Invite clients as free guests. They see progress, leave comments and approve work in a clean, read-friendly view.",
    },
    {
      icon: "lock",
      title: "Private planning",
      body: "Keep margins, internal notes and pitch work in private spaces that client guests can never discover.",
    },
    {
      icon: "user-check",
      title: "Roles that make sense",
      body: "Owner, editor, commenter and viewer roles map to how studios actually work with staff, freelancers and clients.",
    },
    {
      icon: "check-square",
      title: "Approvals on the record",
      body: "Clients approve deliverables right on the card, with a timestamp and a name, so sign-off is never a debate.",
    },
    {
      icon: "move",
      title: "Move work, keep history",
      body: "Shift boards and docs between spaces when an engagement changes. Comments, files and history travel with them.",
    },
  ] satisfies FeatureCard[],
};

export const spacesUseCases = {
  eyebrow: "Built around real engagements",
  title: "Retainers and projects, each with the right shape",
  items: [
    {
      icon: "repeat",
      title: "Monthly retainers",
      body: "Give ongoing clients a steady home where recurring work, reports and requests never get lost.",
      checks: [
        "A recurring board for monthly deliverables",
        "Intake form for ad-hoc client requests",
        "Hours logged against the retainer budget",
        "Monthly report page the client can open anytime",
      ],
      link: { label: "Plan retainers in sprints", href: "/sprints" },
    },
    {
      icon: "rocket",
      title: "Fixed-scope projects",
      body: "Spin up a space from a template the moment the contract is signed, then hand it over cleanly at launch.",
      checks: [
        "Phases, milestones and owners from your template",
        "Client review column with approvals",
        "Creative brief and meeting notes as docs",
        "Archive the space with its full history at handoff",
      ],
      link: { label: "See how docs fit in", href: "/docs" },
    },
  ] satisfies UseCase[],
};

export const spacesCallout: Callout = {
  icon: "shield",
  title: "Permissions you can trust",
  body: "Every access rule in Taskyard is covered by automated tests that run before each release, so a guest only ever sees the space they were invited to.",
  cta: { label: "Security overview", href: "/#reliability" },
};

export const spacesFaq: FaqItem[] = [
  {
    question: "What can a space contain?",
    answer:
      "A space holds its own boards, docs, sprints, intake forms, files and members. Most studios create one per client, plus a few internal spaces for operations, hiring and new business.",
  },
  {
    question: "Do client guests cost extra?",
    answer:
      "No. Guests are free and unlimited on every plan. You only pay for the seats your own team uses.",
  },
  {
    question: "Can a client see our other clients?",
    answer:
      "Never. Guests can only open the spaces they’re invited to, and private spaces don’t appear in search or navigation for anyone outside them.",
  },
];
