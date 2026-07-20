import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, FaNodeJs, FaPython, FaDocker, 
  FaAws, FaGitAlt, FaFigma 
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiMongodb, SiPostgresql, SiTypescript,
  SiNextdotjs, SiGraphql, SiJest, SiWebpack
} from 'react-icons/si';

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "C", icon: "💻" },
      { name: "Python", icon: "🐍" },
      { name: "JavaScript", icon: "🟨" },
      { name: "HTML5", icon: "🌐" }
    ]
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: <FaReact />, color: "#61DAFB" },
      { name: "CSS3", icon: "🎨" },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4" },
      { name: "Vite", icon: "⚡" }
    ]
  },
  {
    title: "Backend & Tools",
    skills: [
      { name: "Django", icon: "🎯" },
      { name: "Git", icon: <FaGitAlt />, color: "#F05032" },
      { name: "GitHub", icon: "🐙" },
      { name: "SQLite", icon: "🗄️" }
    ]
  }
];
const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl font-bold mb-4 text-center text-[#F6F1EB]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Skills & <span className="text-[#D8C3A5]">Technologies</span>
          </motion.h2>
          <motion.p 
            className="text-[#B7B7B7] text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Technologies I work with to build robust and beautiful applications.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="bg-[#262626] p-6 rounded-xl border border-[#3A3A3A] hover:border-[#D8C3A5]/30 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-4 text-[#D8C3A5]">{category.title}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {category.skills.map((skill, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#3A3A3A]/50 transition"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <span className="text-2xl" style={{ color: skill.color }}>{skill.icon}</span>
                      <span className="text-sm font-medium text-[#F6F1EB]">{skill.name}</span>
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