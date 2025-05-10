import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    // Add event listeners
    window.addEventListener('mousemove', moveCursor);
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.querySelectorAll('a, button').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="hidden md:block fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: cursorPosition.x - 12,
          y: cursorPosition.y - 12,
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
        style={{
          background: 'aqua',
        }}
      />

      {/* Cursor trail */}
      <motion.div
        className="hidden md:block fixed w-4 h-4 rounded-full pointer-events-none z-40 mix-blend-difference opacity-50"
        animate={{
          x: cursorPosition.x - 8,
          y: cursorPosition.y - 8,
          scale: isHovered ? 2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 24,
          mass: 0.8
        }}
        style={{
          background: 'yellow',
        }}
      />
    </>
  );
};

export default CustomCursor; 