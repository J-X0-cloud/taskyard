import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

import { isExternalHref } from "@/lib/utils";

type SmartLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** next/link for in-app routes, a plain anchor for mailto:, hash and external links. */
export function SmartLink({ href, children, ...props }: SmartLinkProps) {
  if (isExternalHref(href)) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
