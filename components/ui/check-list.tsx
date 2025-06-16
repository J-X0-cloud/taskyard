import { Icon } from "./icon";

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="checks">
      {items.map((item) => (
        <li key={item}>
          <Icon name="check" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
