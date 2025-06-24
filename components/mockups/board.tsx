import { Avatar } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import { websiteRebuildBoard } from "@/lib/data/workspace";
import { cx } from "@/lib/utils";
import type { BoardCard } from "@/types/workspace";

import { AppFrame, AppHead } from "./app-frame";

function Card({ card }: { card: BoardCard }) {
  return (
    <div className={cx("card", card.dragging && "card--drag")}>
      <div className="card__tags">
        {card.tags.map((tag) => (
          <span key={tag.label} className={cx("tag", `tag--${tag.kind}`)}>
            {tag.label}
          </span>
        ))}
      </div>
      <div className="card__t">{card.title}</div>
      {card.progress !== undefined ? (
        <div className="card__bar">
          <i style={{ width: `${card.progress}%` }} />
        </div>
      ) : null}
      {card.comments ? (
        <div className="card__f" style={{ marginTop: 6 }}>
          <span>
            <Icon name="message" />
            {card.comments} client comments
          </span>
        </div>
      ) : null}
      <div className="card__f">
        <span>
          <Icon name="calendar" />
          {card.due}
        </span>
        <Avatar initials={card.assignee} />
      </div>
    </div>
  );
}

/** The "Website rebuild" board for Juniper Bakehouse, as shown in the homepage hero. */
export function BoardMockup() {
  return (
    <AppFrame crumbs={["Juniper Bakehouse", "/"]} current="Website rebuild" active="juniper">
      <AppHead title="Website rebuild" views={["Board", "List", "Timeline", "Calendar"]}>
        {["DR", "MT", "PN", "JL"].map((initials) => (
          <Avatar key={initials} initials={initials} />
        ))}
        <Avatar initials="+3" tone="f" />
      </AppHead>
      <div className="board">
        {websiteRebuildBoard.map((column) => (
          <div key={column.id} className="col">
            <div className="col__h">
              <i style={{ background: column.color }} />
              {column.title}
              <small>{column.total}</small>
            </div>
            {column.cards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>
        ))}
      </div>
    </AppFrame>
  );
}
