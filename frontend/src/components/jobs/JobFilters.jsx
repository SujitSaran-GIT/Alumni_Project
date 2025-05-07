import { motion } from 'framer-motion';
import { useState } from 'react';

const JobFilters = () => {
  const [filters, setFilters] = useState({
    jobType: '',
    location: '',
    experience: ''
  });

  const jobTypes = ['All', 'Full-time', 'Part-time', 'Internship', 'Remote'];
  const locations = ['All', 'India', 'USA', 'UK', 'Germany', 'Remote'];
  const experienceLevels = ['All', 'Entry', 'Mid', 'Senior', 'Executive'];

  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-md"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="font-bold text-lg mb-4">Filter Jobs</h3>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
          <select
            value={filters.jobType}
            onChange={(e) => setFilters({...filters, jobType: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            {jobTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <select
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
          <select
            value={filters.experience}
            onChange={(e) => setFilters({...filters, experience: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            {experienceLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <motion.button
          className="w-full bg-blue-600 text-white py-2 rounded-md font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Apply Filters
        </motion.button>

        <motion.button
          className="w-full text-blue-600 py-2 rounded-md font-medium border border-blue-600"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setFilters({
            jobType: '',
            location: '',
            experience: ''
          })}
        >
          Reset Filters
        </motion.button>
      </div>
    </motion.div>
  );
};

export default JobFilters;