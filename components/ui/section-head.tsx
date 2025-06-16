import type { ReactNode } from "react";

interface SectionHeadProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="ty-eyebrow">{children}</span>;
}

export function SectionHead({ eyebrow, title, lead }: SectionHeadProps) {
  return (
    <div className="ty-sec__head">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-h2">{title}</h2>
      {lead ? <p className="ty-sub text-h5">{lead}</p> : null}
    </div>
  );
}
