import type { AnchorHTMLAttributes } from "react";

import { cx } from "@/lib/utils";

import { Icon } from "./icon";
import { SmartLink } from "./smart-link";

type Variant = "primary" | "ghost" | "light" | "outline-light";

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  size?: "md" | "sm";
  /** Trailing arrow icon, used on primary calls to action. */
  arrow?: boolean;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  arrow,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <SmartLink
      href={href}
      className={cx("ty-btn", `ty-btn--${variant}`, size === "sm" && "ty-btn--sm", className)}
      {...props}
    >
      {children}
      {arrow ? (
        <>
          {" "}
          <Icon name="arrow-right" />
        </>
      ) : null}
    </SmartLink>
  );
}
