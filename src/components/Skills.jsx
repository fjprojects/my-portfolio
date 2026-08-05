import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaGitAlt } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "C", icon: "💻" },
      { name: "Python", icon: "🐍" },
      { name: "JavaScript", icon: "🟨" },
      { name: "HTML5", icon: "🌐" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      {
        name: "React",
        icon: <FaReact />,
        color: "#61DAFB",
      },
      {
        name: "CSS3",
        icon: "🎨",
      },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss />,
        color: "#06B6D4",
      },
      {
        name: "Vite",
        icon: "⚡",
      },
    ],
  },
  {
    title: "Backend & Tools",
    skills: [
      {
        name: "Django",
        icon: "🎯",
      },
      {
        name: "Git",
        icon: <FaGitAlt />,
        color: "#F05032",
      },
      {
        name: "GitHub",
        icon: "🐙",
      },
      {
        name: "SQLite",
        icon: "🗄️",
      },
    ],
  },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-20 px-4 bg-[#111111] relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#D8C3A5]/10 blur-[140px]" />

        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#B08968]/10 blur-[160px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#D8C3A5] to-[#B08968]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Skills & Technologies
          </motion.h2>

          <motion.p
            className="text-[#B7B7B7] text-center max-w-2xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Technologies I use to build responsive, interactive, and practical
            web applications.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.6,
                }}
                whileHover={{
                  y: -8,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                  },
                }}
                className="bg-[#262626] p-6 rounded-xl border border-[#3A3A3A] hover:border-[#D8C3A5]/40 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-5 text-[#D8C3A5]">
                  {category.title}
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#3A3A3A]/50 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                      }}
                    >
                      <span
                        className="text-2xl flex items-center justify-center"
                        style={{ color: skill.color }}
                      >
                        {skill.icon}
                      </span>

                      <span className="text-sm font-medium text-[#F6F1EB]">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;