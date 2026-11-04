import { bugReports } from "../data/bugs.js";
import { projects } from "../data/projects.js";
import { skillGroups } from "../data/skills.js";
import { testCases } from "../data/testCases.js";
import { useCountUp } from "../lib/useCountUp.js";
import { useReveal } from "../lib/useReveal.js";
import "./Stats.css";

// Counted from the site's own data, so the numbers stay true as content is added or removed.
const STATS = [
  { value: projects.length, label: "projects" },
  { value: testCases.length, label: "sample test cases" },
  { value: bugReports.length, label: "sample tickets" },
  { value: skillGroups.flatMap((group) => group.skills).length, label: "skills" },
];

// Each number counts up from 0 whenever the row comes into view.
export default function Stats() {
  const [ref, position] = useReveal();
  return (
    <dl ref={ref} className="stats" aria-label="Portfolio at a glance">
      {STATS.map((stat) => (
        <Stat key={stat.label} {...stat} active={position === "visible"} />
      ))}
    </dl>
  );
}

// The counting number is hidden from screen readers, which get the final value instead.
function Stat({ value, label, active }) {
  const shown = useCountUp(value, active);
  return (
    <div>
      <dt>{label}</dt>
      <dd>
        <span aria-hidden="true" style={{ minWidth: `${String(value).length}ch` }}>
          {shown}
        </span>
        <span className="visually-hidden">{value}</span>
      </dd>
    </div>
  );
}
