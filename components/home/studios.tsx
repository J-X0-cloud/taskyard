import { studioWordmarks } from "@/lib/data/home";

export function Studios() {
  return (
    <section className="ty-studios ty-wrap">
      <p>Running client work at independent studios like</p>
      <ul>
        {studioWordmarks.map((mark) => (
          <li key={mark.className} className={mark.className}>
            {mark.name}
            {mark.bold ? <b>{mark.bold}</b> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
