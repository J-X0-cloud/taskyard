import type { FaqItem } from "@/types/content";

import { Icon } from "./icon";

/**
 * Native exclusive accordion: <details name="…"> keeps one answer open at a time without
 * any JavaScript.
 */
export function FaqList({ items, group = "faq" }: { items: FaqItem[]; group?: string }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.question} name={group}>
          <summary className="text-h5">
            <span>{item.question}</span>
            <Icon name="chevron-down" />
          </summary>
          <div className="text-body">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
