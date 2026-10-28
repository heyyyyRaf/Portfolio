import { useEffect, useRef } from "react";
import { ArrowRight, X } from "lucide-react";
import { KIND_LABELS, KIND_TAGS } from "../data/projects.js";
import { GitHubIcon } from "./icons.jsx";
import "./ProjectDetail.css";

function DetailList({ title, items }) {
  if (!items?.length) return null;
  return (
    <div className="detail-block">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// Uses the native <dialog>: it traps focus, closes on Escape and returns focus to the
// button that opened it.
export default function ProjectDetail({ project, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // A click on the backdrop lands on the <dialog> element itself.
  function onClick(e) {
    if (e.target === ref.current) ref.current.close();
  }

  return (
    <dialog ref={ref} className="project-dialog" aria-labelledby="project-dialog-title" onClose={onClose} onClick={onClick}>
      <div className="dialog-body">
        <header className="dialog-head">
          <div>
            <span className={`tag ${KIND_TAGS[project.kind]}`}>{KIND_LABELS[project.kind]}</span>
            <h2 id="project-dialog-title">{project.title}</h2>
          </div>
          <button type="button" className="icon-btn" aria-label="Close" onClick={() => ref.current.close()}>
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        <p className="dialog-summary">{project.summary}</p>

        <div className="detail-grid">
          <DetailList title="Scope" items={project.scope} />
          <DetailList title="Scenarios covered" items={project.scenarios} />
        </div>

        <div className="detail-block">
          <h3>My role</h3>
          <p>{project.role}</p>
        </div>
        {project.outcome && (
          <div className="detail-block">
            <h3>Outcome</h3>
            <p>{project.outcome}</p>
          </div>
        )}

        <div className="detail-block">
          <h3>Tools</h3>
          <ul className="project-tools">
            {project.tools.map((tool) => (
              <li key={tool} className="tag">
                {tool}
              </li>
            ))}
          </ul>
        </div>

        {project.screenshots.length > 0 && (
          <div className="detail-block">
            <h3>Screenshots</h3>
            <div className="detail-shots">
              {project.screenshots.map((shot) => (
                <img key={shot.src} src={`${import.meta.env.BASE_URL}${shot.src}`} alt={shot.alt} loading="lazy" />
              ))}
            </div>
          </div>
        )}

        <footer className="dialog-actions">
          {project.link && (
            <a className="btn btn-primary btn-sm" href={project.link.href} onClick={() => ref.current.close()}>
              {project.link.label} <ArrowRight size={16} aria-hidden="true" />
            </a>
          )}
          {project.repoUrl && (
            <a className="btn btn-secondary btn-sm" href={project.repoUrl} target="_blank" rel="noreferrer">
              <GitHubIcon size={16} /> Repository
            </a>
          )}
        </footer>
      </div>
    </dialog>
  );
}
