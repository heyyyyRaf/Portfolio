import { useEffect, useRef, useState } from "react";
import { Check, Copy, Download, Mail } from "lucide-react";
import { profile } from "../data/profile.js";
import { resumeHref, resumeRequestHref } from "../lib/resume.js";
import { GitHubIcon, LinkedInIcon } from "./icons.jsx";
import "./Contact.css";

export default function Contact() {
  const [copied, setCopied] = useState(null); // null | "ok" | "failed"
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied("ok");
    } catch {
      setCopied("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(null), 2000);
  }

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-card card">
          <p className="eyebrow">contact</p>
          <h2 id="contact-title" className="section-title">
            Let's talk
          </h2>
          <p className="section-lead">
            I'm open to QA Engineer roles. The fastest way to reach me is email. I'll reply as soon as I can.
          </p>

          <div className="contact-email">
            <a className="btn btn-primary" href={`mailto:${profile.email}`}>
              <Mail size={18} aria-hidden="true" />
              {profile.email}
            </a>
            <button type="button" className="btn btn-secondary" onClick={copyEmail}>
              {copied === "ok" ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
              {copied === "ok" ? "Copied" : copied === "failed" ? "Couldn't copy" : "Copy email"}
            </button>
            <span className="visually-hidden" aria-live="polite">
              {copied === "ok" ? "Email address copied" : ""}
            </span>
          </div>

          <ul className="contact-links">
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <GitHubIcon />
                <span>
                  GitHub
                  <small>github.com/heyyyyRaf</small>
                </span>
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <LinkedInIcon />
                <span>
                  LinkedIn
                  <small>Rafael Espinosa</small>
                </span>
              </a>
            </li>
            <li>
              {resumeHref ? (
                <a href={resumeHref} download>
                  <Download size={20} aria-hidden="true" />
                  <span>
                    Download resume
                    <small>PDF</small>
                  </span>
                </a>
              ) : (
                <a href={resumeRequestHref}>
                  <Mail size={20} aria-hidden="true" />
                  <span>
                    Request my resume
                    <small>By email</small>
                  </span>
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
