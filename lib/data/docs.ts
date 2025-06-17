import { links } from "@/lib/site";
import type { Callout, FaqItem, FeatureCard, PageHeroContent, UseCase } from "@/types/content";

export const docsHero: PageHeroContent = {
  eyebrow: "Docs",
  title: "Docs that stay attached to the work",
  lead: "Write briefs, meeting notes and playbooks right next to the boards they drive, and share the right pages with your clients.",
};

export const docsFeatures = {
  eyebrow: "Docs for active work",
  title: "A capable editor, not a separate island",
  lead: "Pages are quick for a meeting note and sturdy enough for a studio handbook. The work they describe is always one click away.",
  cards: [
    {
      icon: "users",
      title: "Live co-editing",
      body: "Write together in real time with teammates and clients. Everyone sees the same version, always.",
    },
    {
      icon: "message",
      title: "Comments in context",
      body: "Highlight a line to start a thread. Mention a teammate or client guest when you need their input.",
    },
    {
      icon: "layers",
      title: "Pages inside pages",
      body: "Nest pages to build a client wiki, a studio handbook or an onboarding guide that stays easy to navigate.",
    },
    {
      icon: "paperclip",
      title: "Rich blocks",
      body: "Tables, checklists, callouts, code, images, files and embedded boards, all in a clean editor.",
    },
    {
      icon: "link",
      title: "Linked to cards",
      body: "Mention cards, sprints and other pages inline. Backlinks show where every decision is being used.",
    },
    {
      icon: "globe",
      title: "Share when it’s ready",
      body: "Publish a read-only page for a client or stakeholder while your working draft stays in the space.",
    },
  ] satisfies FeatureCard[],
};

export const docsUseCases = {
  eyebrow: "Two kinds of docs",
  title: "For clients and for the studio",
  items: [
    {
      icon: "briefcase",
      title: "Client-facing",
      body: "Put briefs, meeting recaps and launch notes where clients can read and approve them.",
      checks: [
        "Creative briefs with sign-off",
        "Meeting notes linked to action cards",
        "Monthly reports inside the client space",
        "Read-only links for wider stakeholders",
      ],
      link: { label: "Explore client spaces", href: "/spaces" },
    },
    {
      icon: "book-open",
      title: "Internal playbooks",
      body: "Keep the studio’s know-how in one searchable place instead of scattered files.",
      checks: [
        "Onboarding guides for new hires",
        "Process docs next to their templates",
        "Pricing and proposal libraries",
        "Private spaces for sensitive pages",
      ],
      link: { label: "Connect docs to sprints", href: "/sprints" },
    },
  ] satisfies UseCase[],
};

export const docsCallout: Callout = {
  icon: "search",
  title: "Find anything in one search",
  body: "Search covers docs, cards, comments and files across every space you can access, so the answer to “where did we decide that?” is a keystroke away.",
  cta: { label: "Start free trial", href: links.trial },
};

export const docsFaq: FaqItem[] = [
  {
    question: "Can clients edit docs?",
    answer:
      "You decide. Client guests can view, comment or edit individual pages depending on the role you give them in their space.",
  },
  {
    question: "Can I embed a board inside a doc?",
    answer:
      "Yes. Embed a live board, list or timeline view in any page, which is handy for status reports and kickoff docs.",
  },
  {
    question: "Can we import existing documents?",
    answer:
      "Paste formatted text straight into the editor or import Markdown files. Headings, lists and links carry over.",
  },
];
