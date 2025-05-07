import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4"
    >
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <div className="text-6xl mb-4">🔒</div>
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Unauthorized Access
        </h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. Please contact the
          administrator if you believe this is an error.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </motion.div>
  );
};

export default UnauthorizedPage;