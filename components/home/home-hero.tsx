import { BoardMockup } from "@/components/mockups/board";
import { ButtonLink } from "@/components/ui/button";
import { productChips } from "@/lib/data/home";
import { links } from "@/lib/site";

export function HomeHero() {
  return (
    <section className="ty-hero ty-wrap">
      <a className="ty-pill" href="#reliability">
        <b>Rebuilt</b>
        <span>Faster boards, SSO and a public status page →</span>
      </a>
      <h1 className="text-h1">
        Client work, handled <em>start to finish</em>
      </h1>
      <p className="ty-lead text-h3">
        Taskyard is the project workspace for small agencies. Briefs, boards, sprints, docs and
        client approvals live together, so your team and your clients always know what’s next.
      </p>
      <div className="ty-ctas">
        <ButtonLink href={links.trial} arrow>
          Start your free trial
        </ButtonLink>
        <ButtonLink href={links.walkthrough} variant="ghost">
          Book a walkthrough
        </ButtonLink>
      </div>
      <p className="ty-note">14 days free · No credit card · Client guests always free</p>
      <div className="ty-chips" aria-hidden="true">
        {productChips.map((chip, index) => (
          <span key={chip} className={index === 0 ? "is-on" : undefined}>
            {chip}
          </span>
        ))}
      </div>
      <div className="ty-stage">
        <BoardMockup />
      </div>
    </section>
  );
}
