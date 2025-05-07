import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const ProgressBar = ({ 
  percentage = 0, 
  color = 'primary',
  height = 12,
  showPercentage = true,
  animate = true
}) => {
  const [progress, setProgress] = useState(0);
  const { theme } = useTheme();

  // Color variants based on theme and props
  const colorVariants = {
    primary: theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600',
    secondary: theme === 'dark' ? 'bg-purple-400' : 'bg-purple-600',
    success: theme === 'dark' ? 'bg-green-400' : 'bg-green-600',
    warning: theme === 'dark' ? 'bg-yellow-400' : 'bg-yellow-600',
    danger: theme === 'dark' ? 'bg-red-400' : 'bg-red-600'
  };

  // Smooth animation for progress increase
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setProgress(percentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setProgress(percentage);
    }
  }, [percentage, animate]);

  return (
    <div className="w-full">
      <div 
        className={`relative rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
        style={{ height: `${height}px` }}
      >
        <motion.div
          className={`${colorVariants[color]} h-full rounded-full`}
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ 
            duration: 1.5,
            type: 'spring',
            damping: 15
          }}
        />
      </div>
      
      {showPercentage && (
        <motion.div 
          className="flex justify-between items-center mt-2 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            Progress
          </span>
          <span className={`font-medium ${colorVariants[color].replace('bg', 'text')}`}>
            {Math.round(progress)}%
          </span>
        </motion.div>
      )}
    </div>
  );
};

// Default props
ProgressBar.defaultProps = {
  percentage: 0,
  color: 'primary',
  height: 12,
  showPercentage: true,
  animate: true
};

export default ProgressBar;