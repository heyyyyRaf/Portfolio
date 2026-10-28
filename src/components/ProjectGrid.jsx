import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { CATEGORIES, KIND_LABELS, KIND_TAGS, projects } from "../data/projects.js";
import { Icon } from "./icons.jsx";
import ProjectDetail from "./ProjectDetail.jsx";
import Section from "./Section.jsx";
import "./ProjectGrid.css";

export default function ProjectGrid() {
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState(null);

  // `category` is a single id or a list, for projects that span several areas.
  const visible =
    category === "all" ? projects : projects.filter((p) => [].concat(p.category).includes(category));

  return (
    <Section
      id="projects"
      eyebrow="projects"
      title="Featured projects"
      lead="Each card says what it is: real work (described in general terms to keep it confidential), a practice project, or a demonstration on fictional data."
    >
      <div className="project-filters" role="group" aria-label="Filter projects by category">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            className="filter-btn"
            aria-pressed={category === c.id}
            onClick={() => setCategory(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <p className="visually-hidden" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      <div className="project-grid">
        {visible.map((project) => (
          <article key={project.id} className="card project-card" aria-labelledby={`project-${project.id}`}>
            <div className="project-card-top">
              <span className="project-icon">
                <Icon name={project.icon} size={20} />
              </span>
              <span className={`tag ${KIND_TAGS[project.kind]}`}>{KIND_LABELS[project.kind]}</span>
            </div>
            <h3 id={`project-${project.id}`}>{project.title}</h3>
            <p className="project-summary">{project.summary}</p>
            <ul className="project-tools" aria-label="Tools">
              {project.tools.map((tool) => (
                <li key={tool} className="tag">
                  {tool}
                </li>
              ))}
            </ul>
            <button type="button" className="btn btn-secondary btn-sm project-open" onClick={() => setSelected(project)}>
              View details<span className="visually-hidden"> about {project.title}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>

      {selected && <ProjectDetail project={selected} onClose={() => setSelected(null)} />}
    </Section>
  );
}
