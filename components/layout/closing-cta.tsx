import { ButtonLink } from "@/components/ui/button";
import { links } from "@/lib/site";

export function ClosingCta() {
  return (
    <div className="ty-wrap">
      <section className="ty-cta">
        <h2 className="text-h2">Put every client project in one well-kept yard.</h2>
        <p className="text-h6">
          14-day trial, no credit card. Bring your team and invite clients for free.
        </p>
        <div className="ty-ctas">
          <ButtonLink href={links.trial} arrow>
            Start your free trial
          </ButtonLink>
          <ButtonLink href={links.walkthrough} variant="ghost">
            Book a walkthrough
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
