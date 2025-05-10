import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiTrello,
  FiUsers,
  FiUser,
  FiFileText,
  FiBriefcase,
  FiCalendar,
  FiDollarSign
} from 'react-icons/fi';
import { FaHandshake } from 'react-icons/fa';

const AdminSidebar = () => {
  const location = useLocation();

  const links = [
    { path: "/admin/dashboard", icon: <FiTrello />, name: "Dashboard" },
    { path: "/admin/users", icon: <FiUsers />, name: "Users" },
    { path: "/admin/profiles", icon: <FiUser />, name: "Profiles" },
    { path: "/admin/posts", icon: <FiFileText />, name: "Posts" },
    { path: "/admin/mentorships", icon: <FaHandshake />, name: "Mentorships" },
    { path: "/admin/jobs", icon: <FiBriefcase />, name: "Jobs" },
    { path: "/admin/events", icon: <FiCalendar />, name: "Events" },
    { path: "/admin/donations", icon: <FiDollarSign />, name: "Donations" },
  ];

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-40"
    >
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-xl font-bold text-indigo-900">Admin Dashboard</h3>
      </div>
      <nav className="mt-6">
        <ul>
          {links.map((link) => (
            <motion.li
              key={link.path}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2"
            >
              <Link
                to={link.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'bg-indigo-100 text-indigo-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3 text-lg">{link.icon}</span>
                <span className="font-medium">{link.name}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default AdminSidebar;