import { ButtonLink } from "@/components/ui/button";
import { CheckList } from "@/components/ui/check-list";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, SectionHead } from "@/components/ui/section-head";
import { planFeatures } from "@/lib/data/home";
import { studioPlan } from "@/lib/pricing";
import { links } from "@/lib/site";

export function Pricing() {
  return (
    <section className="ty-sec ty-wrap" id="pricing" style={{ scrollMarginTop: 96 }}>
      <SectionHead
        eyebrow="Pricing"
        title="One plan. Every feature. Clients join free."
        lead="No feature tiers to decode and no charge for the clients you invite."
      />
      <div className="price">
        <div className="price__box">
          <Eyebrow>Studio plan</Eyebrow>
          <div className="price__num">
            <sup>$</sup>
            {studioPlan.annualPerSeat}
          </div>
          <p className="price__per">per team seat / month, billed annually</p>
          <span className="price__alt">or ${studioPlan.monthlyPerSeat} month to month</span>
          <p className="price__free">
            <Icon name="users" />
            Unlimited client guests, free
          </p>
        </div>
        <div className="price__list">
          <h3 className="text-h3">Everything your studio runs on</h3>
          <CheckList items={planFeatures} />
          <div className="ty-ctas">
            <ButtonLink href={links.trial} arrow>
              Start free trial
            </ButtonLink>
            <ButtonLink href={links.pricingContact} variant="ghost">
              Talk to us
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
