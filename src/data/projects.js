// Project cards. `kind` controls the label shown on each card:
//   "real"     → work you can show (only with permission; sanitize everything)
//   "practice" → your own practice project
//   "demo"     → a demonstration built on fictional data
// `category` is one filter id, or a list of ids for a project that spans several areas.
// Leave `repoUrl` as null until the repository exists — the button is hidden while it's null.
// Screenshots: put images in public/projects/ and list them as
//   { src: "projects/file.png", alt: "What the screenshot shows" }

export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "test-design", label: "Test design" },
  { id: "defects", label: "Defects" },
  { id: "automation", label: "Automation" },
];

export const KIND_LABELS = {
  real: "Real project",
  practice: "Practice project",
  demo: "Demonstration · fictional data",
};

export const KIND_TAGS = { real: "tag-green", practice: "tag-violet", demo: "tag-amber" };

export const projects = [
  // Real work at TraxionTech. Product names, screenshots and data stay confidential, so these
  // cards describe the type of product and my role only.
  {
    id: "financial-platform",
    title: "Financial Services Platform (Mobile & Web)",
    category: ["mobile", "web", "automation"],
    kind: "real",
    icon: "Wallet",
    summary:
      "QA for financial products with a customer mobile app and a web back-office used by operations staff. " +
      "Product names and data are kept confidential.",
    scope: [
      "Customer mobile app: account and transaction flows",
      "Web back-office: account management, verification review and approvals",
      "APIs behind the mobile and web apps",
    ],
    scenarios: [
      "Positive and negative scenarios written from business requirements",
      "Approval, status and security flows",
      "Regression and functional testing to validate bug fixes",
    ],
    role:
      "QA Software Engineer (started as QA intern). I write and execute test cases, report bugs and " +
      "enhancements, build UI test automation with Python and Playwright, and automate API tests with Postman.",
    tools: ["Python", "Playwright", "Postman", "Excel"],
    screenshots: [],
    repoUrl: null,
    link: { label: "See how I write tickets", href: "#bug-reports" },
  },
  {
    id: "fundraising-platform",
    title: "Fundraising Platform",
    category: "web",
    kind: "real",
    icon: "HandHeart",
    summary:
      "QA for an online fundraising platform. Product names and data are kept confidential.",
    scope: ["Functional testing of the main user flows", "Regression testing before releases"],
    scenarios: ["Positive and negative scenarios written from business requirements"],
    role: "Wrote and executed test cases, and reported and retested defects.",
    tools: ["Excel"],
    screenshots: [],
    repoUrl: null,
    link: { label: "See how I write test cases", href: "#test-cases" },
  },
  {
    id: "web-testing",
    title: "Web Application Testing",
    category: "web",
    kind: "demo",
    icon: "Globe",
    summary:
      "End-to-end functional testing of a fictional online store: sign-in, cart and checkout.",
    scope: [
      "Sign in, sign up and password reset",
      "Product search, cart and checkout",
      "Responsive layout checked against the Figma design",
    ],
    scenarios: [
      "Valid and invalid sign-in attempts",
      "Cart totals after quantity changes",
      "Checkout with valid, expired and declined cards",
    ],
    role: "Designed the scenarios, wrote the test cases and the defect reports shown on this site.",
    outcome: "Sample defects BUG-101 and BUG-103 below come from this demonstration.",
    tools: ["Chrome DevTools", "Figma", "Excel"],
    screenshots: [],
    repoUrl: null,
    link: { label: "See the sample tickets", href: "#bug-reports" },
  },
  {
    id: "mobile-testing",
    title: "Mobile Application Testing",
    category: "mobile",
    kind: "demo",
    icon: "Smartphone",
    summary:
      "Functional testing of a fictional mobile wallet, focusing on money-transfer flows and their edge cases.",
    scope: [
      "Send money to saved and new recipients",
      "Amount validation and balance updates",
      "Session handling across devices",
    ],
    scenarios: [
      "Amounts with too many decimals, zero and above-balance values",
      "Transfer history after a successful send",
      "Signing out when the password changes elsewhere",
    ],
    role: "Explored the flows, wrote negative scenarios and reported the validated defects.",
    outcome: "Sample defects BUG-102 and BUG-104 below come from this demonstration.",
    tools: ["Android emulator", "iOS simulator", "Excel"],
    screenshots: [],
    repoUrl: null,
    link: { label: "See the sample tickets", href: "#bug-reports" },
  },
  {
    id: "test-scripts",
    title: "QA Test Script Development",
    category: "test-design",
    kind: "demo",
    icon: "ClipboardList",
    summary:
      "Structured test cases with preconditions, steps, test data, expected and actual results, test type, priority, status and last tested date.",
    scope: ["Admin order management", "Checkout payments", "Wallet transfers"],
    scenarios: ["Positive and negative scenarios, grouped like a real test sheet", "Prioritised by business risk"],
    role: "Wrote every test case in the sample table, including the failed and blocked ones.",
    outcome:
      "Nine sample test cases: 5 pass, 2 fail (linked to bug reports), 1 blocked, 1 disregarded.",
    tools: ["Excel", "Test case template"],
    screenshots: [],
    repoUrl: null,
    link: { label: "Open the test case table", href: "#test-cases" },
  },
  {
    id: "defect-analysis",
    title: "Bug Reporting & Defect Analysis",
    category: "defects",
    kind: "demo",
    icon: "Bug",
    summary:
      "Bug and enhancement tickets a developer can act on: description, exact steps, actual vs expected, impact, severity and priority.",
    scope: ["Functional defects", "UI defects against Figma", "Session and security behaviour"],
    scenarios: ["Reproduced each defect at least twice before reporting", "Retested after each fix"],
    role: "Investigated, reproduced and documented each sample defect.",
    outcome: "Four bug tickets from Critical to Minor and one enhancement ticket, each with its current status.",
    tools: ["Ticket template", "Screen recording", "Chrome DevTools"],
    screenshots: [],
    repoUrl: null,
    link: { label: "See the sample tickets", href: "#bug-reports" },
  },
  {
    id: "playwright-automation",
    title: "Python + Playwright Automation",
    category: "automation",
    kind: "practice",
    icon: "Terminal",
    summary:
      "A pytest + Playwright suite that tests this portfolio itself: navigation, the mobile menu, project filters, dialogs and contact links.",
    scope: ["Navigation and mobile menu", "Project filters and details dialog", "Contact and resume links"],
    scenarios: [
      "Positive: links scroll to the right section",
      "Negative: Escape closes the dialog; no resume link while no file exists",
      "Every test fails if the page logs a console error",
    ],
    role: "Practice project — written to learn locators, assertions and fixtures in Playwright.",
    outcome: "See the Automation section for the code and how to run it.",
    tools: ["Python", "Playwright", "pytest"],
    screenshots: [],
    repoUrl: "https://github.com/heyyyyRaf/Portfolio/tree/main/automation",
    link: { label: "View the automation code", href: "#automation" },
  },
];
