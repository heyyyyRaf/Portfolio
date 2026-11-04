import { experience } from "../data/experience.js";
import { useTimelineProgress } from "../lib/useTimelineProgress.js";
import Section from "./Section.jsx";
import "./Experience.css";

export default function Experience() {
  const timelineRef = useTimelineProgress();
  return (
    <Section id="experience" eyebrow="experience" title="Professional experience">
      <ol ref={timelineRef} className="timeline">
        {experience.map((job) => (
          <li key={`${job.company}-${job.role}`} className="timeline-item">
            <span className="timeline-marker" aria-hidden="true" />
            <article className="card job-card">
              <header className="job-head">
                <div>
                  <h3>{job.role}</h3>
                  <p className="job-company">{job.company}</p>
                </div>
                <div className="job-meta">
                  <span className="mono">{job.period}</span>
                  {job.current && <span className="tag tag-green">Current role</span>}
                </div>
              </header>
              <p className="job-summary">{job.summary}</p>
              <ul className="job-list">
                {job.responsibilities.map((item) => (
                  <li key={item.text}>
                    <span>{item.text}</span>
                    {!item.confirmed && <span className="tag tag-confirm">To confirm</span>}
                  </li>
                ))}
              </ul>
              {job.learning && (
                <p className="job-learning">
                  <strong>Learning on the side:</strong> {job.learning}
                </p>
              )}
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
