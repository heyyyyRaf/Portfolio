import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

const SEVERITY_TAG = { Critical: "tag-red", Major: "tag-amber", Minor: "tag-cyan" };

function statusTag(status) {
  if (status.startsWith("Fixed")) return "tag-green";
  if (status === "Open") return "tag-red";
  return "tag-violet";
}

export default function BugReportCard({ bug }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <article className={`card bug-card ${open ? "is-open" : ""}`} aria-labelledby={`${panelId}-title`}>
      <h3 id={`${panelId}-title`} className="bug-heading">
        <button
          type="button"
          className="bug-toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="bug-id mono">{bug.id}</span>
          <span className="bug-title">{bug.title}</span>
          <ChevronDown className="bug-chevron" size={20} aria-hidden="true" />
        </button>
      </h3>

      <div className="bug-tags">
        <span className={`tag ${SEVERITY_TAG[bug.severity]}`}>Severity: {bug.severity}</span>
        <span className="tag">Priority: {bug.priority}</span>
        <span className={`tag ${statusTag(bug.status)}`}>{bug.status}</span>
        <span className="tag">{bug.app}</span>
      </div>

      <div id={panelId} className="bug-details" hidden={!open}>
        <dl>
          <div>
            <dt>Environment</dt>
            <dd>{bug.environment}</dd>
          </div>
          <div>
            <dt>Preconditions</dt>
            <dd>
              <ul>
                {bug.preconditions.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt>Steps to reproduce</dt>
            <dd>
              <ol>
                {bug.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </dd>
          </div>
        </dl>
        <dl className="bug-compare">
          <div className="bug-expected">
            <dt>Expected result</dt>
            <dd>{bug.expected}</dd>
          </div>
          <div className="bug-actual">
            <dt>Actual result</dt>
            <dd>{bug.actual}</dd>
          </div>
        </dl>
        <dl>
          {bug.notes && (
            <div>
              <dt>Notes</dt>
              <dd>{bug.notes}</dd>
            </div>
          )}
        </dl>
      </div>
    </article>
  );
}
