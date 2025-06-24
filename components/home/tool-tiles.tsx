import { Icon } from "@/components/ui/icon";
import { SectionHead } from "@/components/ui/section-head";
import { SmartLink } from "@/components/ui/smart-link";
import { toolTiles } from "@/lib/data/home";

export function ToolTiles() {
  return (
    <section className="ty-sec ty-wrap">
      <SectionHead eyebrow="The whole yard" title="Every tool a client project needs" />
      <div className="tiles">
        {toolTiles.map((tile) => (
          <SmartLink key={tile.label} className="tile" href={tile.href}>
            <Icon name={tile.icon} />
            <span>{tile.label}</span>
          </SmartLink>
        ))}
      </div>
    </section>
  );
}
