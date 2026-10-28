import { useRef, useState } from "react";
import { CircleCheck, Target } from "lucide-react";
import { automationSuite } from "../data/automation.js";
import CodeBlock from "./CodeBlock.jsx";
import { GitHubIcon } from "./icons.jsx";
import Section from "./Section.jsx";
import "./AutomationShowcase.css";

export default function AutomationShowcase() {
  const { files, lastRun, repoUrl } = automationSuite;
  const [current, setCurrent] = useState(0);
  const tabRefs = useRef([]);
  const file = files[current];

  // Arrow keys move between tabs, as in the WAI-ARIA tabs pattern.
  function onTabKey(e) {
    const keys = { ArrowRight: 1, ArrowLeft: -1, Home: "first", End: "last" };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const move = keys[e.key];
    const next =
      move === "first" ? 0 : move === "last" ? files.length - 1 : (current + move + files.length) % files.length;
    setCurrent(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <Section
      id="automation"
      eyebrow="automation"
      title="Python + Playwright automation"
      lead="A practice suite that tests this website itself. The code below is loaded straight from the test files in the repository, so what you read is what runs."
    >
      <div className="auto-intro card">
        <div>
          <h3>{automationSuite.title}</h3>
          <p>{automationSuite.description}</p>
        </div>
        <div className="auto-intro-side">
          <span className="tag tag-violet">Practice project</span>
          {repoUrl && (
            <a className="btn btn-secondary btn-sm" href={repoUrl} target="_blank" rel="noreferrer">
              <GitHubIcon size={16} /> View on GitHub
            </a>
          )}
        </div>
      </div>

      {lastRun && (
        <div className="auto-result" role="status">
          <CircleCheck size={18} aria-hidden="true" />
          <span>
            <strong>Last run:</strong> {lastRun.summary} <span className="auto-result-meta">· {lastRun.details}</span>
          </span>
        </div>
      )}

      <div className="auto-tabs" role="tablist" aria-label="Test files">
        {files.map((f, i) => (
          <button
            key={f.name}
            ref={(el) => (tabRefs.current[i] = el)}
            type="button"
            role="tab"
            id={`auto-tab-${i}`}
            aria-selected={i === current}
            aria-controls="auto-panel"
            tabIndex={i === current ? 0 : -1}
            className="auto-tab mono"
            onClick={() => setCurrent(i)}
            onKeyDown={onTabKey}
          >
            {f.name}
          </button>
        ))}
      </div>

      <div id="auto-panel" role="tabpanel" aria-labelledby={`auto-tab-${current}`} className="auto-panel">
        <div className="auto-meta">
          <p>
            <strong>Purpose:</strong> {file.purpose}
          </p>
          <div className="auto-assertions">
            <span className="auto-assertions-label">
              <Target size={15} aria-hidden="true" /> Assertions
            </span>
            <ul>
              {file.assertions.map((a) => (
                <li key={a} className="tag">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <CodeBlock code={file.code} language="python" label={`automation/tests/${file.name}`} />
      </div>

      <div className="auto-howto">
        <div>
          <h3>Set up</h3>
          <CodeBlock code={automationSuite.setup.join("\n")} language="shell" label="terminal" />
        </div>
        <div>
          <h3>Run</h3>
          <CodeBlock code={automationSuite.run.join("\n")} language="shell" label="terminal" />
        </div>
      </div>
    </Section>
  );
}
