import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { Callout } from "@/types/content";

export function CalloutBox({ callout }: { callout: Callout }) {
  return (
    <div className="ty-wrap">
      <section className="callout">
        <div className="callout__ic">
          <Icon name={callout.icon} />
        </div>
        <div>
          <h2 className="text-h3">{callout.title}</h2>
          <p className="text-body">{callout.body}</p>
        </div>
        <ButtonLink href={callout.cta.href} variant="ghost" arrow>
          {callout.cta.label}
        </ButtonLink>
      </section>
    </div>
  );
}
