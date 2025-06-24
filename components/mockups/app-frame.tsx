import type { ReactNode } from "react";

import { LogoMark } from "@/components/layout/logo";
import { Icon } from "@/components/ui/icon";
import { clientSpaces, favorites, sidebarNav, studioName } from "@/lib/data/workspace";
import { cx } from "@/lib/utils";

interface AppFrameProps {
  /** Breadcrumb segments before the current page, separators included (hidden on phones). */
  crumbs?: string[];
  /** The current page, emphasised in the breadcrumb. */
  current: string;
  /** Extra crumb shown after the current page, e.g. "· 6 active". */
  crumbSuffix?: string;
  /** Sidebar entry to highlight: a nav id ("spaces", "docs") or a client space id. */
  active: string;
  mainClassName?: string;
  children: ReactNode;
}

/** Window chrome + sidebar shared by every product mockup on the site. */
export function AppFrame({
  crumbs = [],
  current,
  crumbSuffix,
  active,
  mainClassName,
  children,
}: AppFrameProps) {
  return (
    <div className="app" role="img" aria-label="Taskyard product interface">
      <div className="app__bar">
        <div className="app__dots">
          <i />
          <i />
          <i />
        </div>
        <div className="app__crumbs">
          {crumbs.map((crumb, index) => (
            <span key={`${crumb}-${index}`} className="hide-xs">
              {crumb}
            </span>
          ))}
          <b>{current}</b>
          {crumbSuffix ? <span className="hide-xs">{crumbSuffix}</span> : null}
        </div>
        <div className="app__bar-right">
          <span className="app__share">Share</span>
        </div>
      </div>

      <div className="app__body">
        <aside className="app__side">
          <div className="app__ws">
            <LogoMark />
            {studioName}
          </div>
          <div className="app__search">
            <Icon name="search" />
            Search<kbd>⌘K</kbd>
          </div>
          {sidebarNav.map((item) => (
            <div key={item.id} className={cx("app__nav", active === item.id && "is-on")}>
              <Icon name={item.icon} />
              {item.label}
              {item.badge ? <em>{item.badge}</em> : null}
            </div>
          ))}
          <div className="app__label">Client spaces</div>
          {clientSpaces.map((space) => (
            <div key={space.id} className={cx("app__nav", active === space.id && "is-on")}>
              <span className="app__dot" style={{ background: space.color }} />
              {space.name}
            </div>
          ))}
          <div className="app__label">Favorites</div>
          {favorites.map((favorite) => (
            <div key={favorite} className="app__nav">
              <Icon name="star" />
              {favorite}
            </div>
          ))}
        </aside>
        <div className={cx("app__main", mainClassName)}>{children}</div>
      </div>
    </div>
  );
}

interface AppHeadProps {
  title: string;
  views: string[];
  children: ReactNode;
}

/** Title row inside the main pane: page title, view switcher and a right-hand slot. */
export function AppHead({ title, views, children }: AppHeadProps) {
  return (
    <div className="app__head">
      <div className="app__title">{title}</div>
      <div className="app__views">
        {views.map((view, index) => (
          <span key={view} className={index === 0 ? "is-on" : undefined}>
            {view}
          </span>
        ))}
      </div>
      <div className="app__people">{children}</div>
    </div>
  );
}
