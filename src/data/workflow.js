export const workflow = [
  {
    step: "Requirement Analysis",
    detail:
      "Read the requirements and designs, list what must be true, and raise questions before any testing starts.",
  },
  {
    step: "Test Planning",
    detail: "Decide scope, priorities, environments, test data and what is out of scope.",
  },
  {
    step: "Test Case Design",
    detail:
      "Write positive and negative cases with preconditions, steps, data and a clear expected result.",
  },
  {
    step: "Test Execution",
    detail: "Run the cases, record the actual result and keep evidence for anything unexpected.",
  },
  {
    step: "Defect Reporting",
    detail:
      "Log each defect with exact reproduction steps, expected vs actual, environment and severity.",
  },
  {
    step: "Retesting",
    detail: "Verify each fix with the original steps and data, then close or reopen the defect.",
  },
  {
    step: "Regression Testing",
    detail: "Re-run the surrounding features to confirm the fix didn't break anything else.",
  },
  {
    step: "QA Sign-off",
    detail: "Summarise what was tested, what passed and any known risks, so the team can release with confidence.",
  },
];
