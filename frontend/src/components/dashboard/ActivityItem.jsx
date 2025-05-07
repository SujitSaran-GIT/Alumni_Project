import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

const ActivityItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    switch(type) {
      case 'connection':
        return '👋';
      case 'message':
        return '💬';
      case 'event':
        return '🎉';
      case 'job':
        return '💼';
      default:
        return '🔔';
    }
  };

  return (
    <motion.div 
      className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors"
      whileHover={{ x: 5 }}
    >
      <div className="text-2xl mr-3 mt-1">
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-1">
        <p className="text-gray-800">{activity.message}</p>
        <p className="text-xs text-gray-500 mt-1">
          {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
        </p>
      </div>
    </motion.div>
  );
};

export default ActivityItem;