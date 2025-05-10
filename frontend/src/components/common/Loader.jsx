import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1.2, 1, 1],
        }}
        transition={{
          duration: 2,
          ease: "linear",
          repeat: Infinity,
        }}
        className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
      ></motion.div>
    </div>
  );
};

export default Loader;