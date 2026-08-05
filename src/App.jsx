import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

import Home from "./pages/Home";
import AboutPage from "./pages/Aboutpage.jsx";
import SkillsPage from "./pages/Skillspage.jsx";
import ProjectsPage from "./pages/Projectspage.jsx";
import ContactPage from "./pages/Contactpage.jsx";
import CertificatesPage from "./pages/Certificatespage"; // ✅ Fixed: renamed import
import "./App.css";




function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#151515] text-[#F6F1EB] cursor-none">
      <CustomCursor />

      <Header />

      {/* Push content below fixed navbar */}
      <main className="flex-1 pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/#projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/certificates" element={<CertificatesPage />} /> 
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;