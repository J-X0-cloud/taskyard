import { Avatar } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import { SectionHead } from "@/components/ui/section-head";
import { testimonials } from "@/lib/data/home";

export function Testimonials() {
  return (
    <section className="ty-sec ty-wrap">
      <SectionHead eyebrow="From the studios" title="What agency teams say about Taskyard" />
      <div className="quotes">
        {testimonials.map((item) => (
          <figure key={item.name} className="quote">
            <Icon name="quote" />
            <blockquote>{item.quote}</blockquote>
            <footer>
              <Avatar initials={item.initials} tone={item.tone} />
              <div>
                <b>{item.name}</b>
                <small>{item.role}</small>
              </div>
            </footer>
          </figure>
        ))}
      </div>
    </section>
  );
}
