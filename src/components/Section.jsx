import { useReveal } from "../lib/useReveal.js";

export default function Section({ id, eyebrow, title, lead, children, className = "" }) {
  const headingId = `${id}-title`;
  const [revealRef, revealAt] = useReveal();
  return (
    <section id={id} className={`section ${className}`} aria-labelledby={headingId}>
      <div ref={revealRef} className={`container reveal is-${revealAt}`}>
        <header className="section-head">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 id={headingId} className="section-title">
            {title}
          </h2>
          {lead && <p className="section-lead">{lead}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
