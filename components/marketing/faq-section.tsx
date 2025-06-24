import { FaqList } from "@/components/ui/faq-list";
import { SectionHead } from "@/components/ui/section-head";
import type { FaqItem } from "@/types/content";

export function FaqSection({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <section className="ty-sec ty-wrap">
      <SectionHead title={title} />
      <FaqList items={items} />
    </section>
  );
}
