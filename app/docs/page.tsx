import type { Metadata } from "next";

import { CalloutBox } from "@/components/marketing/callout-box";
import { FaqSection } from "@/components/marketing/faq-section";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { PageHero } from "@/components/marketing/page-hero";
import { UseCasePair } from "@/components/marketing/use-case-pair";
import { DocEditorMockup } from "@/components/mockups/doc-editor";
import { docsCallout, docsFaq, docsFeatures, docsHero, docsUseCases } from "@/lib/data/docs";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Write briefs, notes and playbooks in Taskyard docs, linked to the cards and sprints they drive and shareable with clients.",
};

export default function DocsPage() {
  return (
    <>
      <PageHero content={docsHero}>
        <DocEditorMockup />
      </PageHero>
      <FeatureGrid {...docsFeatures} />
      <UseCasePair {...docsUseCases} />
      <CalloutBox callout={docsCallout} />
      <FaqSection title="Docs, answered" items={docsFaq} />
    </>
  );
}
