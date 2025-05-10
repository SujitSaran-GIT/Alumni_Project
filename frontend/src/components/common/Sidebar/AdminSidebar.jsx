import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiUsers, 
  FiSettings, 
  FiFileText, 
  FiCalendar,
  FiDollarSign,
  FiBriefcase,
  FiBarChart2,
  FiMail,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { FaHandshake } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Navigation items
  const navItems = [
    { path: '/admin-dashboard', icon: <FiHome />, label: 'Dashboard' },
    { path: '/admin/users', icon: <FiUsers />, label: 'Users' },
    { path: '/admin/posts', icon: <FiFileText />, label: 'Posts' },
    { path: '/admin/events', icon: <FiCalendar />, label: 'Events' },
    { path: '/admin/mentorships', icon: <FaHandshake />, label: 'Mentorships' },
    { path: '/admin/jobs', icon: <FiBriefcase />, label: 'Job Listings' },
    { path: '/admin/donations', icon: <FiDollarSign />, label: 'Donations' },
    { path: '/admin/settings', icon: <FiSettings />, label: 'Settings' },
  ];

  // Animation variants
  const sidebarVariants = {
    expanded: { width: '16rem' },
    collapsed: { width: '5rem' }
  };

  const itemVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -20 }
  };

  const iconVariants = {
    expanded: { marginRight: '0.5rem' },
    collapsed: { marginRight: 0 }
  };

  return (
    <motion.div
      className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 overflow-hidden ${isCollapsed ? 'w-20' : 'w-64'}`}
      initial={false}
      style={{ marginTop: '64px' }} 
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      variants={sidebarVariants}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        {!isCollapsed && (
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h1 className="text-xl font-bold text-indigo-600">Admin Dashboard</h1>
          </motion.div>
        )}
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </motion.button>
      </div>

      {/* Navigation Items */}
      <div className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path}>
                <motion.div
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.span
                    className="text-lg"
                    variants={iconVariants}
                    animate={isCollapsed ? 'collapsed' : 'expanded'}
                  >
                    {item.icon}
                  </motion.span>
                  {!isCollapsed && (
                    <motion.span
                      variants={itemVariants}
                      animate={isCollapsed ? 'collapsed' : 'expanded'}
                      className="font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </motion.div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Sidebar Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
        <Link to="/logout">
          <motion.div
            className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-50"
            whileHover={{ x: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.span
              className="text-lg"
              variants={iconVariants}
              animate={isCollapsed ? 'collapsed' : 'expanded'}
            >
              <FiLogOut />
            </motion.span>
            {!isCollapsed && (
              <motion.span
                variants={itemVariants}
                animate={isCollapsed ? 'collapsed' : 'expanded'}
                className="font-medium"
              >
                Logout
              </motion.span>
            )}
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;