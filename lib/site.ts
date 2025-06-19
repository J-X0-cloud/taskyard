export const siteConfig = {
  name: "Taskyard",
  legalName: "Taskyard, Inc.",
  title: "Taskyard | Project management for small agencies",
  description:
    "Taskyard is the project workspace for small agencies: client spaces, boards, sprints, docs and approvals in one fast, secure place.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@taskyard.com",
} as const;

export const links = {
  trial: `mailto:${siteConfig.email}`,
  walkthrough: `mailto:${siteConfig.email}?subject=Taskyard%20walkthrough`,
  pricingContact: `mailto:${siteConfig.email}?subject=Taskyard%20pricing`,
  contact: `mailto:${siteConfig.email}`,
  login: "#",
  status: "#",
  security: "#",
} as const;
