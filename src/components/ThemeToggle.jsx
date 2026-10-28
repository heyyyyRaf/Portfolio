import { useState } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";

// index.html applies the saved theme before the page renders (no flash of the wrong theme);
// this button switches it and remembers the choice. Dark is the default.
const STORAGE_KEY = "theme";
const THEME_COLOR = { dark: "#0a0f1f", light: "#f6f8fc" };

function currentTheme() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(currentTheme);
  const next = theme === "dark" ? "light" : "dark";

  function apply() {
    if (next === "light") document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[next]);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (e.g. private mode); the theme still switches for this visit.
    }
    // Render the new icon now, so it is part of the crossfade below.
    flushSync(() => setTheme(next));
  }

  function toggle() {
    // Crossfade the whole page where the browser supports it; otherwise switch instantly.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (document.startViewTransition && !reduceMotion) document.startViewTransition(apply);
    else apply();
  }

  return (
    <button
      type="button"
      className="icon-btn theme-toggle"
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      onClick={toggle}
    >
      {theme === "dark" ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
    </button>
  );
}
