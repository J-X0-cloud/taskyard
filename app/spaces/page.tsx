import type { Metadata } from "next";

import { CalloutBox } from "@/components/marketing/callout-box";
import { FaqSection } from "@/components/marketing/faq-section";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { PageHero } from "@/components/marketing/page-hero";
import { UseCasePair } from "@/components/marketing/use-case-pair";
import { SpacesTableMockup } from "@/components/mockups/spaces-table";
import {
  spacesCallout,
  spacesFaq,
  spacesFeatures,
  spacesHero,
  spacesUseCases,
} from "@/lib/data/spaces";

export const metadata: Metadata = {
  title: "Client spaces",
  description:
    "Give every client a private, organized space in Taskyard with free guest access, approvals and clear roles.",
};

export default function SpacesPage() {
  return (
    <>
      <PageHero content={spacesHero}>
        <SpacesTableMockup />
      </PageHero>
      <FeatureGrid {...spacesFeatures} />
      <UseCasePair {...spacesUseCases} />
      <CalloutBox callout={spacesCallout} />
      <FaqSection title="Client spaces, answered" items={spacesFaq} />
    </>
  );
}
