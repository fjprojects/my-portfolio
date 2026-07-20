import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Skills", path: "/skills" },
  { name: "Projects", path: "/projects" },
  { name: "Certificates", path: "/certificates"},
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#151515]/95 backdrop-blur-md border-b border-[#3A3A3A]"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo */}

        <NavLink
          to="/"
          className="text-2xl font-bold text-[#D8C3A5] tracking-wide"
        >
          Francis Job
        </NavLink>

        {/* Desktop Navigation */}

        <nav className="hidden md:flex items-center gap-8">
          {links.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `relative transition duration-300 group ${
                    isActive
                      ? "text-[#D8C3A5]"
                      : "text-[#F6F1EB] hover:text-[#D8C3A5]"
                  }`
                }
              >
                {item.name}

                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#D8C3A5] transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Hide icons only on Contact page */}

        {location.pathname !== "/contact" && (
          <div className="hidden md:flex items-center gap-5">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="text-[#B7B7B7] hover:text-[#D8C3A5]"
            >
              <FaGithub size={20} />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="text-[#B7B7B7] hover:text-[#D8C3A5]"
            >
              <FaLinkedin size={20} />
            </a>

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="text-[#B7B7B7] hover:text-[#D8C3A5]"
            >
              <FaTwitter size={20} />
            </a>
          </div>
        )}

        {/* Mobile Button */}

        <button
          className="md:hidden text-[#F6F1EB] text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-[#151515] border-t border-[#333]"
        >
          <div className="flex flex-col px-6 py-6 gap-5">
            {links.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#D8C3A5]"
                    : "text-[#F6F1EB] hover:text-[#D8C3A5]"
                }
              >
                {item.name}
              </NavLink>
            ))}

            {location.pathname !== "/contact" && (
              <div className="flex gap-5 pt-4 border-t border-[#333]">
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub size={20} />
                </a>

                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin size={20} />
                </a>

                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaTwitter size={20} />
                </a>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;