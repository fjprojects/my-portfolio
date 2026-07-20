import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaPhone,
  FaFileDownload,
  FaHandshake,
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
  {
    icon: FaPhone,
    label: "Phone",
    isPhone: true,
  },
];

const Contact = () => {
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  // Disable background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle phone number copy
  const handlePhoneClick = () => {
    const phoneNumber = "+917907698580";
    navigator.clipboard.writeText(phoneNumber).then(() => {
      setToast({ show: true, message: "Phone number copied ✓" });
      setTimeout(() => {
        setToast({ show: false, message: "" });
      }, 3000);
    });
  };

  // Handle icon clicks
  const handleIconClick = (item) => {
    if (item.isPhone) {
      handlePhoneClick();
    }
    // For other items, the link opens normally
  };

  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl font-bold mb-4 text-[#F6F1EB]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Let's <span className="text-[#D8C3A5]">Connect</span>
          </motion.h2>

          <motion.p
            className="text-[#B7B7B7] max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Interested in collaborating on software, AI, or innovative
            projects? Feel free to reach out.
          </motion.p>

          {/* Contact Icons */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {contactLinks.map((item, index) => {
              const Icon = item.icon;

              if (item.isPhone) {
                return (
                  <motion.button
                    key={index}
                    onClick={handlePhoneClick}
                    title={item.label}
                    className="p-4 bg-[#262626] rounded-full border border-[#3A3A3A] text-[#B7B7B7] hover:border-[#D8C3A5] hover:text-[#D8C3A5] transition cursor-pointer"
                    whileHover={{
                      scale: 1.15,
                      boxShadow: "0 0 30px rgba(216,195,165,0.15)",
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={24} />
                  </motion.button>
                );
              }

              return (
                <motion.a
                  key={index}
                  href={item.link}
                  target={item.target || "_blank"}
                  rel="noopener noreferrer"
                  title={item.label}
                  className="p-4 bg-[#262626] rounded-full border border-[#3A3A3A] text-[#B7B7B7] hover:border-[#D8C3A5] hover:text-[#D8C3A5] transition"
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

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={() => setShowModal(true)}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(216,195,165,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-[#D8C3A5] to-[#B08968] text-[#151515] rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-[#D8C3A5]"
            >
              Hire Me
            </motion.button>

            <motion.a
              href="/francis-job.pdf"
              download="Francis-Job-Resume.pdf"
              whileHover={{
                y: -2,
                scale: 1.03,
                borderColor: "#D8C3A5",
                color: "#D8C3A5",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-[#3A3A3A] rounded-full font-medium text-[#F6F1EB] flex items-center justify-center gap-2 transition focus:outline-none focus:ring-2 focus:ring-[#D8C3A5]"
            >
              <FaFileDownload size={16} />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Toast Notification */}
          <AnimatePresence>
            {toast.show && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="fixed top-8 left-1/2 transform -translate-x-1/2 z-[60] bg-[#1F1F1F] border border-[#D8C3A5] text-[#F6F1EB] px-6 py-3 rounded-xl shadow-2xl"
              >
                {toast.message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contact Modal */}
          <AnimatePresence>
            {showModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 px-4"
                onClick={() => setShowModal(false)}
              >
                <motion.div
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
                  whileHover={{
                    boxShadow: "0 0 50px rgba(216,195,165,0.12)",
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="
                    w-full
                    max-w-lg
                    rounded-3xl
                    bg-[#1F1F1F]
                    border
                    border-[#3B3B3B]
                    shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                    p-8
                    relative
                  "
                >
                  {/* Close Button */}
                  <motion.button
                    onClick={() => setShowModal(false)}
                    whileHover={{ 
                      backgroundColor: "#353535",
                      rotate: 90,
                    }}
                    transition={{ duration: 0.3 }}
                    className="
                      absolute
                      top-4
                      right-4
                      text-[#9D9D9D]
                      hover:text-white
                      transition
                      p-2
                      rounded-full
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#D8C3A5]
                    "
                  >
                    <FaTimes size={20} />
                  </motion.button>

                  {/* Profile Photo */}
                  <div className="flex justify-center mb-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.1,
                      }}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D8C3A5] to-[#B08968] flex items-center justify-center border-2 border-[#D8C3A5] shadow-lg"
                    >
                      <FaUser size={32} className="text-[#151515]" />
                    </motion.div>
                  </div>

                  {/* Header with Icon */}
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <FaHandshake className="text-[#D8C3A5] text-2xl" />
                    <h3 className="text-2xl font-bold text-[#F6F1EB]">
                      Let's Build Something Amazing
                    </h3>
                  </div>

                  <p className="text-[#B7B7B7] mb-8 text-center">
                    Choose your preferred way to connect.
                  </p>

                  {/* Email Button */}
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
                    className="
                      flex
                      items-center
                      justify-center
                      gap-3
                      w-full
                      py-4
                      rounded-xl
                      font-medium
                      bg-gradient-to-r
                      from-[#D8C3A5]
                      to-[#C7A97F]
                      text-[#151515]
                      transition-all
                      duration-300
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#D8C3A5]
                    "
                  >
                    <motion.div whileHover={{ rotate: -10 }}>
                      <FaEnvelope size={18} />
                    </motion.div>
                    Continue with Email
                  </motion.a>

                  {/* Divider */}
                  <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-[#3B3B3B]"></div>
                    <span className="text-[#9D9D9D] text-sm font-medium">OR</span>
                    <div className="flex-1 h-px bg-[#3B3B3B]"></div>
                  </div>

                  {/* LinkedIn Button */}
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
                    className="
                      flex
                      items-center
                      justify-center
                      gap-3
                      w-full
                      py-4
                      rounded-xl
                      border
                      border-[#D8C3A5]
                      text-[#F6F1EB]
                      transition-all
                      duration-300
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#D8C3A5]
                    "
                  >
                    <motion.div whileHover={{ rotate: 10 }}>
                      <FaLinkedin size={18} />
                    </motion.div>
                    Continue with LinkedIn
                  </motion.a>

                  {/* Cancel Button */}
                  <motion.button
                    onClick={() => setShowModal(false)}
                    whileHover={{
                      backgroundColor: "#2D2D2D",
                      color: "#FFFFFF",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="
                      w-full
                      mt-6
                      py-3
                      rounded-xl
                      text-[#9D9D9D]
                      transition
                      font-medium
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#D8C3A5]
                    "
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