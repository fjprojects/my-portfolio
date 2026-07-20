import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY }];
        return newTrail.slice(-8);
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updateMousePosition);

    setTimeout(() => {
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    }, 100);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const cursorSize = isHovering ? 40 : 20;

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - cursorSize / 2,
          y: mousePosition.y - cursorSize / 2,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 350,
          mass: 0.5,
        }}
        style={{
          width: cursorSize,
          height: cursorSize,
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(216, 195, 165, ${isHovering ? 0.4 : 0.2}) 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 m-auto rounded-full"
          style={{
            width: isHovering ? 8 : 4,
            height: isHovering ? 8 : 4,
            background: '#D8C3A5',
            boxShadow: '0 0 20px rgba(216, 195, 165, 0.6), 0 0 60px rgba(216, 195, 165, 0.2)',
          }}
        />
      </motion.div>

      {trail.map((pos, index) => {
        const progress = index / trail.length;
        const size = 1 + (1 - progress) * 3;
        const opacity = 0.1 + (1 - progress) * 0.4;
        return (
          <motion.div
            key={index}
            className="fixed pointer-events-none z-[9998] rounded-full"
            style={{
              width: size,
              height: size,
              background: `rgba(216, 195, 165, ${opacity})`,
              left: pos.x - size / 2,
              top: pos.y - size / 2,
              boxShadow: `0 0 ${size * 2}px rgba(216, 195, 165, ${opacity * 0.5})`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: opacity }}
            transition={{ duration: 0.05 }}
          />
        );
      })}
    </>
  );
};

export default CustomCursor;