// The code shown on the site is imported straight from automation/tests, so it can never
// drift from what actually runs.
import navigationTests from "../../automation/tests/test_navigation.py?raw";
import projectTests from "../../automation/tests/test_projects.py?raw";
import contactTests from "../../automation/tests/test_contact.py?raw";
import themeTests from "../../automation/tests/test_theme.py?raw";
import conftest from "../../automation/tests/conftest.py?raw";

export const automationSuite = {
  title: "Portfolio self-test suite",
  description:
    "pytest + Playwright tests that check this website: navigation, the mobile menu, project " +
    "filters, the details dialog, contact links and the theme toggle. A shared fixture fails any test if the page " +
    "logs a console error.",
  // Leave null until the repository is on GitHub, then paste its URL here.
  repoUrl: "https://github.com/heyyyyRaf/Portfolio/tree/main/automation",
  setup: [
    "cd automation",
    "python -m venv .venv",
    ".venv\\Scripts\\activate        # macOS/Linux: source .venv/bin/activate",
    "pip install -r requirements.txt",
    "playwright install chromium",
  ],
  run: [
    "# in the project root, build and serve the site",
    "npm run build && npm run preview",
    "# in a second terminal, inside automation/",
    "pytest",
  ],
  // Only record a result you actually ran. `null` hides the results panel.
  lastRun: {
    summary: "10 of 10 tests passed",
    details: "Chromium, 9 Nov 2026, about 14 s",
  },
  // Real Playwright screen recordings of each test, made with
  // `pytest --video on --slowmo 1500` and copied from automation/test-results to public/recordings.
  // Written in plain language so that someone who doesn't read code can follow along.
  recordings: [
    {
      src: "recordings/nav-link-scrolls-to-its-section.webm",
      title: "Menu links go to the right section",
      checks: "Clicks “Contact” in the top menu and confirms that the page scrolls to the Contact section.",
      file: "test_navigation.py",
    },
    {
      src: "recordings/mobile-menu-opens-and-closes.webm",
      title: "The mobile menu works on a phone-sized screen",
      checks: "Shrinks the window to phone size, opens the menu, picks “Projects”, and confirms that the menu closes and the page lands on Projects.",
      file: "test_navigation.py",
    },
    {
      src: "recordings/filter-shows-only-matching-projects.webm",
      title: "Project filters show only matching projects",
      checks: "Picks the “Automation” filter and confirms that only the 2 automation projects stay visible.",
      file: "test_projects.py",
    },
    {
      src: "recordings/project-in-several-categories-shows-under-each.webm",
      title: "A project appears under every category it belongs to",
      checks: "Switches between Mobile, Web and Automation and confirms that the Financial Services project shows up under each one.",
      file: "test_projects.py",
    },
    {
      src: "recordings/all-filter-restores-every-project.webm",
      title: "“All” brings every project back",
      checks: "Filters down to Mobile (2 projects), then picks “All” and confirms that all 7 projects return.",
      file: "test_projects.py",
    },
    {
      src: "recordings/project-details-open-and-close-with-escape.webm",
      title: "Project details open and close",
      checks: "Opens a project's details window and confirms that the Escape key closes it again.",
      file: "test_projects.py",
    },
    {
      src: "recordings/contact-links-point-to-real-profiles.webm",
      title: "Contact links are correct",
      checks: "Confirms that the email, GitHub and LinkedIn links point to the right addresses.",
      file: "test_contact.py",
    },
    {
      src: "recordings/no-resume-download-until-a-file-is-configured.webm",
      title: "No broken resume download",
      checks: "Confirms that the page has no “Download resume” link that leads nowhere, and that the “Request my resume” link opens an email instead.",
      file: "test_contact.py",
    },
    {
      src: "recordings/theme-toggle-switches-and-is-remembered.webm",
      title: "Light/dark mode switches and is remembered",
      checks: "Switches to light mode, reloads the page, confirms that light mode is still on, then switches back.",
      file: "test_theme.py",
    },
    {
      src: "recordings/code-panels-stay-dark-in-light-mode.webm",
      title: "Code stays readable in light mode",
      checks: "Switches to light mode and confirms that the code panels keep their readable colours.",
      file: "test_theme.py",
    },
  ],
  files: [
    {
      name: "test_navigation.py",
      purpose: "Menu links scroll to their section; the mobile menu opens, closes and navigates.",
      assertions: ["URL ends with the section anchor", "Section heading is in the viewport", "aria-expanded toggles"],
      code: navigationTests,
    },
    {
      name: "test_projects.py",
      purpose: "Project filters show only matching cards; the details dialog opens and closes with Escape.",
      assertions: ["Filter button is pressed", "Exact card count", "Dialog visible, then hidden"],
      code: projectTests,
    },
    {
      name: "test_contact.py", 
      purpose: "Email, GitHub and LinkedIn links are correct; no dead resume download.",
      assertions: ["Exact href values", "No 'Download resume' link without a file"],
      code: contactTests,
    },
    {
      name: "test_theme.py",
      purpose: "The light/dark toggle switches the theme, remembers it after a reload, and keeps code readable.",
      assertions: ["data-theme attribute changes", "Choice survives a reload", "Code text keeps its colour"],
      code: themeTests,
    },
    {
      name: "conftest.py",
      purpose: "Shared fixture: opens the site and fails the test on any console or page error.",
      assertions: ["No console errors during the test"],
      code: conftest,
    },
  ],
};
