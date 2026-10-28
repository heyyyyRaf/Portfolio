// The code shown on the site is imported straight from automation/tests, so it can never
// drift from what actually runs.
import navigationTests from "../../automation/tests/test_navigation.py?raw";
import projectTests from "../../automation/tests/test_projects.py?raw";
import contactTests from "../../automation/tests/test_contact.py?raw";
import conftest from "../../automation/tests/conftest.py?raw";

export const automationSuite = {
  title: "Portfolio self-test suite",
  description:
    "pytest + Playwright tests that check this website: navigation, the mobile menu, project " +
    "filters, the details dialog and contact links. A shared fixture fails any test if the page " +
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
  lastRun: null,
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
      name: "conftest.py",
      purpose: "Shared fixture: opens the site and fails the test on any console or page error.",
      assertions: ["No console errors during the test"],
      code: conftest,
    },
  ],
};
