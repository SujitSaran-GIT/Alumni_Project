import { motion } from 'framer-motion';
import { useGetUpcomingEventsQuery } from '../../redux/features/api/eventApi';
import EventBadge from '../events/EventBadge';

const UpcomingEvents = () => {
  const { data: events, isLoading } = useGetUpcomingEventsQuery({ limit: 3 });

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-bold mb-6">Upcoming Events</h2>
      
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <motion.ul className="space-y-4">
          {events?.map((event, index) => (
            <motion.li
              key={event._id}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <EventBadge type={event.type} className="mr-3" />
                <div className="flex-1">
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-xs text-gray-500">
                    {new Date(event.date).toLocaleDateString()} • {event.location}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}
      
      <motion.div
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <a 
          href="/events" 
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          View all events →
        </a>
      </motion.div>
    </motion.div>
  );
};

export default UpcomingEvents;