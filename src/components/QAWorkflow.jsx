import { workflow } from "../data/workflow.js";
import Section from "./Section.jsx";
import "./QAWorkflow.css";

export default function QAWorkflow() {
  return (
    <Section
      id="workflow"
      eyebrow="workflow"
      title="How I approach testing"
      lead="From the first read of a requirement to the final sign-off."
    >
      <ol className="workflow">
        {workflow.map((item, i) => (
          <li key={item.step} className="workflow-step">
            <span className="workflow-num mono" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3>{item.step}</h3>
            <p>{item.detail}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
