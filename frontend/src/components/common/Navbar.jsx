import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiX, FiMenu, FiLogOut, FiHome, FiUsers, FiBriefcase, FiCalendar, FiBell, FiMessageCircle } from 'react-icons/fi';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { useState } from 'react';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userInfo = useSelector(state => state.auth?.userLogin?.userInfo);

  const logoutHandler = () => {
    dispatch(logout());
    setMenuOpen(false);
    navigate('/login');
  };

  const navLinks = [
    { path: "/", name: "Home", icon: <FiHome className="mr-1" /> },
    { path: "/mentors", name: "Mentors", icon: <FiUsers className="mr-1" /> },
    { path: "/jobs", name: "Jobs", icon: <FiBriefcase className="mr-1" /> },
    { path: "/events", name: "Events", icon: <FiCalendar className="mr-1" /> },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`fixed w-full z-40 h-16 ${darkMode ? 'bg-black/90 backdrop-blur-md' : 'bg-white/90 backdrop-blur-md'} shadow-sm border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <motion.div
          className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <NavLink to="/">Alumni Network</NavLink>
        </motion.div>

        <motion.div 
          className="hidden md:flex items-center gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {navLinks.map((item) => (
            <motion.div
              key={item.path}
              variants={itemVariants}
            >
              <NavLink
                to={item.path}
                className={`capitalize ${location.pathname === item.path ? 'text-blue-500 font-bold' : `${darkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-blue-500`} transition-colors`}
              >
                <motion.span
                  whileHover={{ y: -2 }}
                  className="flex items-center"
                >
                  {item.icon}
                  {item.name}
                </motion.span>
              </NavLink>
            </motion.div>
          ))}

          {userInfo ? (
            <>
              <motion.div
                className="relative"
                variants={itemVariants}
              >
                <NavLink to="/notifications">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiBell className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
                  </motion.div>
                </NavLink>
              </motion.div>

              <motion.button
                onClick={logoutHandler}
                className={`flex items-center gap-1 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:shadow-lg transition-all`}
                variants={itemVariants}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Logout</span>
                <FiLogOut className="w-4 h-4" />
              </motion.button>
            </>
          ) : (
            <>
              <motion.div
              whileHover={{ y: -2 }}
            >
              <NavLink
                to="/signup"
                className={`flex items-center gap-1 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-black font-medium hover:shadow-lg transition-all`}
              >
                <span>Get in Touch</span>
                <FiMessageCircle className="w-4 h-4" />
              </NavLink>
            </motion.div>
            </>
          )}

          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
            variants={itemVariants}
            whileTap={{ rotate: 180, scale: 0.9 }}
          >
            {darkMode ? (
              <FiSun className="w-5 h-5 text-yellow-400" />
            ) : (
              <FiMoon className="w-5 h-5 text-gray-800" />
            )}
          </motion.button>
        </motion.div>

        <motion.button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {menuOpen ? (
            <FiX className="w-6 h-6 text-blue-500" />
          ) : (
            <FiMenu className="w-6 h-6 text-blue-500" />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`md:hidden overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
          >
            <motion.div 
              className="px-6 py-4 space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((item, index) => (
                <motion.div
                  key={item.path}
                  onClick={() => setMenuOpen(false)}
                  variants={itemVariants}
                  custom={index}
                >
                  <NavLink
                    to={item.path}
                    className={`flex items-center gap-2 capitalize ${location.pathname === item.path ? 'text-blue-500 font-bold' : darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
                </motion.div>
              ))}

              {userInfo ? (
                <>
                  <motion.div
                    onClick={() => setMenuOpen(false)}
                    variants={itemVariants}
                    custom={navLinks.length}
                  >
                    <NavLink
                      to="/notifications"
                      className="flex items-center gap-2"
                    >
                      <FiBell className="w-5 h-5" />
                      <span>Notifications</span>
                    </NavLink>
                  </motion.div>

                  <motion.button
                    onClick={logoutHandler}
                    variants={itemVariants}
                    custom={navLinks.length + 1}
                    className={`flex items-center gap-2 w-full px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-medium mt-2`}
                  >
                    <span>Logout</span>
                    <FiLogOut className="w-4 h-4" />
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.div
                    onClick={() => setMenuOpen(false)}
                    variants={itemVariants}
                    custom={navLinks.length}
                  >
                    <NavLink
                      to="/login"
                      className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium`}
                    >
                      <span>Login</span>
                    </NavLink>
                  </motion.div>

                  <motion.div
                    onClick={() => setMenuOpen(false)}
                    variants={itemVariants}
                    custom={navLinks.length + 1}
                  >
                    <NavLink
                      to="/register"
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 border-blue-500 text-blue-500 font-medium mt-2`}
                    >
                      <span>Register</span>
                    </NavLink>
                  </motion.div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;