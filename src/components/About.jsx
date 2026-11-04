import { about } from "../data/profile.js";
import Section from "./Section.jsx";
import "./About.css";

const FOCUS = [
  { title: "Systematic testing", text: "Positive and negative scenarios for every feature." },
  { title: "Defect investigation", text: "Reproduce first, then report with exact steps." },
  { title: "Test documentation", text: "Test cases anyone on the team can pick up and run." },
  { title: "Working with developers", text: "Clarify expected behaviour and verify fixes together." },
];

export default function About() {
  return (
    <Section id="about" eyebrow="about" title="Quality is a habit, not a phase">
      <div className="about-grid">
        <div className="about-text">
          {about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <ul className="about-focus">
          {FOCUS.map(({ title, text }) => (
            <li key={title} className="card">
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
