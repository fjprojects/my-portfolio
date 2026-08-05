import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import heroImage from "../assets/francis-portfolio.jpeg";

const Hero = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[calc(100vh-80px)] bg-[#111111] overflow-hidden flex items-center"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#D8C3A5]/10 blur-[180px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#B08968]/10 blur-[150px]" />

      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-6 lg:px-16 relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 rounded-full border border-[#D8C3A5]/30 bg-[#D8C3A5]/10 text-[#D8C3A5] text-sm mb-8">
              ✦ Available for Freelance Work
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Hi,
              <br />
              I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D8C3A5] to-[#B08968]">
                Francis
              </span>
            </h1>

            <h2 className="text-2xl text-gray-300 mt-6">
              Frontend Developer
            </h2>

            <p className="text-gray-400 mt-8 leading-8 max-w-xl">
              I create modern, responsive, and interactive websites using
              React, Tailwind CSS, Framer Motion, and contemporary web
              technologies. I enjoy building interfaces that feel fast,
              elegant, and memorable.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">
<motion.a
  href="/projects"
  whileHover={{
    scale: 1.05,
    boxShadow: "0 0 30px rgba(216,195,165,.4)",
  }}
  whileTap={{ scale: 0.95 }}
  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#D8C3A5] to-[#B08968] text-[#111] font-semibold flex items-center gap-3"
>
  View Projects
  <FaArrowRight />
</motion.a>
              <motion.a
                href="/contact"
                whileHover={{
                  scale: 1.05,
                  borderColor: "#D8C3A5",
                }}
                whileTap={{ scale: .95 }}
                className="px-8 py-4 border border-gray-700 rounded-full text-white"
              >
                Contact Me
              </motion.a>

            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center"
          >

            {/* Glow */}
            <div className="absolute w-[420px] h-[520px] rounded-[40px] bg-[#D8C3A5]/20 blur-3xl" />

            {/* Decorative Border */}
            <div className="absolute w-[380px] h-[500px] border border-[#D8C3A5]/30 rounded-[35px] translate-x-4 translate-y-4" />

            {/* Image */}
            <motion.img
              src={heroImage}
              alt="Francis"
              whileHover={{
                scale: 1.02,
                rotate: -1,
              }}
              transition={{ duration: .4 }}
              className="relative w-[380px] md:w-[420px] h-[520px] object-cover rounded-[35px] shadow-2xl"
            />

          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default Hero;