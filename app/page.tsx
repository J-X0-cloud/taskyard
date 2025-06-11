import { Automations } from "@/components/home/automations";
import { HomeHero } from "@/components/home/home-hero";
import { Pricing } from "@/components/home/pricing";
import { ReliabilityBand } from "@/components/home/reliability-band";
import { Studios } from "@/components/home/studios";
import { Testimonials } from "@/components/home/testimonials";
import { ToolTiles } from "@/components/home/tool-tiles";
import { FaqSection } from "@/components/marketing/faq-section";
import { homeFaq } from "@/lib/data/home";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Studios />
      <Automations />
      <ReliabilityBand />
      <Testimonials />
      <Pricing />
      <ToolTiles />
      <FaqSection title="Frequently asked questions" items={homeFaq} />
    </>
  );
}
