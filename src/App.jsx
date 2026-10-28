import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import ProjectGrid from "./components/ProjectGrid.jsx";
import BugReports from "./components/BugReports.jsx";
import TestCaseTable from "./components/TestCaseTable.jsx";
import AutomationShowcase from "./components/AutomationShowcase.jsx";
import QAWorkflow from "./components/QAWorkflow.jsx";
import Education from "./components/Education.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <ProjectGrid />
        <BugReports />
        <TestCaseTable />
        <AutomationShowcase />
        <QAWorkflow />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
