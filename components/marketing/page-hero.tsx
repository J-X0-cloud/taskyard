import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section-head";
import { links } from "@/lib/site";
import type { PageHeroContent } from "@/types/content";

/** Hero for the feature pages: copy, trial CTAs and a product panel underneath. */
export function PageHero({ content, children }: { content: PageHeroContent; children: ReactNode }) {
  return (
    <section className="ty-hero ty-wrap">
      <Eyebrow>{content.eyebrow}</Eyebrow>
      <h1 className="text-h1" style={{ marginTop: 20 }}>
        {content.title}
      </h1>
      <p className="ty-lead text-h3">{content.lead}</p>
      <div className="ty-ctas">
        <ButtonLink href={links.trial} arrow>
          Start free trial
        </ButtonLink>
        <ButtonLink href={links.walkthrough} variant="ghost">
          Book a walkthrough
        </ButtonLink>
      </div>
      <div className="ty-stage ty-stage--panel">{children}</div>
    </section>
  );
}
