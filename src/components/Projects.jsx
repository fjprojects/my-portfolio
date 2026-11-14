import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaTools,
  FaClock,
} from "react-icons/fa";
const projects = [
  {
    title: "OcuSense AI 13",
    subtitle: "AI-Powered Eye Wellness Platform",
    description:
      "A full-stack eye-wellness platform with webcam-based blink monitoring, screen-distance and posture cues, focus tracking, hydration and medicine reminders, and monitoring history. The React frontend is deployed on Vercel and connects to the Django API hosted on Render.",
    tech: [
      "React",
      "Create React App",
      "Django",
      "MediaPipe",
      "Computer Vision",
      "Python",
      "Vercel",
      "Render",
    ],
    status: "completed",
    github: "https://github.com/fjprojects/OcuSense-AI",
    live: "https://ocusense-ai-13-frontend.vercel.app/",
  },
  {
    title: "Timberly",
    subtitle: "Full-Stack Furniture E-Commerce Platform",
    description:
      "A full-stack furniture storefront with searchable and filterable products, product detail pages, a persistent cart, JWT authentication, demo checkout, order history, contact submissions, and Django admin management.",
    tech: [
      "React",
      "Vite",
      "Django",
      "Django REST Framework",
      "PostgreSQL-ready",
      "JWT",
    ],
    status: "completed",
    github: "https://github.com/fjprojects/Timberly",
    live: "https://timberly-store.onrender.com/",
  },
  {
    title: "ArthaShield",
    subtitle: "Privacy-First Financial Companion",
    description:
      "A privacy-focused finance platform that imports bank statements and SMS alerts, categorises transactions, distinguishes recurring commitments from spending patterns, detects own-account transfers, and provides an EMI reality check using XIRR. Financial figures are calculated by deterministic Python logic; optional AI commentary receives sanitized data and never performs the arithmetic.",
    tech: [
      "React",
      "Vite",
      "Django REST Framework",
      "Python",
      "Financial Analytics",
      "PII Sanitization",
      "PostgreSQL",
    ],
    status: "completed",
    github: "https://github.com/fjprojects/Arthasheild",
    live: "https://arthasheild.vercel.app/",
  },
  {
    title: "Developer Portfolio",
    subtitle: "Personal Portfolio Website",
    description:
      "A modern responsive portfolio showcasing my projects, technical skills, certificates, education, and contact information with smooth motion effects and reusable components.",
    tech: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "React Router",
    ],
    status: "completed",
    github: "https://github.com/fjprojects/my-portfolio",
    live: "https://francis-portfolio-bqnn.onrender.com/",
  },
  {
    title: "Bus Route Information System",
    subtitle: "Public Transport Route Discovery Prototype",
    description:
      "An interactive route-discovery starter with sample stops, direct-route comparisons, estimated journey times, and visible stop sequences. It uses an illustrative network only; live operator feeds, verified timetables, and real journey planning are not connected yet.",
    tech: [
      "HTML",
      "CSS",
      "JavaScript",
      "Route Comparison",
      "Responsive UI",
      "Sample Network",
    ],
    status: "in-progress",
    github: "https://github.com/fjprojects/my-portfolio/blob/main/public/demos/bus-route/index.html",
    live: "https://francis-portfolio-bqnn.onrender.com/demos/bus-route/",
  },
  {
    title: "LabTwin Alexa+",
    subtitle: "Voice-First AI Learning Companion",
    description:
      "An Alexa+-style learning companion that uses browser voice interaction, multi-turn context, grounded course-note retrieval with source citations, adaptive quizzes, server-side answer grading, and Bayesian Knowledge Tracing (BKT) to recommend what learners should study next. Built as an independent hackathon prototype; it is not an official Amazon Alexa+ skill.",
    tech: [
      "React",
      "Django",
      "Web Speech API",
      "RAG",
      "JWT",
      "Bayesian Knowledge Tracing",
    ],
    status: "completed",
    github: "#",
    live: "https://labtwin-frontend.onrender.com/",
  },
  {
    title: "LabTwin — Track D",
    subtitle: "Multimodal AI Tutoring & Adaptive Programming Lab",
    description:
      "A multimodal learning platform where teachers upload PDFs, slide decks and lecture recordings; students get source-cited tutoring, verified adaptive assessments, BKT-based learning paths, Python/C/Java programming practice with hidden-test evaluation, progressive hints and viva practice. The React/Vite frontend is deployed on Vercel and proxies /api requests to the Django service on Render. Optional speech/vision services and semantic LLM judging still require live-provider validation.",
    tech: [
      "React 19",
      "Vite",
      "Django",
      "Python",
      "Chroma RAG",
      "Bayesian Knowledge Tracing",
      "Adaptive Assessments",
      "Code Evaluation",
      "Vercel",
      "Render",
    ],
    status: "in-progress",
    github: "https://github.com/fjprojects/LabTwin-Track-D-2026",
    live: "https://labtwin-track-d-frontend.vercel.app/",
  },
  {
    title: "AI Recovery Assistant",
    subtitle: "Movement Session & Feedback Prototype",
    description:
      "An early interactive prototype for choosing an exercise, stepping through simulated repetitions, and reviewing movement cues and session progress. This build uses illustrative values only; it does not connect to a camera, measure joint angles, assess technique, or provide medical advice. A future React/Django/MediaPipe Pose pipeline is not implemented yet.",
    tech: [
      "HTML",
      "CSS",
      "JavaScript",
      "Interactive Session UI",
      "Movement Feedback Concept",
      "Computer Vision (Planned)",
    ],
    status: "in-progress",
    github: "https://github.com/fjprojects/my-portfolio/blob/main/public/demos/ai-recovery/index.html",
    live: "https://francis-portfolio-bqnn.onrender.com/demos/ai-recovery/",
  },
  {
    title: "GaitGuardian",
    subtitle: "Mobility Insights & Gait Data Prototype",
    description:
      "An early mobility dashboard with sample trend visualisation and client-side CSV import for left/right step timing, walking speed, and a dataset-provided balance measure. It runs in the browser and does not diagnose, predict falls, or assign risk levels. A future React/Django/MediaPipe Pose/OpenCV pipeline is not implemented yet.",
    tech: [
      "HTML",
      "CSS",
      "JavaScript",
      "CSV Import",
      "SVG Data Visualisation",
      "Computer Vision (Planned)",
    ],
    status: "in-progress",
    github: "https://github.com/fjprojects/my-portfolio/blob/main/public/demos/gaitguardian/index.html",
    live: "https://francis-portfolio-bqnn.onrender.com/demos/gaitguardian/",
  },
];

const statusConfig = {
  completed: {
    label: "Completed",
    icon: FaCheckCircle,
    className:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  "in-progress": {
    label: "In Progress",
    icon: FaTools,
    className:
      "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  upcoming: {
    label: "Upcoming",
    icon: FaClock,
    className:
      "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
};

const ProjectLink = ({ href, icon, children }) => {
  const unavailable = !href || href === "#";

  if (unavailable) {
    return (
      <span
        className="flex items-center gap-2 text-sm text-[#777777] cursor-not-allowed"
        title="Not available yet"
      >
        {icon}
        {children}
      </span>
    );
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-sm text-[#B7B7B7] hover:text-[#D8C3A5] transition-colors"
      whileHover={{ x: 3 }}
    >
      {icon}
      {children}
    </motion.a>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 bg-[#1A1A1A]">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl font-bold mb-4 text-center text-[#F6F1EB]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Featured{" "}
            <span className="text-[#D8C3A5]">Projects</span>
          </motion.h2>

          <motion.p
            className="text-[#B7B7B7] text-center max-w-2xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Full-stack, computer-vision, healthcare, and transport
            projects I have completed, am developing, or plan to build.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const status =
                statusConfig[project.status] || statusConfig.upcoming;

              const StatusIcon = status.icon;

              return (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.55,
                  }}
                  whileHover={{
                    y: -8,
                    borderColor: "#D8C3A5",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                  }}
                  className="bg-[#262626] rounded-xl p-6 border border-[#3A3A3A] transition-all duration-300 flex flex-col min-h-[420px]"
                >
                  <div className="flex justify-between items-start gap-3 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#F6F1EB]">
                        {project.title}
                      </h3>

                      <p className="text-sm text-[#D8C3A5] mt-1">
                        {project.subtitle}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${status.className}`}
                    >
                      <StatusIcon />
                      {status.label}
                    </span>
                  </div>

                  <p className="text-[#B7B7B7] text-sm mb-5 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((technology) => (
                      <motion.span
                        key={technology}
                        className="text-xs px-3 py-1 bg-[#D8C3A5]/10 text-[#D8C3A5] rounded-full border border-[#D8C3A5]/10"
                        whileHover={{ scale: 1.06 }}
                      >
                        {technology}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex items-center gap-5 pt-4 mt-auto border-t border-[#3A3A3A]">
                    <ProjectLink
                      href={project.github}
                      icon={<FaGithub />}
                    >
                      Code
                    </ProjectLink>

                    <ProjectLink
                      href={project.live}
                      icon={<FaExternalLinkAlt />}
                    >
                      Live Demo
                    </ProjectLink>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;