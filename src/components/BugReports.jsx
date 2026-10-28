import { bugReports } from "../data/bugs.js";
import BugReportCard from "./BugReportCard.jsx";
import Section from "./Section.jsx";
import "./BugReports.css";

export default function BugReports() {
  return (
    <Section
      id="bug-reports"
      eyebrow="bug reports"
      title="How I write a bug report"
      lead="Sample reports on two fictional apps (no real company or customer data). Open one to see the full report a developer would receive."
    >
      <div className="bug-list">
        {bugReports.map((bug) => (
          <BugReportCard key={bug.id} bug={bug} />
        ))}
      </div>
    </Section>
  );
}
