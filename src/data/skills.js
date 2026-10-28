// Skill levels are deliberately different — don't mark everything as "hands-on".
//   hands-on  → used in real work
//   learning  → actively practising, not yet production experience
//   confirm   → listed but not yet confirmed; shown with a "To confirm" tag until you change it

export const LEVELS = {
  "hands-on": { label: "Hands-on", description: "Used in real work" },
  learning: { label: "Learning", description: "Actively practising" },
  confirm: { label: "To confirm", description: "Not yet confirmed" },
};

export const skillGroups = [
  {
    id: "manual",
    title: "Manual & Functional Testing",
    icon: "ClipboardList",
    skills: [
      { name: "Manual Testing", level: "hands-on" },
      { name: "Functional Testing", level: "hands-on" },
      { name: "Regression Testing", level: "hands-on" },
      { name: "Positive & Negative Testing", level: "hands-on" },
      { name: "Test Case & Test Script Writing", level: "hands-on" },
      { name: "Bug Reporting & Retesting", level: "hands-on" },
    ],
  },
  {
    id: "web-mobile",
    title: "Web & Mobile Testing",
    icon: "Smartphone",
    skills: [
      { name: "Web Application Testing", level: "hands-on" },
      { name: "Mobile Application Testing", level: "hands-on" },
      { name: "UI/UX Validation against Figma", level: "hands-on" },    ],
  },
  {
    id: "automation",
    title: "Automation & API",
    icon: "Terminal",
    skills: [
      { name: "Python", level: "hands-on" },
      { name: "Playwright", level: "hands-on" },
      { name: "API Testing", level: "hands-on" },
      { name: "Postman", level: "hands-on" },
    ],
  },
  {
    id: "workflow",
    title: "Workflow & Collaboration",
    icon: "GitBranch",
    skills: [
      { name: "Agile / Scrum", level: "hands-on" },
      { name: "SDLC / STLC", level: "hands-on" },
      { name: "Git / GitHub", level: "hands-on" },
      { name: "VS Code", level: "hands-on" },
      { name: "Figma", level: "hands-on" },
      { name: "Microsoft Excel", level: "hands-on" },
      { name: "Microsoft Word", level: "hands-on" },
    ],
  },
];
