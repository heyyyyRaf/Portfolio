import { ArrowRight, Download, Mail } from "lucide-react";
import { profile } from "../data/profile.js";
import { resumeHref, resumeRequestHref } from "../lib/resume.js";
import { GitHubIcon, LinkedInIcon } from "./icons.jsx";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-role">
            <span className="status-dot" aria-hidden="true" />
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
            <span />
            <span />
            <span />
            <code>qa_engineer.py</code>
          </div>
          <pre className="hero-code">
            <code>
              <span className="tk-key">class</span> <span className="tk-fn">QAEngineer</span>:{"\n"}
              {"    "}name = <span className="tk-str">"{profile.name}"</span>{"\n"}
              {"    "}role = <span className="tk-str">"QA Software Engineer"</span>{"\n"}
              {"    "}company = <span className="tk-str">"{profile.employer}"</span>{"\n"}
              {"    "}since = <span className="tk-str">"Feb 2026"</span>{"\n"}
              {"    "}focus = [<span className="tk-str">"manual"</span>, <span className="tk-str">"automation"</span>, <span className="tk-str">"api"</span>]{"\n"}
              {"    "}tools = [<span className="tk-str">"Python"</span>, <span className="tk-str">"Playwright"</span>, <span className="tk-str">"Postman"</span>]{"\n"}
              {"\n"}
              {"    "}<span className="tk-key">def</span> <span className="tk-fn">test</span>(self, feature):{"\n"}
              {"        "}<span className="tk-key">assert</span> feature.works_as_designed(){"\n"}
              {"        "}<span className="tk-key">assert</span> feature.handles_bad_input(){"\n"}
            </code>
          </pre>
        </figure>
      </div>
    </section>
  );
}
