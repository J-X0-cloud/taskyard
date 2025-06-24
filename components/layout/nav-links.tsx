"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { mainNav } from "@/lib/data/navigation";

/** Primary navigation links; marks the current page for assistive tech and styling. */
export function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {mainNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={item.href === pathname ? "page" : undefined}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}
