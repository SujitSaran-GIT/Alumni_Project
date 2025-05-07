import { useGetJobsQuery } from '../../features/api/jobApi';
import { motion } from 'framer-motion';

const JobListing = () => {
  const { data: jobs, isLoading } = useGetJobsQuery();

  return (
    <div className="space-y-6">
      {jobs?.map((job, index) => (
        <motion.div
          key={job._id}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="p-6 bg-white rounded-lg shadow"
        >
          <h3 className="text-xl font-semibold">{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>
          <p className="mt-2">{job.description}</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Apply Now
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default JobListing