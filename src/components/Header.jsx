import React, { useEffect, useState } from "react";
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
  { name: "Certificates", path: "/certificates" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const isContactPage = location.pathname === "/contact";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <motion.header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-[#3A3A3A] bg-[#151515]/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-5">
        {/* Logo container with fixed width */}
        <div className="flex w-[160px] justify-start">
          <NavLink
            to="/"
            className="whitespace-nowrap text-2xl font-bold tracking-wide text-[#D8C3A5]"
          >
            Francis Job
          </NavLink>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
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
                  `group relative whitespace-nowrap font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-[#D8C3A5]"
                      : "text-[#F6F1EB] hover:text-[#D8C3A5]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}

                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] bg-[#D8C3A5] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Always preserve this container's width */}
        <div
          className={`hidden w-[160px] items-center justify-end gap-5 md:flex ${
            isContactPage ? "invisible pointer-events-none" : "visible"
          }`}
        >
          <a
            href="https://github.com/fjprojects"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-[#B7B7B7] transition-colors hover:text-[#D8C3A5]"
          >
            <FaGithub size={20} />
          </a>

          <a
            href="https://linkedin.com/in/francis-job"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-[#B7B7B7] transition-colors hover:text-[#D8C3A5]"
          >
            <FaLinkedin size={20} />
          </a>

          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
            className="text-[#B7B7B7] transition-colors hover:text-[#D8C3A5]"
          >
            <FaTwitter size={20} />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="text-2xl text-[#F6F1EB] md:hidden"
          onClick={() => setIsOpen((previous) => !previous)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-t border-[#333] bg-[#151515] md:hidden"
        >
          <div className="flex flex-col gap-5 px-6 py-6">
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

            {!isContactPage && (
              <div className="flex gap-5 border-t border-[#333] pt-4">
                <a
                  href="https://github.com/fjprojects"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <FaGithub size={20} />
                </a>

                <a
                  href="https://linkedin.com/in/francis-job"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </a>

                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
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