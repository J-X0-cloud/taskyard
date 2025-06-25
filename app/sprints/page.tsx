import type { Metadata } from "next";

import { CalloutBox } from "@/components/marketing/callout-box";
import { FaqSection } from "@/components/marketing/faq-section";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { PageHero } from "@/components/marketing/page-hero";
import { UseCasePair } from "@/components/marketing/use-case-pair";
import { SprintPanelMockup } from "@/components/mockups/sprint-panel";
import {
  sprintsCallout,
  sprintsFaq,
  sprintsFeatures,
  sprintsHero,
  sprintsUseCases,
} from "@/lib/data/sprints";

export const metadata: Metadata = {
  title: "Sprints",
  description:
    "Plan agency delivery in focused sprints with automatic rollover, per-client cadence and built-in time tracking.",
};

export default function SprintsPage() {
  return (
    <>
      <PageHero content={sprintsHero}>
        <SprintPanelMockup />
      </PageHero>
      <FeatureGrid {...sprintsFeatures} />
      <UseCasePair {...sprintsUseCases} />
      <CalloutBox callout={sprintsCallout} />
      <FaqSection title="Sprint planning, answered" items={sprintsFaq} />
    </>
  );
}
