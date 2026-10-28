import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "../data/profile.js";
import { useClosable } from "../lib/useClosable.js";
import ThemeToggle from "./ThemeToggle.jsx";
import "./Navbar.css";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#bug-reports", label: "QA work" },
  { href: "#automation", label: "Automation" },
  { href: "#contact", label: "Contact" },
];

// Sections that count as part of each menu item, for highlighting the current one.
const SECTION_TO_LINK = {
  about: "#about",
  skills: "#skills",
  experience: "#experience",
  projects: "#projects",
  "bug-reports": "#bug-reports",
  "test-cases": "#bug-reports",
  automation: "#automation",
  workflow: "#automation",
  education: "#contact",
  contact: "#contact",
};

export default function Navbar() {
  const menu = useClosable();
  const { open } = menu;
  const [active, setActive] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = Object.keys(SECTION_TO_LINK)
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(SECTION_TO_LINK[entry.target.id]);
        }
      },
      // A thin band near the top of the screen decides which section is "current".
      { rootMargin: "-30% 0px -65% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") menu.close();
    };
    const onResize = () => {
      // Desktop layout shows the links inline, so there is nothing to animate.
      if (window.innerWidth > 900) menu.closeNow();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className={`navbar ${scrolled || menu.visible ? "is-solid" : ""}`}>
      <div className="container navbar-inner">
        <a href="#top" className="brand" onClick={menu.close}>
          <span className="brand-mark" aria-hidden="true">
            RE
          </span>
          <span className="brand-name">{profile.name}</span>
        </a>

        <div className="nav-actions">
          <ThemeToggle />
          <button
            type="button"
            className="icon-btn nav-toggle"
            aria-expanded={open}
            aria-controls="main-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={menu.toggle}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>

        <nav
          aria-label="Main"
          id="main-menu"
          className={`nav-menu ${menu.visible ? "is-open" : ""} ${menu.closing ? "is-closing" : ""}`}
          onAnimationEnd={menu.onAnimationEnd}
        >
          <ul>
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active === link.href ? "true" : undefined}
                  onClick={menu.close}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
