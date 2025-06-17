import type { IconName } from "@/components/ui/icon";

export interface NavLink {
  label: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FeatureCard {
  icon: IconName;
  title: string;
  body: string;
}

export interface UseCase {
  icon: IconName;
  title: string;
  body: string;
  checks: string[];
  link: NavLink;
}

export interface Callout {
  icon: IconName;
  title: string;
  body: string;
  cta: NavLink;
}

export interface PageHeroContent {
  eyebrow: string;
  title: string;
  lead: string;
}
