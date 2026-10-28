// Personal details shown across the site. Edit here — components read from this file.

export const profile = {
  name: "Rafael Espinosa",
  firstName: "Rafael",
  title: "QA Engineer | Manual & Automation Testing",
  headline: "Breaking bugs. Building quality.",
  intro:
    "I'm a QA Engineer who tests web and mobile applications — writing clear test cases, " +
    "chasing down defects until they can be reproduced, and automating UI and API tests " +
    "with Python, Playwright and Postman.",
  employer: "TraxionTech",
  email: "rafaelespinosa0915@gmail.com",
  github: "https://github.com/heyyraff",
  linkedin: "https://www.linkedin.com/in/espinosa-rafael-carbajal-5343043ab/",

  // Resume: put the PDF in /public (e.g. public/Rafael-Espinosa-Resume.pdf) and set the
  // file name below, e.g. "Rafael-Espinosa-Resume.pdf". While this is null the site shows
  // a "Request my resume" email link instead of a download button.
  // Kept null on purpose: the current resume PDF includes a phone number, which shouldn't be
  // public. Resume requests go by email instead.
  resumeFile: null,
};

export const about = [
  "I'm a QA Software Engineer at TraxionTech, where I started as a QA intern in February 2026, " +
    "and a 2026 BS Information Technology graduate. My work centres on systematic testing, " +
    "grounded in the SDLC and STLC: understanding what a feature is supposed " +
    "to do, designing positive and negative scenarios around it, and documenting test cases " +
    "that someone else can pick up and run.",
  "When something breaks, I investigate until I can describe exactly how to reproduce it, " +
    "then write a defect report a developer can act on without a follow-up meeting. I work " +
    "closely with developers to clarify expected behaviour and to verify fixes once they land.",
  "Alongside manual testing, I build test automation: UI tests with Python and Playwright, and " +
    "API tests with Postman, turning repeatable checks into reliable automated regression tests.",
];
