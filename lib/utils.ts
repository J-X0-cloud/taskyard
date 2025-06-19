export { clsx as cx } from "clsx";

export function isExternalHref(href: string): boolean {
  return /^(mailto:|tel:|https?:\/\/|#)/.test(href);
}
