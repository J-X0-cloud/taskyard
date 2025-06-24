import Link from "next/link";

export function LogoMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#13845f" />
      <rect x="7" y="8" width="4.6" height="16" rx="2.3" fill="#fff" />
      <rect x="13.7" y="8" width="4.6" height="10.5" rx="2.3" fill="#fff" opacity=".85" />
      <rect x="20.4" y="8" width="4.6" height="6.5" rx="2.3" fill="#f2705b" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link className="ty-logo" href="/" aria-label="Taskyard home">
      <LogoMark />
      <span>
        task<b>yard</b>
      </span>
    </Link>
  );
}
