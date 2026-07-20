import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    title: "OcuSense AI - Eye Health Monitoring System",
    description:
      "Real-time eye health monitoring web application that uses computer vision to track blink patterns, screen usage, posture, and focus sessions through the device camera.",
    tech: [
      "React",
      "Django",
      "MediaPipe",
      "Computer Vision",
      "Python"
    ],
    github: "#",
    live: "#"
  },
  {
    title: "Timberly - E-Commerce Platform",
    description:
      "Modern furniture e-commerce website with responsive design, product browsing, category sections, shopping cart management, and interactive UI components.",
    tech: [
      "React",
      "Vite",
      "React Router",
      "Swiper",
      "Tailwind CSS"
    ],
    github: "#",
    live: "#"
  },
  {
    title: "Disease Predictor ML System",
    description:
      "Machine learning based disease prediction system that analyzes symptom data and predicts possible health conditions using classification algorithms.",
    tech: [
      "Python",
      "Machine Learning",
      "Jupyter Notebook",
      "Random Forest"
    ],
    github: "#",
    live: "#"
  },
  {
    title: "DNA Sequence Calculator",
    description:
      "Bioinformatics utility tool for analyzing DNA sequences with nucleotide counting, GC percentage calculation, and basic genetic sequence operations.",
    tech: [
      "Python",
      "C",
      "Bioinformatics"
    ],
    github: "#",
    live: "#"
  },
  {
    title: "Codon to Anticodon Converter",
    description:
      "Genetics-based application that converts RNA codons into corresponding anticodon sequences to demonstrate biological translation concepts.",
    tech: [
      "Python",
      "Genetics",
      "Biology"
    ],
    github: "#",
    live: "#"
  },
  {
    title: "Anemia Check Analyzer",
    description:
      "Healthcare analysis application that evaluates anemia-related parameters and provides basic insights from user-provided health data.",
    tech: [
      "Python",
      "Healthcare",
      "Data Analysis"
    ],
    github: "#",
    live: "#"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 bg-[#1A1A1A]">

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
            Featured <span className="text-[#D8C3A5]">Projects</span>
          </motion.h2>


          <motion.p
            className="text-[#B7B7B7] text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Projects combining software engineering, artificial intelligence,
            and computational biology to solve real-world problems.
          </motion.p>


          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {projects.map((project, index) => (

              <motion.div
                key={index}

                initial={{
                  opacity: 0,
                  y: 30
                }}

                whileInView={{
                  opacity: 1,
                  y: 0
                }}

                viewport={{
                  once: true
                }}

                transition={{
                  delay: index * 0.15,
                  duration: 0.6
                }}

                whileHover={{
                  y: -10,
                  borderColor: '#D8C3A5',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  transition: {
                    type: "spring",
                    stiffness: 300
                  }
                }}

                className="
                bg-[#262626]
                rounded-xl
                p-6
                border
                border-[#3A3A3A]
                transition-all
                duration-300
                "
              >


                <h3 className="
                text-xl
                font-semibold
                mb-3
                text-[#F6F1EB]
                ">
                  {project.title}
                </h3>


                <p className="
                text-[#B7B7B7]
                text-sm
                mb-4
                leading-relaxed
                ">
                  {project.description}
                </p>



                <div className="
                flex
                flex-wrap
                gap-2
                mb-4
                ">

                  {project.tech.map((tech, i) => (

                    <motion.span

                      key={i}

                      className="
                      text-xs
                      px-3
                      py-1
                      bg-[#D8C3A5]/10
                      text-[#D8C3A5]
                      rounded-full
                      "

                      whileHover={{
                        scale: 1.1
                      }}

                    >
                      {tech}
                    </motion.span>

                  ))}

                </div>



                <div className="
                flex
                items-center
                gap-4
                pt-2
                border-t
                border-[#3A3A3A]
                ">


                  <motion.a

                    href={project.github}

                    className="
                    text-[#B7B7B7]
                    hover:text-[#D8C3A5]
                    transition
                    flex
                    items-center
                    gap-1
                    text-sm
                    "

                    whileHover={{
                      x: 3
                    }}

                  >

                    <FaGithub />
                    Code

                  </motion.a>



                  <motion.a

                    href={project.live}

                    className="
                    text-[#B7B7B7]
                    hover:text-[#D8C3A5]
                    transition
                    flex
                    items-center
                    gap-1
                    text-sm
                    "

                    whileHover={{
                      x: 3
                    }}

                  >

                    <FaExternalLinkAlt />
                    Live Demo

                  </motion.a>


                </div>


              </motion.div>

            ))}

          </div>


        </motion.div>

      </div>

    </section>
  );
};


export default Projects;