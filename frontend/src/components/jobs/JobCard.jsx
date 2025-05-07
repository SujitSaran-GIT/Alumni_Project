import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useApplyForJobMutation } from '../../redux/features/api/jobApi';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';

const JobCard = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [applyForJob] = useApplyForJobMutation();
  const user = useSelector(selectCurrentUser);

  const handleApply = async () => {
    if (!user) {
      toast.error('Please login to apply for jobs');
      return;
    }

    try {
      await applyForJob(job._id).unwrap();
      toast.success('Application submitted successfully!');
    } catch (error) {
      toast.error(error.data?.message || 'Failed to apply');
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        y: -3
      }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <motion.h3 
              className="text-xl font-bold text-gray-900"
              whileHover={{ color: '#2563eb' }} // blue-600
            >
              {job.title}
            </motion.h3>
            <div className="flex items-center mt-2 space-x-4">
              <span className="flex items-center text-gray-600">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {job.company}
              </span>
              <span className="flex items-center text-gray-600">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            job.type === 'Full-time' ? 'bg-green-100 text-green-800' :
            job.type === 'Part-time' ? 'bg-blue-100 text-blue-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {job.type}
          </span>
        </div>

        <div className="mt-4">
          <p className={`text-gray-700 ${isExpanded ? '' : 'line-clamp-3'}`}>
            {job.description}
          </p>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 text-sm font-medium mt-1 hover:underline"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills.map((skill, index) => (
            <motion.span
              key={index}
              className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Posted {new Date(job.createdAt).toLocaleDateString()}
          </div>
          <motion.button
            onClick={handleApply}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Apply Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;