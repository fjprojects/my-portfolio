import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="py-20 px-4 bg-[#1A1A1A] relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#D8C3A5] blur-3xl" />

        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#B08968] blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#D8C3A5] to-[#B08968]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            About Me
          </motion.h2>

          <motion.div
            className="space-y-6 text-[#B7B7B7] text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              I'm a B.Tech Computer Science and Engineering student at Christ
              College of Engineering, Thrissur. I enjoy designing and
              developing useful web applications with React, JavaScript,
              Django, and Python.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              I work on LabTwin, an AI-powered learning platform for programming
              practice, adaptive assessments, and student progress tracking.
              I'm also developing my full-stack and computer-vision skills
              through OcuSense AI. These projects help me learn about
              software architecture, testing, and building real products.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              I'm strengthening my foundations in data structures and algorithms,
              backend engineering, databases, and software testing.
              I'm open to software engineering internships, hackathon teams,
              and collaboration with developers who enjoy solving problems.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;