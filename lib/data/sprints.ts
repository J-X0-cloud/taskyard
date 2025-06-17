import type { Callout, FaqItem, FeatureCard, PageHeroContent, UseCase } from "@/types/content";

export const sprintsHero: PageHeroContent = {
  eyebrow: "Sprints",
  title: "Plan delivery around your client’s calendar",
  lead: "Run focused two-week cycles for the clients that need them, roll unfinished work forward automatically and see where the hours went.",
};

export const sprintsFeatures = {
  eyebrow: "Cadence without ceremony",
  title: "Sprints that fit agency work",
  lead: "Use sprints where a steady rhythm helps, and keep continuous-flow boards everywhere else.",
  cards: [
    {
      icon: "target",
      title: "A focused delivery window",
      body: "Separate this sprint from the backlog so the team sees what matters now, without losing sight of what comes next.",
    },
    {
      icon: "repeat",
      title: "Automatic rollover",
      body: "When a sprint ends, unfinished cards move forward on their own. Nothing slips because a date went by.",
    },
    {
      icon: "calendar",
      title: "Cadence per client",
      body: "Set sprint length, start day and cooldown for each space, so delivery lines up with every client’s review meeting.",
    },
    {
      icon: "sliders",
      title: "Your own workflow",
      body: "Brief, in progress, internal review, client review, approved. Define the statuses your studio actually uses.",
    },
    {
      icon: "clock",
      title: "Time tracked in context",
      body: "Log hours on the card as you work and compare every sprint against the retainer budget at a glance.",
    },
    {
      icon: "layout",
      title: "Board, list or timeline",
      body: "Plan in a list, run stand-ups on the board and walk the client through the timeline, all from the same data.",
    },
  ] satisfies FeatureCard[],
};

export const sprintsUseCases = {
  eyebrow: "Where sprints help most",
  title: "Sprints for studio teams",
  items: [
    {
      icon: "briefcase",
      title: "Retainer pods",
      body: "Give a small team a predictable rhythm for each ongoing client, with reviews on the calendar.",
      checks: [
        "Two-week cycles aligned to client check-ins",
        "Recurring deliverables added automatically",
        "Budget burn visible per sprint",
        "Friday update drafted from the sprint board",
      ],
      link: { label: "Set up retainer spaces", href: "/spaces" },
    },
    {
      icon: "rocket",
      title: "Launch pushes",
      body: "Pull a site build or campaign into tight cycles for the final stretch, then go back to flow after launch.",
      checks: [
        "Sprint only the spaces that need it",
        "Cards linked to the creative brief",
        "Carry QA and accessibility fixes forward",
        "Launch checklist as the final sprint goal",
      ],
      link: { label: "Link sprints to briefs", href: "/docs" },
    },
  ] satisfies UseCase[],
};

export const sprintsCallout: Callout = {
  icon: "bar-chart",
  title: "Hours and delivery, side by side",
  body: "Every sprint keeps its cards, statuses and logged time together, so a retainer review becomes a conversation instead of a spreadsheet exercise.",
  cta: { label: "See pricing", href: "/#pricing" },
};

export const sprintsFaq: FaqItem[] = [
  {
    question: "Does every space have to use sprints?",
    answer:
      "No. Sprints are switched on per space. Many studios run sprints for retainers and simple boards for smaller one-off projects.",
  },
  {
    question: "What happens to unfinished work?",
    answer:
      "When a sprint closes, unfinished cards roll into the next sprint automatically, keeping their comments, time entries and history.",
  },
  {
    question: "Can clients see sprint progress?",
    answer:
      "Yes, if you choose. Client guests can view the current sprint in their space without seeing internal estimates or hours.",
  },
];
