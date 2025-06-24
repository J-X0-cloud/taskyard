import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { SectionHead } from "@/components/ui/section-head";
import { reliabilityLinks, reliabilityPoints } from "@/lib/data/home";

export function ReliabilityBand() {
  return (
    <section className="ty-band" id="reliability">
      <div className="ty-wrap">
        <SectionHead
          eyebrow="Under the hood"
          title="Rebuilt to be the tool you never have to think about"
          lead="We spent the last year on Taskyard’s foundations: sign-in, data layer, test coverage and the release process. The workspace your clients see is now quick, steady and secure by default."
        />
        <div className="ty-band__grid">
          {reliabilityPoints.map((point) => (
            <div key={point.title} className="ty-band__item">
              <Icon name={point.icon} />
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </div>
          ))}
        </div>
        <div className="ty-band__cta">
          <ButtonLink href={reliabilityLinks.security.href} variant="light" arrow>
            {reliabilityLinks.security.label}
          </ButtonLink>
          <ButtonLink href={reliabilityLinks.status.href} variant="outline-light">
            {reliabilityLinks.status.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
