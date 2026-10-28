import { Fragment, useState } from "react";
import { ChevronDown } from "lucide-react";
import { testCases } from "../data/testCases.js";
import Section from "./Section.jsx";
import "./TestCaseTable.css";

const TYPES = ["All", "Positive", "Negative"];
const STATUS_TAG = { PASS: "tag-green", FAIL: "tag-red", BLOCKED: "tag-amber", DISREGARD: "" };
const PRIORITY_TAG = { High: "tag-red", Medium: "tag-amber", Low: "tag-cyan" };
const COLUMNS = 9;

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function TestCaseTable() {
  const [type, setType] = useState("All");
  const [expanded, setExpanded] = useState(() => new Set());

  const rows = type === "All" ? testCases : testCases.filter((tc) => tc.scenarioType === type);
  // Positive scenarios first, then negative — the same order as my test sheets.
  const groups = ["Positive", "Negative"]
    .map((name) => ({ name, cases: rows.filter((tc) => tc.scenarioType === name) }))
    .filter((group) => group.cases.length > 0);

  function toggle(id) {
    setExpanded((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <Section
      id="test-cases"
      eyebrow="test cases"
      title="Test case showcase"
      lead="Sample cases in the same layout as my real test sheets, written for the fictional apps above. Open a row for preconditions, steps, test data and results."
    >
      <div className="tc-toolbar">
        <div className="project-filters tc-filters" role="group" aria-label="Filter test cases by type">
          {TYPES.map((t) => (
            <button key={t} type="button" className="filter-btn" aria-pressed={type === t} onClick={() => setType(t)}>
              {t}
            </button>
          ))}
        </div>
        <p className="tc-count" aria-live="polite">
          {rows.length} of {testCases.length} test cases · sample data
        </p>
      </div>

      <div className="tc-wrap card">
        <table className="tc-table">
          <caption className="visually-hidden">Sample test cases</caption>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Scenario</th>
              <th scope="col">Feature · Module</th>
              <th scope="col">User role</th>
              <th scope="col">Test type</th>
              <th scope="col">Priority</th>
              <th scope="col">Status</th>
              <th scope="col">Last tested</th>
              <th scope="col">
                <span className="visually-hidden">Details</span>
              </th>
            </tr>
          </thead>
          {groups.map((group) => (
            <tbody key={group.name}>
              <tr className={`tc-group tc-group-${group.name.toLowerCase()}`}>
                <th scope="colgroup" colSpan={COLUMNS}>
                  {group.name} scenarios
                </th>
              </tr>
              {group.cases.map((tc) => {
                const isOpen = expanded.has(tc.id);
                const detailsId = `tc-details-${tc.id}`;
                return (
                  <Fragment key={tc.id}>
                    <tr className={`tc-row ${isOpen ? "is-open" : ""}`}>
                      <td data-label="ID" className="mono tc-id">
                        {tc.id}
                      </td>
                      <td data-label="Scenario" className="tc-scenario">
                        {tc.scenario}
                      </td>
                      <td data-label="Feature · Module">
                        {tc.feature}
                        <span className="tc-sub">{tc.module}</span>
                      </td>
                      <td data-label="User role">{tc.role}</td>
                      <td data-label="Test type">{tc.testType}</td>
                      <td data-label="Priority">
                        <span className={`tag ${PRIORITY_TAG[tc.priority]}`}>{tc.priority}</span>
                      </td>
                      <td data-label="Status">
                        <span className={`tag ${STATUS_TAG[tc.status]}`}>{tc.status}</span>
                      </td>
                      <td data-label="Last tested" className="tc-date">
                        {tc.lastTested ? <time dateTime={tc.lastTested}>{formatDate(tc.lastTested)}</time> : "—"}
                      </td>
                      <td className="tc-action">
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          aria-expanded={isOpen}
                          aria-controls={detailsId}
                          onClick={() => toggle(tc.id)}
                        >
                          {isOpen ? "Hide" : "Details"}
                          <span className="visually-hidden"> for {tc.id}</span>
                          <ChevronDown className="tc-chevron" size={16} aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                    <tr id={detailsId} className="tc-details-row" hidden={!isOpen}>
                      <td colSpan={COLUMNS}>
                        <dl className="tc-details">
                          <div>
                            <dt>Preconditions</dt>
                            <dd>{tc.preconditions}</dd>
                          </div>
                          <div>
                            <dt>Test data</dt>
                            <dd className="mono">{tc.testData}</dd>
                          </div>
                          <div className="tc-steps">
                            <dt>Steps</dt>
                            <dd>
                              <ol>
                                {tc.steps.map((s) => (
                                  <li key={s}>{s}</li>
                                ))}
                              </ol>
                            </dd>
                          </div>
                          <div>
                            <dt>Expected result</dt>
                            <dd>{tc.expected}</dd>
                          </div>
                          <div>
                            <dt>Actual result</dt>
                            <dd>{tc.actual}</dd>
                          </div>
                        </dl>
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          ))}
        </table>
      </div>
    </Section>
  );
}
