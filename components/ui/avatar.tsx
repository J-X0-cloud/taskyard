import { people } from "@/lib/data/workspace";
import { cx } from "@/lib/utils";
import type { AvatarTone } from "@/types/workspace";

interface AvatarProps {
  initials: string;
  tone?: AvatarTone;
}

/** Initials avatar. Known teammates get their colour from the workspace roster. */
export function Avatar({ initials, tone }: AvatarProps) {
  const resolved = tone ?? people[initials]?.tone ?? "f";
  return <span className={cx("av", `av--${resolved}`)}>{initials}</span>;
}
