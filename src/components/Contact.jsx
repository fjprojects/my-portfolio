import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaEnvelope,
  FaFileDownload,
  FaGithub,
  FaHandshake,
  FaLinkedin,
  FaTimes,
  FaUser,
} from "react-icons/fa";

const contactLinks = [
  {
    icon: FaEnvelope,
    link: "https://mail.google.com/mail/?view=cm&fs=1&to=francisjob.coder@gmail.com&su=Job%20Opportunity",
    label: "Email",
    target: "_blank",
  },
  {
    icon: FaLinkedin,
    link: "https://linkedin.com/in/francis-job",
    label: "LinkedIn",
    target: "_blank",
  },
  {
    icon: FaGithub,
    link: "https://github.com/fjprojects",
    label: "GitHub",
    target: "_blank",
  },
];

const Contact = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showModal]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section
      id="contact"
      className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#111111] px-4 py-20"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-[#D8C3A5]/10 blur-[140px]" />

        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-[#B08968]/10 blur-[160px]" />
      </div>

      <div className="container relative z-10 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="mb-4 bg-gradient-to-r from-[#D8C3A5] to-[#B08968] bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Let's Connect
          </motion.h2>

          <motion.p
            className="mx-auto mb-10 max-w-2xl text-[#B7B7B7]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Interested in collaborating on software, AI, or innovative
            projects? Feel free to reach out.
          </motion.p>

          {/* Contact icons */}
          <motion.div
            className="mb-10 flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {contactLinks.map((item) => {
              const Icon = item.icon;

              return (
                <motion.a
                  key={item.label}
                  href={item.link}
                  target={item.target}
                  rel="noopener noreferrer"
                  title={item.label}
                  aria-label={item.label}
                  className="rounded-full border border-[#3A3A3A] bg-[#262626] p-4 text-[#B7B7B7] transition hover:border-[#D8C3A5] hover:text-[#D8C3A5]"
                  whileHover={{
                    scale: 1.15,
                    boxShadow: "0 0 30px rgba(216,195,165,0.15)",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={24} />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className="flex flex-col justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              type="button"
              onClick={() => setShowModal(true)}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(216,195,165,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-gradient-to-r from-[#D8C3A5] to-[#B08968] px-8 py-3 font-medium text-[#151515] focus:outline-none focus:ring-2 focus:ring-[#D8C3A5]"
            >
              Hire Me
            </motion.button>

            <motion.a
              href="/francis-job.docx"
              download="Francis-Job-Resume.docx"
              whileHover={{
                y: -2,
                scale: 1.03,
                borderColor: "#D8C3A5",
                color: "#D8C3A5",
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 rounded-full border border-[#3A3A3A] px-8 py-3 font-medium text-[#F6F1EB] transition focus:outline-none focus:ring-2 focus:ring-[#D8C3A5]"
            >
              <FaFileDownload size={16} />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Contact modal */}
          <AnimatePresence>
            {showModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm"
                onClick={() => setShowModal(false)}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="contact-modal-title"
                  initial={{
                    opacity: 0,
                    scale: 0.92,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.92,
                    y: 25,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 22,
                  }}
                  onClick={(event) => event.stopPropagation()}
                  className="relative w-full max-w-lg rounded-3xl border border-[#3B3B3B] bg-[#1F1F1F] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                >
                  <motion.button
                    type="button"
                    onClick={() => setShowModal(false)}
                    aria-label="Close contact modal"
                    whileHover={{
                      backgroundColor: "#353535",
                      rotate: 90,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-4 top-4 rounded-full p-2 text-[#9D9D9D] transition hover:text-white focus:outline-none focus:ring-2 focus:ring-[#D8C3A5]"
                  >
                    <FaTimes size={20} />
                  </motion.button>

                  <div className="mb-4 flex justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.1,
                      }}
                      className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#D8C3A5] bg-gradient-to-br from-[#D8C3A5] to-[#B08968] shadow-lg"
                    >
                      <FaUser size={32} className="text-[#151515]" />
                    </motion.div>
                  </div>

                  <div className="mb-2 flex items-center justify-center gap-3">
                    <FaHandshake className="text-2xl text-[#D8C3A5]" />

                    <h3
                      id="contact-modal-title"
                      className="text-2xl font-bold text-[#F6F1EB]"
                    >
                      Let's Build Something Amazing
                    </h3>
                  </div>

                  <p className="mb-8 text-center text-[#B7B7B7]">
                    Choose your preferred way to connect.
                  </p>

                  <motion.a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=francisjob.coder@gmail.com&su=Job%20Opportunity"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowModal(false)}
                    whileHover={{
                      scale: 1.03,
                      y: -2,
                      boxShadow: "0 10px 30px rgba(216,195,165,0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#D8C3A5] to-[#C7A97F] py-4 font-medium text-[#151515] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D8C3A5]"
                  >
                    <FaEnvelope size={18} />
                    Continue with Email
                  </motion.a>

                  <div className="my-6 flex items-center gap-4">
                    <div className="h-px flex-1 bg-[#3B3B3B]" />

                    <span className="text-sm font-medium text-[#9D9D9D]">
                      OR
                    </span>

                    <div className="h-px flex-1 bg-[#3B3B3B]" />
                  </div>

                  <motion.a
                    href="https://linkedin.com/in/francis-job"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowModal(false)}
                    whileHover={{
                      scale: 1.03,
                      y: -2,
                      backgroundColor: "#D8C3A5",
                      color: "#151515",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#D8C3A5] py-4 font-medium text-[#F6F1EB] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D8C3A5]"
                  >
                    <FaLinkedin size={18} />
                    Continue with LinkedIn
                  </motion.a>

                  <motion.button
                    type="button"
                    onClick={() => setShowModal(false)}
                    whileHover={{
                      backgroundColor: "#2D2D2D",
                      color: "#FFFFFF",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 w-full rounded-xl py-3 font-medium text-[#9D9D9D] transition focus:outline-none focus:ring-2 focus:ring-[#D8C3A5]"
                  >
                    Cancel
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;