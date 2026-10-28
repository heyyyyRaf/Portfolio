import { GraduationCap } from "lucide-react";
import { education } from "../data/experience.js";
import Section from "./Section.jsx";
import "./Education.css";

function Placeholder({ children }) {
  return <span className="placeholder tag tag-confirm">{children}</span>;
}

export default function Education() {
  return (
    <Section id="education" eyebrow="education" title="Education">
      <ul className="education-list">
        {education.map((entry) => (
          <li key={entry.degree} className="card education-card">
            <span className="education-icon">
              <GraduationCap size={22} aria-hidden="true" />
            </span>
            <div>
              <h3>
                {entry.degree}{" "}
                {!entry.degreeConfirmed && <Placeholder>Exact title to confirm</Placeholder>}
              </h3>
              <dl className="education-meta">
                <div>
                  <dt>Institution</dt>
                  <dd>{entry.institution ?? <Placeholder>To be added</Placeholder>}</dd>
                </div>
                {entry.years && (
                  <div>
                    <dt>Years</dt>
                    <dd>{entry.years}</dd>
                  </div>
                )}
                <div>
                  <dt>Graduated</dt>
                  <dd>{entry.graduation ?? <Placeholder>To be added</Placeholder>}</dd>
                </div>
              </dl>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
