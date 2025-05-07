import { motion } from 'framer-motion';
import { useGetUserStatsQuery } from '../../redux/features/api/userApi';

const DashboardStats = () => {
  const { data: stats, isLoading } = useGetUserStatsQuery();

  const statCards = [
    {
      title: 'Connections',
      value: stats?.connections || 0,
      change: stats?.connectionsChange || 0,
      icon: '👥',
      color: 'blue'
    },
    {
      title: 'Messages',
      value: stats?.messages || 0,
      change: stats?.messagesChange || 0,
      icon: '✉️',
      color: 'green'
    },
    {
      title: 'Events',
      value: stats?.events || 0,
      change: stats?.eventsChange || 0,
      icon: '📅',
      color: 'purple'
    },
    {
      title: 'Mentors',
      value: stats?.mentors || 0,
      change: stats?.mentorsChange || 0,
      icon: '🧑‍🏫',
      color: 'yellow'
    }
  ];

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`p-6 rounded-xl bg-${stat.color}-100 text-${stat.color}-800 shadow-sm`}
          whileHover={{ y: -5 }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium">{stat.title}</p>
              <p className="text-2xl font-bold mt-1">
                {isLoading ? '--' : stat.value}
              </p>
              <p className="text-xs mt-2">
                {stat.change >= 0 ? (
                  <span className="font-medium text-green-600">+{stat.change}</span>
                ) : (
                  <span className="font-medium text-red-600">{stat.change}</span>
                )}{' '}
                from last month
              </p>
            </div>
            <div className="text-3xl">{stat.icon}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DashboardStats;