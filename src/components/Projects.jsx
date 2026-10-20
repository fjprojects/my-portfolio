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
    title: "OcuSense AI",
    subtitle: "Eye Health Monitoring System",
    description:
      "A full-stack screen-wellness platform that uses computer vision to monitor blink rate, estimated screen distance, head position, focus duration, hydration, medicine reminders, and monitoring history.",
    tech: [
      "React",
      "Django",
      "MediaPipe",
      "Computer Vision",
      "Python",
      "Bootstrap",
    ],
    status: "completed",
    github: "https://github.com/fjprojects/OcuSense-AI",
    live: "https://ocusense-ai-13.onrender.com/",
  },
  {
    title: "Timberly",
    subtitle: "Furniture E-Commerce Platform",
    description:
      "A working furniture-shopping prototype with product and room filters, a persistent cart, stock-checked demo checkout, and order history. Built with React and Django; real payment and fulfillment integration remain planned.",
    tech: ["React","Vite","React Router","Django","REST API"],
    status: "in-progress",
    github: "https://github.com/fjprojects/my-portfolio/blob/feat/four-project-prototypes-20261020/project-studio/frontend/src/projects/Timberly.jsx",
    live: "#",
  },  {
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
    subtitle: "Public Transport Route Assistant",
    description:
      "A working route-planning prototype with stop discovery, timetable search, direct and one-transfer journeys, fare comparison, maps, and saved journeys. Uses clearly labelled synthetic route data.",
    tech: ["React","Django","REST API","Leaflet Maps","PostgreSQL Support"],
    status: "in-progress",
    github: "https://github.com/fjprojects/my-portfolio/blob/feat/four-project-prototypes-20261020/project-studio/frontend/src/projects/BusApp.jsx",
    live: "#",
  },  {
    title: "LabTwin",
    subtitle: "AI-Powered Adaptive Lab Tutoring Platform",
    description:
      "An evolving AI-assisted programming lab and personalized tutoring platform with coding exercises, automatic test evaluation, targeted hints, practice recommendations, adaptive quizzes, viva-style assessments, and learner progress tracking. Multimodal learning and cited course-material answers are under development.",
    tech: [
      "React",
      "Django",
      "Python",
      "REST API",
      "AI Tutoring",
      "Adaptive Learning",
    ],
    status: "in-progress",
    github: "https://github.com/fjprojects/LabTwin-Track-D-2026",
    live: "#",
  },
  {
    title: "AI Recovery Assistant",
    subtitle: "Movement Measurement Prototype",
    description:
      "An experimental movement-measurement prototype with camera and local-video pose tracking, joint-angle measurements, full-cycle counting, adjustable targets, and session history. Clinical accuracy has not been validated.",
    tech: ["React","Django","MediaPipe Pose","Computer Vision","Python"],
    status: "in-progress",
    github: "https://github.com/fjprojects/my-portfolio/blob/feat/four-project-prototypes-20261020/project-studio/frontend/src/projects/MotionStudio.jsx",
    live: "#",
  },  {
    title: "GaitGuardian",
    subtitle: "Walking Pattern Explorer",
    description:
      "An experimental walking-pattern prototype with estimated steps, cadence, temporal symmetry, optional measured-distance speed, session comparisons, and CSV export. It does not provide validated fall-risk prediction.",
    tech: ["React","Django","MediaPipe Pose","Time-Series Analysis","Python"],
    status: "in-progress",
    github: "https://github.com/fjprojects/my-portfolio/blob/feat/four-project-prototypes-20261020/project-studio/frontend/src/projects/MotionStudio.jsx",
    live: "#",
  },];

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