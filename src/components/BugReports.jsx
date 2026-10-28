import { TITLE_FORMAT, bugReports } from "../data/bugs.js";
import BugReportCard from "./BugReportCard.jsx";
import Section from "./Section.jsx";
import "./BugReports.css";

export default function BugReports() {
  return (
    <Section
      id="bug-reports"
      eyebrow="bug reports"
      title="How I write a ticket report"
      lead="Sample bug and enhancement tickets on fictional apps (no real company or customer data). Open one to see the full ticket a developer would receive."
    >
      <figure className="card bug-format">
        <figcaption>Every title follows the same format, so a ticket can be triaged from the list view:</figcaption>
        <dl>
          {TITLE_FORMAT.map(({ part, meaning }) => (
            <div key={part}>
              <dt className="mono">[{part}]</dt>
              <dd>{meaning}</dd>
            </div>
          ))}
          <div>
            <dt className="mono">Title</dt>
            <dd>What happens, in Title Case</dd>
          </div>
        </dl>
      </figure>

      <div className="bug-list">
        {bugReports.map((bug) => (
          <BugReportCard key={bug.id} bug={bug} />
        ))}
      </div>
    </Section>
  );
}
