import { SmartLink } from "@/components/ui/smart-link";
import { footerColumns } from "@/lib/data/navigation";
import { siteConfig } from "@/lib/site";

import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="ty-foot">
      <div className="ty-wrap">
        <div className="ty-foot__grid">
          <div className="ty-foot__brand">
            <Logo />
            <p>
              The project workspace for small agencies and studios. Briefs, boards, sprints, docs
              and client approvals, all in one place.
            </p>
          </div>
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4>{column.title}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <SmartLink href={link.href}>{link.label}</SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="ty-foot__bar">
          <span>
            © {new Date().getFullYear()} {siteConfig.legalName} Made for agencies that ship.
          </span>
          <span className="ty-status">
            <i />
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
