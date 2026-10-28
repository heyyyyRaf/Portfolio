import { LEVELS, skillGroups } from "../data/skills.js";
import { Icon } from "./icons.jsx";
import Section from "./Section.jsx";
import "./Skills.css";

const LEVEL_TAG = { "hands-on": "tag-cyan", learning: "tag-violet", confirm: "tag-confirm" };

export function LevelTag({ level }) {
  return <span className={`tag ${LEVEL_TAG[level]}`}>{LEVELS[level].label}</span>;
}

// The legend only explains labels that are actually used below.
const usedLevels = new Set(skillGroups.flatMap((group) => group.skills.map((skill) => skill.level)));

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="skills"
      title="Technical skills"
      lead="Grouped by area, with an honest label on each skill."
    >
      <ul className="skills-legend" aria-label="What the labels mean">
        {Object.entries(LEVELS).filter(([key]) => usedLevels.has(key)).map(([key, { description }]) => (
          <li key={key}>
            <LevelTag level={key} /> <span>{description}</span>
          </li>
        ))}
      </ul>

      <div className="skills-grid">
        {skillGroups.map((group) => (
          <article key={group.id} className="card skill-panel" aria-labelledby={`skills-${group.id}`}>
            <header className="skill-panel-head">
              <span className="skill-panel-icon">
                <Icon name={group.icon} size={18} />
              </span>
              <h3 id={`skills-${group.id}`}>{group.title}</h3>
            </header>
            <ul className="skill-list">
              {group.skills.map((skill) => (
                <li key={skill.name}>
                  <span>{skill.name}</span>
                  <LevelTag level={skill.level} />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
