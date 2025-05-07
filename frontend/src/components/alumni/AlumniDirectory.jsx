import { motion } from 'framer-motion';
import { useGetUsersQuery } from '../../features/api/userApi';
import AlumniCard from './AlumniCard';

const AlumniDirectory = () => {
  const { data: alumni, isLoading } = useGetUsersQuery();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <h1 className="text-3xl font-bold mb-8">Alumni Network</h1>
      
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alumni.map((alumnus, index) => (
            <motion.div
              key={alumnus._id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <AlumniCard alumnus={alumnus} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AlumniDirectory