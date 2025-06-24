import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { links } from "@/lib/site";

import { Logo } from "./logo";
import { NavLinks } from "./nav-links";

export function SiteHeader() {
  return (
    <header className="ty-header">
      <div className="ty-header__in">
        <Logo />
        <nav className="ty-nav" aria-label="Primary">
          <NavLinks />
        </nav>
        <div className="ty-header__right">
          <a className="ty-login" href={links.login}>
            Log in
          </a>
          <ButtonLink href={links.trial} size="sm">
            Start free<span className="ty-hide-sm">&nbsp;trial</span>
          </ButtonLink>
          {/* Native disclosure so the menu works before hydration and without JavaScript. */}
          <details className="ty-menu">
            <summary aria-label="Open menu">
              <Icon name="menu" />
            </summary>
            <div className="ty-menu__panel">
              <NavLinks />
              <a href={links.login}>Log in</a>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
