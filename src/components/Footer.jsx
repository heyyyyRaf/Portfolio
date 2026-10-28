import { profile } from "../data/profile.js";
import { GitHubIcon, LinkedInIcon } from "./icons.jsx";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {profile.name} · Built with React and Vite, tested with Playwright.
        </p>
        <div className="footer-links">
          <a className="icon-btn" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile (opens in a new tab)">
            <GitHubIcon size={18} />
          </a>
          <a className="icon-btn" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile (opens in a new tab)">
            <LinkedInIcon size={18} />
          </a>
          <a className="btn btn-ghost btn-sm" href="#top">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
