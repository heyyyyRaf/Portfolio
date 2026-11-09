import { useRef, useState } from "react";
import { CircleCheck, Play } from "lucide-react";
import { automationSuite } from "../data/automation.js";
import CodeBlock from "./CodeBlock.jsx";
import { GitHubIcon } from "./icons.jsx";
import Section from "./Section.jsx";
import "./AutomationShowcase.css";

// Real recordings of the browser while the tests drive it, for viewers who don't read code.
function RecordingPlayer({ recordings }) {
  const [current, setCurrent] = useState(0);
  const [picked, setPicked] = useState(false);
  const rec = recordings[current];

  function choose(i) {
    setCurrent(i);
    setPicked(true);
  }

  return (
    <div className="auto-watch card">
      <div className="auto-watch-head">
        <h3>Watch the tests run</h3>
        <p>
          Real screen recordings: no one is touching the mouse. The test script clicks, types and checks the
          page by itself, then marks the scenario as passed. Slowed down so you can follow each step.
        </p>
      </div>
      <div className="auto-watch-body">
        <figure className="auto-video">
          <video
            key={rec.src}
            src={rec.src}
            controls
            muted
            loop
            playsInline
            preload="metadata"
            autoPlay={picked}
            aria-label={`Recording of the test: ${rec.title}`}
          />
          <figcaption>
            <span className="auto-pass">
              <CircleCheck size={15} aria-hidden="true" /> Passed
            </span>
            <strong>{rec.title}</strong>
            <span>{rec.checks}</span>
            <span className="auto-video-file mono">automation/tests/{rec.file}</span>
          </figcaption>
        </figure>
        <ol className="auto-scenarios" aria-label="Recorded scenarios">
          {recordings.map((r, i) => (
            <li key={r.src}>
              <button
                type="button"
                className="auto-scenario"
                aria-current={i === current ? "true" : undefined}
                onClick={() => choose(i)}
              >
                <Play size={14} aria-hidden="true" />
                <span>{r.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function AutomationShowcase() {
  const { files, lastRun, repoUrl, recordings } = automationSuite;
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

      {recordings?.length > 0 && <RecordingPlayer recordings={recordings} />}

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
              Assertions
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
