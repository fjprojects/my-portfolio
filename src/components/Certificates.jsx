import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

// Import your assets
import pythonCertificate from "../assets/python-certificate.pdf";
import pythonThumbnail from "../assets/python-thumbnail.jpeg"; // ✅ Changed from .png to .jpeg
import cCertificate from "../assets/c-programming-certificate.jpeg";

const Certificates = () => {
  const [imageErrors, setImageErrors] = useState({});

  const certificates = [
    {
      id: 'python',
      title: "Crash Course on Python",
      issuer: "Google & Coursera",
      image: pythonThumbnail, // ✅ Now works with .jpeg
      link: pythonCertificate,
      isPdf: true,
      date: "Jan 2026",
      description: "Completed Google's Crash Course on Python covering Python fundamentals, control flow, functions, modules, file handling and object-oriented programming.",
    },
    {
      id: 'c',
      title: "C Programming",
      issuer: "Bullsnet Computer Education",
      image: cCertificate,
      link: cCertificate,
      isPdf: false,
      date: "Jul 2025",
      description: "Successfully completed the C Programming course with an A+ grade. Built a strong foundation in C programming, including arrays, pointers, structures, file handling, memory management and introductory data structures.",
    },
  ];

  const handleImageError = (certId) => {
    setImageErrors(prev => ({ ...prev, [certId]: true }));
  };

  const getFallbackImage = () => {
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect width="400" height="200" fill="%231A1A1A"/%3E%3Ctext x="200" y="110" font-size="60" text-anchor="middle" fill="%23D8C3A5"%3E📜%3C/text%3E%3C/svg%3E';
  };

  const handleViewCertificate = (link, e) => {
    e.preventDefault();
    if (link && link !== '#') {
      window.open(link, '_blank');
    } else {
      alert('Certificate link is not available yet.');
    }
  };

  return (
    <section className="min-h-screen py-32 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#F6F1EB]">
              My <span className="text-[#D8C3A5]">Certificates</span>
            </h2>
            <p className="text-[#B7B7B7] max-w-2xl mx-auto mt-4">
              Professional certifications that validate my skills and commitment to continuous learning.
            </p>
          </div>

          {/* Certificates Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className="bg-[#262626] rounded-xl overflow-hidden border border-[#3A3A3A] hover:border-[#D8C3A5]/30 transition-all duration-300 group"
              >
                {/* Certificate Image - Clickable */}
                <div 
                  className="relative w-full h-56 bg-[#1A1A1A] overflow-hidden cursor-pointer"
                  onClick={(e) => handleViewCertificate(cert.link, e)}
                >
                  <img
                    src={imageErrors[cert.id] ? getFallbackImage() : cert.image}
                    alt={cert.title}
                    className="w-full h-full object-contain bg-[#1A1A1A] p-3 transition-transform duration-500 group-hover:scale-105"
                    onError={() => handleImageError(cert.id)}
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#262626] via-transparent to-transparent opacity-60 pointer-events-none" />
                  
                  {/* Date badge */}
                  <div className="absolute top-4 right-4 bg-[#151515]/80 backdrop-blur-sm px-3 py-1 rounded-full border border-[#3A3A3A]">
                    <span className="text-xs text-[#D8C3A5]">{cert.date}</span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="text-white text-sm font-medium bg-[#D8C3A5]/20 px-4 py-2 rounded-full border border-[#D8C3A5]/30 backdrop-blur-sm">
                      View Credential
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#F6F1EB] mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-[#D8C3A5] text-sm font-medium mb-2">
                    {cert.issuer}
                  </p>
                  <p className="text-[#B7B7B7] text-sm leading-relaxed">
                    {cert.description}
                  </p>

                  {/* View Credential Button */}
                  <button
                    onClick={(e) => handleViewCertificate(cert.link, e)}
                    className="inline-flex items-center gap-2 mt-4 text-[#D8C3A5] hover:text-[#F6F1EB] transition-colors text-sm group-hover:gap-3 bg-transparent border-none cursor-pointer"
                  >
                    View Credential
                    <FaExternalLinkAlt size={12} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            <div className="bg-[#262626] p-6 rounded-xl text-center border border-[#3A3A3A]">
              <div className="text-3xl font-bold text-[#D8C3A5]">2</div>
              <div className="text-sm text-[#B7B7B7] mt-1">Certifications</div>
            </div>
            <div className="bg-[#262626] p-6 rounded-xl text-center border border-[#3A3A3A]">
              <div className="text-3xl font-bold text-[#D8C3A5]">10+</div>
              <div className="text-sm text-[#B7B7B7] mt-1">Technologies Learned</div>
            </div>
            <div className="bg-[#262626] p-6 rounded-xl text-center border border-[#3A3A3A]">
              <div className="text-3xl font-bold text-[#D8C3A5]">2025–26</div>
              <div className="text-sm text-[#B7B7B7] mt-1">Active Learning</div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-[#B7B7B7] text-sm">
              Always learning. Always building.
            </p>
            <a
              href="/contact"
              className="inline-block mt-4 px-6 py-2 bg-[#D8C3A5]/10 text-[#D8C3A5] rounded-full hover:bg-[#D8C3A5]/20 transition-colors text-sm border border-[#D8C3A5]/20"
            >
              Let's discuss my skills
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;