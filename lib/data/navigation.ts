import { links } from "@/lib/site";
import type { NavLink } from "@/types/content";

export const mainNav: NavLink[] = [
  { label: "Product", href: "/" },
  { label: "Client spaces", href: "/spaces" },
  { label: "Sprints", href: "/sprints" },
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "/#pricing" },
];

export const footerColumns: Array<{ title: string; links: NavLink[] }> = [
  {
    title: "Product",
    links: [
      { label: "Client spaces", href: "/spaces" },
      { label: "Sprints", href: "/sprints" },
      { label: "Docs", href: "/docs" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Security & reliability", href: "/#reliability" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help center", href: "#" },
      { label: "Templates", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "API reference", href: "#" },
      { label: "System status", href: links.status },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: links.contact },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];
