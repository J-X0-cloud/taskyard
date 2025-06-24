import { Avatar } from "@/components/ui/avatar";
import { Icon, type IconName } from "@/components/ui/icon";
import { spaceSummaries } from "@/lib/data/workspace";
import { cx } from "@/lib/utils";
import type { SpaceAccess } from "@/types/workspace";

import { AppFrame, AppHead } from "./app-frame";

const accessBadge: Record<SpaceAccess, { label: string; icon: IconName; className: string }> = {
  view: { label: "Client can view", icon: "eye", className: "badge--client" },
  comment: { label: "Client can comment", icon: "eye", className: "badge--client" },
  private: { label: "Private", icon: "lock", className: "badge--priv" },
  studio: { label: "Whole studio", icon: "users", className: "badge--open" },
};

export function SpacesTableMockup() {
  return (
    <AppFrame current="All spaces" crumbSuffix="· 6 active" active="spaces">
      <AppHead title="Client spaces" views={["All", "Retainers", "Projects", "Internal"]}>
        <span className="app__share">+ New space</span>
      </AppHead>
      <div className="rows">
        <div className="row row--space row--head">
          <span>Space</span>
          <span>Access</span>
          <span>Team</span>
          <span>Progress</span>
          <span>Next milestone</span>
        </div>
        {spaceSummaries.map((space) => {
          const badge = accessBadge[space.access];
          return (
            <div key={space.id} className="row row--space">
              <div className="row__name">
                <span className="row__ic" style={{ background: space.color }}>
                  {space.code}
                </span>
                <div>
                  {space.name}
                  <small>{space.engagement}</small>
                </div>
              </div>
              <span className={cx("badge", badge.className)}>
                <Icon name={badge.icon} />
                {badge.label}
              </span>
              <span className="stack">
                {space.team.map((initials) => (
                  <Avatar key={initials} initials={initials} />
                ))}
              </span>
              <div className="meter">
                <i style={{ width: `${space.progress}%` }} />
              </div>
              <span className="muted">{space.nextMilestone}</span>
            </div>
          );
        })}
      </div>
    </AppFrame>
  );
}
