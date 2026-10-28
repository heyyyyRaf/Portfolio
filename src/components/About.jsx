import { Bug, FileText, ListChecks, Users } from "lucide-react";
import { about } from "../data/profile.js";
import Section from "./Section.jsx";
import "./About.css";

const FOCUS = [
  { icon: ListChecks, title: "Systematic testing", text: "Positive and negative scenarios for every feature." },
  { icon: Bug, title: "Defect investigation", text: "Reproduce first, then report with exact steps." },
  { icon: FileText, title: "Test documentation", text: "Test cases anyone on the team can pick up and run." },
  { icon: Users, title: "Working with developers", text: "Clarify expected behaviour and verify fixes together." },
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
          {FOCUS.map(({ icon: FocusIcon, title, text }) => (
            <li key={title} className="card">
              <FocusIcon size={20} aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
