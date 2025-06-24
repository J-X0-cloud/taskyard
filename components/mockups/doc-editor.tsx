import type { ReactNode } from "react";

import { Avatar } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import { cx } from "@/lib/utils";

import { AppFrame } from "./app-frame";

function LinkChip({ color, children }: { color?: string; children: ReactNode }) {
  return (
    <span className="linkcard">
      {color ? <i style={{ background: color }} /> : null}
      {children}
    </span>
  );
}

const deliverables = [
  {
    label: "Menu page with seasonal badge",
    done: true,
    link: { label: "Menu CMS model", color: "#4f7cf0" },
  },
  { label: "Three hero photos per location", done: true },
  {
    label: "Newsletter template, desktop and mobile",
    done: false,
    link: { label: "Brief", color: "#8a9891" },
  },
  { label: "Printed QR table cards (print-ready PDF)", done: false },
];

/** The Juniper creative brief open in the editor, with a client comment pinned beside it. */
export function DocEditorMockup() {
  return (
    <AppFrame
      crumbs={["Juniper Bakehouse", "/", "Docs /"]}
      current="Creative brief"
      active="docs"
      mainClassName="app__main--rel"
    >
      <div className="doc">
        <div className="doc__meta">
          <LinkChip color="#1fa37a">Juniper Bakehouse</LinkChip>
          <LinkChip>
            <Icon name="edit" />
            Edited by Maya T. · 2 min ago
          </LinkChip>
          <LinkChip color="#e3a431">In client review</LinkChip>
        </div>
        <h4>Creative brief: Spring menu launch</h4>
        <p>
          Juniper is introducing a seasonal menu across three locations in April. The site, in-store
          QR menus and the newsletter should all tell the same story:{" "}
          <mark>fresh, local, baked before sunrise.</mark>
        </p>
        <h5>Deliverables</h5>
        <ul>
          {deliverables.map((item) => (
            <li key={item.label}>
              <span className={cx("chk", item.done && "chk--on")}>
                {item.done ? <Icon name="check" /> : null}
              </span>
              <span>
                {item.label}
                {item.link ? (
                  <>
                    {" "}
                    <LinkChip color={item.link.color}>{item.link.label}</LinkChip>
                  </>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
        <h5>Tone of voice</h5>
        <p>
          Warm, plain-spoken, a little playful. Short sentences. We name the farms we buy from,
          never the trends we follow.
        </p>
      </div>
      <div className="comment-pop">
        <header>
          <Avatar initials="PN" />
          Priya N.{" "}
          <span className="muted" style={{ fontWeight: 400 }}>
            client
          </span>
        </header>
        Love this line. Can we use it on the table cards too?
      </div>
    </AppFrame>
  );
}
