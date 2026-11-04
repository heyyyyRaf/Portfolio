import { ArrowRight, Download, Mail } from "lucide-react";
import { profile } from "../data/profile.js";
import { resumeHref, resumeRequestHref } from "../lib/resume.js";
import { useTyping } from "../lib/useTyping.js";
import { GitHubIcon, LinkedInIcon } from "./icons.jsx";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-role">
            {profile.title}
          </p>
          <h1 id="hero-title" className="hero-title">
            Breaking bugs.
            <br />
            <span>Building quality.</span>
          </h1>
          <p className="hero-intro">
            Hi, I'm <strong>{profile.name}</strong>. {profile.intro}
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              View Projects <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="btn btn-secondary" href="#contact">
              <Mail size={18} aria-hidden="true" /> Contact Me
            </a>
            {resumeHref ? (
              <a className="btn btn-ghost" href={resumeHref} download>
                <Download size={18} aria-hidden="true" /> Download resume
              </a>
            ) : (
              <a className="btn btn-ghost" href={resumeRequestHref}>
                <Mail size={18} aria-hidden="true" /> Request my resume
              </a>
            )}
          </div>

          <div className="hero-social">
            <a className="icon-btn" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile (opens in a new tab)">
              <GitHubIcon />
            </a>
            <a className="icon-btn" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile (opens in a new tab)">
              <LinkedInIcon />
            </a>
          </div>
        </div>

        <figure className="hero-card card" aria-label="Profile summary written as code">
          <div className="hero-card-bar" aria-hidden="true">
            <code>qa_engineer.py</code>
          </div>
          <TypedCode />
        </figure>
      </div>
    </section>
  );
}

// The profile card, as [text, syntax class] tokens so it can be typed out character by character.
const CODE = [
  ["class", "tk-key"], [" "], ["QAEngineer", "tk-fn"], [":\n    name = "], [`"${profile.name}"`, "tk-str"],
  ["\n    role = "], ['"QA Software Engineer"', "tk-str"],
  ["\n    focus = ["], ['"manual"', "tk-str"], [", "], ['"automation"', "tk-str"], [", "], ['"api"', "tk-str"],
  ["]\n    tools = ["], ['"Python"', "tk-str"], [", "], ['"Playwright"', "tk-str"], [", "], ['"Postman"', "tk-str"],
  ["]\n\n    "], ["def", "tk-key"], [" "], ["test", "tk-fn"], ["(self, feature):\n        "],
  ["assert", "tk-key"], [" feature.works_as_designed()\n        "],
  ["assert", "tk-key"], [" feature.handles_bad_input()"],
];
const CODE_TEXT = CODE.map(([text]) => text).join("");

// Not-yet-typed characters are rendered transparent rather than left out, so the card keeps its
// final size while typing and screen readers always get the whole text.
function TypedCode() {
  const typed = useTyping(CODE_TEXT);
  let offset = 0;
  let caretPlaced = false;
  const parts = [];
  CODE.forEach(([text, cls], i) => {
    const cut = Math.min(Math.max(typed - offset, 0), text.length);
    offset += text.length;
    if (cut > 0) parts.push(<span key={`${i}t`} className={cls}>{text.slice(0, cut)}</span>);
    if (!caretPlaced && typed < offset) {
      parts.push(<span key="caret" className="hero-caret" aria-hidden="true" />);
      caretPlaced = true;
    }
    if (cut < text.length) parts.push(<span key={`${i}r`} className={`${cls ?? ""} untyped`}>{text.slice(cut)}</span>);
  });
  if (!caretPlaced) parts.push(<span key="caret" className="hero-caret is-done" aria-hidden="true" />);
  return (
    <pre className="hero-code">
      <code>{parts}</code>
    </pre>
  );
}
