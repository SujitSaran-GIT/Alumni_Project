import { motion } from 'framer-motion';
import { useGetCurrentUserQuery, useLogoutMutation } from '../redux/features/api/authApi';
import DashboardStats from '../components/dashboard/DashboardStats';
import RecentActivity from '../components/dashboard/RecentActivity';
import UpcomingEvents from '../components/dashboard/UpcomingEvents';
import AlumniStats from '../components/dashboard/AlumniStats';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../redux/features/auth/authSlice';


const DashboardPage = () => {
  const { data: user } = useGetCurrentUserQuery();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutAction());
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
         <button
            onClick={handleLogout}
            className="mt-1 text-red-600 text-xs hover:underline"
          >
            Logout
          </button>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="mt-2 text-gray-600">
          Here's what's happening with your network today.
        </p>
      </motion.div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <RecentActivity />
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-8"
        >
          <UpcomingEvents />
          <AlumniStats />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;