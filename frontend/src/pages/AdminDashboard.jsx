import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiFileText, 
  FiCalendar, 
  FiDollarSign,
  FiBriefcase,
  FiBarChart2,
  FiActivity,
  FiAward,
  FiChevronRight
} from 'react-icons/fi';
import { FaHandshake } from 'react-icons/fa';
import AdminSidebar from '../components/common/Sidebar/AdminSidebar';

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth.userLogin);
  // const dispatch = useDispatch();

  // Sample data - replace with actual data from your API
  const stats = [
    { title: "Total Users", value: "1,248", icon: <FiUsers className="text-blue-500" size={24} />, change: "+12%", trend: 'up' },
    { title: "Active Posts", value: "356", icon: <FiFileText className="text-green-500" size={24} />, change: "+5%", trend: 'up' },
    { title: "Upcoming Events", value: "18", icon: <FiCalendar className="text-purple-500" size={24} />, change: "-2", trend: 'down' },
    { title: "Mentorships", value: "89", icon: <FaHandshake className="text-yellow-500" size={24} />, change: "+23%", trend: 'up' },
    { title: "Job Listings", value: "42", icon: <FiBriefcase className="text-red-500" size={24} />, change: "+8%", trend: 'up' },
    { title: "Donations", value: "$12,480", icon: <FiDollarSign className="text-emerald-500" size={24} />, change: "+34%", trend: 'up' },
  ];

  const recentActivities = [
    { id: 1, user: "Sarah Johnson", action: "created a new post", time: "2 mins ago", icon: <FiFileText /> },
    { id: 2, user: "Mark Williams", action: "registered as mentor", time: "15 mins ago", icon: <FaHandshake /> },
    { id: 3, user: "Lisa Chen", action: "posted a new job", time: "1 hour ago", icon: <FiBriefcase /> },
    { id: 4, user: "Admin", action: "updated system settings", time: "2 hours ago", icon: <FiActivity /> },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {userInfo?.name || 'Admin'}!</p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Quick Action
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
              variants={itemVariants}
              whileHover="hover"
              // variants={cardHoverVariants}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <p className={`text-sm mt-2 ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-opacity-20 bg-gray-200">
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <FiActivity className="mr-2 text-indigo-500" /> Recent Activities
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivities.map((activity) => (
              <motion.div
                key={activity.id}
                className="p-4 hover:bg-gray-50 transition-colors"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center">
                  <div className="p-2 mr-4 rounded-full bg-indigo-100 text-indigo-500">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-gray-500 text-sm">{activity.time}</p>
                  </div>
                  <button className="text-indigo-500 hover:text-indigo-700">
                    <FiChevronRight />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Recent Registrations */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FiUsers className="mr-2 text-blue-500" /> New Registrations
              </h2>
              <button className="text-sm text-indigo-500 hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                  <div className="flex-1">
                    <p className="font-medium">New User {item}</p>
                    <p className="text-gray-500 text-sm">Registered 2 days ago</p>
                  </div>
                  <button className="text-indigo-500 hover:text-indigo-700 text-sm">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FiBarChart2 className="mr-2 text-green-500" /> System Status
              </h2>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                All Systems Operational
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Database</span>
                <span className="text-green-500">✓ Normal</span>
              </div>
              <div className="flex justify-between items-center">
                <span>API Server</span>
                <span className="text-green-500">✓ Normal</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Storage</span>
                <span className="text-yellow-500">⚠️ 85% used</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Last Backup</span>
                <span className="text-gray-500">2 hours ago</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Achievements */}
        <motion.div
          className="mt-8 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl shadow-lg p-6 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold flex items-center">
                <FiAward className="mr-2" /> Recent Achievements
              </h2>
              <p className="opacity-90 mt-1">Celebrating our community's success</p>
            </div>
            <button className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                    <FiAward />
                  </div>
                  <h3 className="font-medium">Achievement {item}</h3>
                </div>
                <p className="text-sm opacity-80">Description of achievement {item} goes here</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;