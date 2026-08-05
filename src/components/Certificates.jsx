import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

import pythonCertificate from "../assets/python-certificate.pdf";
import pythonThumbnail from "../assets/python-thumbnail.jpeg";
import cCertificate from "../assets/c-programming-certificate.jpeg";
import nthIndexCertificate from "../assets/nth-index.jpg";

const Certificates = () => {
  const [imageErrors, setImageErrors] = useState({});

  const certificates = [
    {
      id: "python",
      title: "Crash Course on Python",
      issuer: "Google & Coursera",
      image: pythonThumbnail,
      link: pythonCertificate,
      isPdf: true,
      date: "Jan 2026",
      description:
        "Completed Google's Crash Course on Python covering Python fundamentals, control flow, functions, modules, file handling, and object-oriented programming.",
    },
    {
      id: "c",
      title: "C Programming",
      issuer: "Bullsnet Computer Education",
      image: cCertificate,
      link: cCertificate,
      isPdf: false,
      date: "Jul 2025",
      description:
        "Successfully completed the C Programming course with an A+ grade, covering arrays, pointers, structures, file handling, memory management, and introductory data structures.",
    },
    {
      id: "nth-index-react",
      title: "React Developer Internship",
      issuer: "Nth Index Software Solutions LLP",
      image: nthIndexCertificate,
      link: nthIndexCertificate,
      isPdf: false,
      date: "Jun 2026",
      description:
        "Completed a React.js web development internship from June 8 to June 30, 2026, demonstrating skills in responsive user-interface development and component-based architecture.",
    },
  ];

  const handleImageError = (certificateId) => {
    setImageErrors((previous) => ({
      ...previous,
      [certificateId]: true,
    }));
  };

  const getFallbackImage = () =>
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect width="400" height="200" fill="%231A1A1A"/%3E%3Ctext x="200" y="120" font-size="60" text-anchor="middle" fill="%23D8C3A5"%3E%F0%9F%93%9C%3C/text%3E%3C/svg%3E';

  const handleViewCertificate = (link, event) => {
    event.preventDefault();

    if (link && link !== "#") {
      window.open(link, "_blank", "noopener,noreferrer");
      return;
    }

    alert("Certificate link is not available yet.");
  };

  return (
    <section className="min-h-screen py-32 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#F6F1EB]">
              My <span className="text-[#D8C3A5]">Certificates</span>
            </h2>

            <p className="text-[#B7B7B7] max-w-2xl mx-auto mt-4">
              Courses and internship credentials documenting my technical
              learning and practical development experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
            {certificates.map((certificate, index) => (
              <motion.article
                key={certificate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className="bg-[#262626] rounded-xl overflow-hidden border border-[#3A3A3A] hover:border-[#D8C3A5]/30 transition-all duration-300 group flex flex-col"
              >
                <div
                  className="relative w-full h-56 bg-[#1A1A1A] overflow-hidden cursor-pointer"
                  onClick={(event) =>
                    handleViewCertificate(certificate.link, event)
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      handleViewCertificate(certificate.link, event);
                    }
                  }}
                >
                  <img
                    src={
                      imageErrors[certificate.id]
                        ? getFallbackImage()
                        : certificate.image
                    }
                    alt={`${certificate.title} certificate`}
                    className="w-full h-full object-contain bg-[#1A1A1A] p-3 transition-transform duration-500 group-hover:scale-105"
                    onError={() => handleImageError(certificate.id)}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#262626] via-transparent to-transparent opacity-60 pointer-events-none" />

                  <div className="absolute top-4 right-4 bg-[#151515]/80 backdrop-blur-sm px-3 py-1 rounded-full border border-[#3A3A3A]">
                    <span className="text-xs text-[#D8C3A5]">
                      {certificate.date}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="text-white text-sm font-medium bg-[#D8C3A5]/20 px-4 py-2 rounded-full border border-[#D8C3A5]/30 backdrop-blur-sm">
                      View Credential
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-[#F6F1EB] mb-1">
                    {certificate.title}
                  </h3>

                  <p className="text-[#D8C3A5] text-sm font-medium mb-2">
                    {certificate.issuer}
                  </p>

                  <p className="text-[#B7B7B7] text-sm leading-relaxed">
                    {certificate.description}
                  </p>

                  <button
                    onClick={(event) =>
                      handleViewCertificate(certificate.link, event)
                    }
                    className="inline-flex items-center gap-2 mt-auto pt-5 text-[#D8C3A5] hover:text-[#F6F1EB] transition-colors text-sm group-hover:gap-3 bg-transparent border-none cursor-pointer"
                  >
                    View Credential
                    <FaExternalLinkAlt
                      size={12}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            <div className="bg-[#262626] p-6 rounded-xl text-center border border-[#3A3A3A]">
              <div className="text-3xl font-bold text-[#D8C3A5]">
                {certificates.length}
              </div>
              <div className="text-sm text-[#B7B7B7] mt-1">
                Credentials
              </div>
            </div>

            <div className="bg-[#262626] p-6 rounded-xl text-center border border-[#3A3A3A]">
              <div className="text-3xl font-bold text-[#D8C3A5]">10+</div>
              <div className="text-sm text-[#B7B7B7] mt-1">
                Technologies Learned
              </div>
            </div>

            <div className="bg-[#262626] p-6 rounded-xl text-center border border-[#3A3A3A]">
              <div className="text-3xl font-bold text-[#D8C3A5]">
                2025–2026
              </div>
              <div className="text-sm text-[#B7B7B7] mt-1">
                Active Learning
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-[#B7B7B7] text-sm">
              Learning through courses, projects, and practical experience.
            </p>

            <a
              href="/contact"
              className="inline-block mt-4 px-6 py-2 bg-[#D8C3A5]/10 text-[#D8C3A5] rounded-full hover:bg-[#D8C3A5]/20 transition-colors text-sm border border-[#D8C3A5]/20"
            >
              Discuss my experience
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;