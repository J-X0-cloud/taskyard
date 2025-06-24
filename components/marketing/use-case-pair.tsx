import { CheckList } from "@/components/ui/check-list";
import { Icon } from "@/components/ui/icon";
import { SectionHead } from "@/components/ui/section-head";
import { SmartLink } from "@/components/ui/smart-link";
import type { UseCase } from "@/types/content";

export function UseCasePair({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: UseCase[];
}) {
  return (
    <section className="ty-sec ty-wrap">
      <SectionHead eyebrow={eyebrow} title={title} />
      <div className="pair">
        {items.map((item) => (
          <article key={item.title}>
            <Icon name={item.icon} />
            <h3 className="text-h3">{item.title}</h3>
            <p className="text-body">{item.body}</p>
            <CheckList items={item.checks} />
            <SmartLink className="ty-more" href={item.link.href}>
              {item.link.label} <Icon name="arrow-right" />
            </SmartLink>
          </article>
        ))}
      </div>
    </section>
  );
}
