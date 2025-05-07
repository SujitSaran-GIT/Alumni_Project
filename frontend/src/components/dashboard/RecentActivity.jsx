import { motion } from 'framer-motion';
import { useGetRecentActivityQuery } from '../../redux/features/api/activityApi';
import ActivityItem from './ActivityItem';

const RecentActivity = () => {
  const { data: activities, isLoading } = useGetRecentActivityQuery();

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
      
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <motion.ul className="space-y-4">
          {activities?.map((activity, index) => (
            <motion.li
              key={activity._id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <ActivityItem activity={activity} />
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};

export default RecentActivity;