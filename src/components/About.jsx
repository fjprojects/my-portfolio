import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section
      id="about"
      className="py-20 px-4 bg-[#1A1A1A] relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#D8C3A5] blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#B08968] blur-3xl" />
      </div>

      <div className="container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            className="text-4xl font-bold mb-8 text-center text-[#F6F1EB]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            About <span className="text-[#D8C3A5]">Me</span>
          </motion.h2>

          <motion.div
            className="space-y-6 text-[#B7B7B7] text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              I'm a Computer Science student who enjoys building modern web
              applications and learning through real projects. I enjoy turning
              ideas into clean, responsive, and interactive websites using
              React and modern frontend tools.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              Alongside frontend development, I've explored backend development
              with Django and Python while building projects such as OcuSense
              Arena, an eye-health monitoring web application. Every project
              helps me improve my problem-solving skills and understand how
              complete web applications are built.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              I'm currently expanding my knowledge in full-stack development,
              data structures, and software engineering while continuously
              building projects, learning new technologies, and preparing for
              internship opportunities.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;