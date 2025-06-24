import type { ReactNode } from "react";

import { Avatar } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import { currentSprint, pastSprints, statusColors } from "@/lib/data/workspace";

import { AppFrame, AppHead } from "./app-frame";

function Stat({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span className="stat">
      <i style={{ background: color }} />
      {children}
    </span>
  );
}

export function SprintPanelMockup() {
  const totalCards = currentSprint.counts.reduce((sum, count) => sum + count.value, 0);

  return (
    <AppFrame crumbs={["Halden Outdoor", "/"]} current="Sprints" active="halden">
      <AppHead title="Halden Outdoor · Sprints" views={["Sprints", "Board", "Timeline"]}>
        <span className="app__share">+ Plan next sprint</span>
      </AppHead>

      <div className="sprint-now">
        <div className="sprint-now__top">
          <Icon name="repeat" />
          <b>Sprint {currentSprint.number}</b>
          <span className="badge badge--client">Current</span>
          <span className="muted">
            {currentSprint.dates} · {totalCards} cards
          </span>
          <span className="stack" style={{ marginLeft: "auto" }}>
            {currentSprint.team.map((initials) => (
              <Avatar key={initials} initials={initials} />
            ))}
          </span>
        </div>
        <div className="sprint-now__stats">
          {currentSprint.counts.map((count) => (
            <Stat key={count.label} color={count.color}>
              {count.label} <b>{count.value}</b>
            </Stat>
          ))}
        </div>
        <div className="sprint-track">
          {currentSprint.counts.map((count) => (
            <i key={count.label} style={{ background: count.color, flex: count.value }} />
          ))}
        </div>
      </div>

      <div className="sub-h">Past sprints</div>
      <div className="rows">
        <div className="row row--sprint row--head">
          <span>Sprint</span>
          <span>Dates</span>
          <span>Done</span>
          <span>Rolled over</span>
          <span>Cancelled</span>
          <span>Hours logged</span>
        </div>
        {pastSprints.map((sprint) => (
          <div key={sprint.number} className="row row--sprint">
            <div className="row__name">
              <Icon name="repeat" />
              <div>
                Sprint {sprint.number}
                <small>{sprint.cards} cards</small>
              </div>
            </div>
            <span className="muted">{sprint.dates}</span>
            <Stat color={statusColors.done}>{sprint.done}</Stat>
            <Stat color={statusColors.clientReview}>{sprint.rolledOver}</Stat>
            <Stat color={statusColors.cancelled}>{sprint.cancelled}</Stat>
            <span className="muted">{sprint.hours} h</span>
          </div>
        ))}
      </div>
    </AppFrame>
  );
}
