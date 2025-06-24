import { Icon } from "@/components/ui/icon";
import { SectionHead } from "@/components/ui/section-head";
import type { FeatureCard } from "@/types/content";

interface FeatureGridProps {
  eyebrow: string;
  title: string;
  lead: string;
  cards: FeatureCard[];
}

export function FeatureGrid({ eyebrow, title, lead, cards }: FeatureGridProps) {
  return (
    <section className="ty-sec ty-wrap">
      <SectionHead eyebrow={eyebrow} title={title} lead={lead} />
      <div className="grid3">
        {cards.map((card) => (
          <article key={card.title} className="fcard">
            <div className="fcard__ic">
              <Icon name={card.icon} />
            </div>
            <h3 className="text-h4">{card.title}</h3>
            <p className="text-body">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
