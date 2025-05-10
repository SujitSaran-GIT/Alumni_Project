import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi';

const Alert = ({ type = 'info', message, onClose }) => {
  const alertClasses = {
    success: 'bg-emerald-100 text-emerald-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
  };

  const alertIcons = {
    success: <FiCheckCircle className="mr-2" size={20} />,
    error: <FiAlertCircle className="mr-2" size={20} />,
    warning: <FiAlertCircle className="mr-2" size={20} />,
    info: <FiInfo className="mr-2" size={20} />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`${alertClasses[type]} px-4 py-3 rounded-lg flex items-center justify-between mb-4`}
    >
      <div className="flex items-center">
        {alertIcons[type]}
        <span>{message}</span>
      </div>
      {onClose && (
        <button onClick={onClose} className="ml-4 focus:outline-none">
          <FiX />
        </button>
      )}
    </motion.div>
  );
};

export default Alert;