import { Icon } from "@/components/ui/icon";
import { SectionHead } from "@/components/ui/section-head";
import { automations } from "@/lib/data/home";

export function Automations() {
  return (
    <section className="ty-sec ty-wrap">
      <SectionHead
        eyebrow="Built for how agencies work"
        title="From signed brief to happy client, without the chasing"
        lead="Automations handle the busywork around every project, so your people spend their hours on the work clients actually pay for."
      />
      <div className="grid3">
        {automations.map((flow) => (
          <article key={flow.title} className="flow">
            <span className="flow__trig">
              <Icon name={flow.triggerIcon} />
              {flow.trigger}
            </span>
            <h3 className="text-h4">{flow.title}</h3>
            <p className="text-body">{flow.body}</p>
            <div className="flow__tpl">
              <small>{flow.template}</small>
              <ol>
                {flow.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
            <div className="flow__foot">
              <span>Automation</span>
              <b>{flow.footnote}</b>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
