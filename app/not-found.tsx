import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="ty-hero ty-wrap">
      <span className="ty-eyebrow">404</span>
      <h1 className="text-h2" style={{ marginTop: 20 }}>
        That page isn’t in the yard.
      </h1>
      <p className="ty-lead text-h5">It may have moved, or the link might be out of date.</p>
      <div className="ty-ctas">
        <ButtonLink href="/" arrow>
          Back to the homepage
        </ButtonLink>
      </div>
    </section>
  );
}
