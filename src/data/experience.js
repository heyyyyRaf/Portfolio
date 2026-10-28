// Set `confirmed: true` on each responsibility once you've checked it's accurate.
// Unconfirmed items show a "To confirm" tag; delete any that don't apply.

export const experience = [
  {
    role: "QA Software Engineer",
    company: "TraxionTech Inc.",
    period: "Jul 2026 – Present",
    current: true,
    summary:
      "Testing web and mobile applications and building test automation for the UI and the API.",
    responsibilities: [
      { text: "Build automated tests with Python and Playwright.", confirmed: true },
      { text: "Automate API testing with Postman.", confirmed: true },
      { text: "Test web and mobile applications, manually and with automation.", confirmed: true },
    ],
  },
  {
    role: "Quality Assurance Intern",
    company: "TraxionTech Inc.",
    period: "Feb – Jun 2026",
    current: false,
    summary: "Internship on the QA team, working in an Agile development environment.",
    responsibilities: [
      { text: "Developed an automated testing system using Python and Playwright.", confirmed: true },
      {
        text: "Performed manual testing on web and mobile applications to verify functionality and identify defects.",
        confirmed: true,
      },
      {
        text: "Created, reviewed and executed test cases and test scenarios based on business requirements.",
        confirmed: true,
      },
      { text: "Validated bug fixes through regression and functional testing.", confirmed: true },
      { text: "Collaborated with developers and fellow QA testers in an Agile team.", confirmed: true },
    ],
  },
];

// Placeholders stay visible until you replace them with real values.
export const education = [
  {
    degree: "Bachelor of Science in Information Technology",
    degreeConfirmed: true,
    institution: "Colegio de Sta. Teresa de Avila",
    years: "2022 – 2026",
    graduation: "June 2026",
  },
];
