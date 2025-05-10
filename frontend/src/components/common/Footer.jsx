import { motion } from 'framer-motion';
import {
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiMail,
  FiPhone
} from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const Footer = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();

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
        stiffness: 100
      }
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${darkMode ? 'bg-black/90 backdrop-blur-md' : 'bg-white/90 backdrop-blur-md'} text-gray-800 backdrop-blur-md py-12 transition-colors duration-300 shadow-lg border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* About Section */}
          <motion.div
            className="space-y-4"
            variants={itemVariants}
          >
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink to="/">Alumni Network</NavLink>
            </motion.div>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
              Connecting alumni, students, and faculty to foster lifelong relationships and professional growth.
            </p>
            <div className="flex space-x-4">
              {[FiFacebook, FiTwitter, FiLinkedin, FiInstagram].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className={`${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors duration-300`}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="space-y-4"
            variants={itemVariants}
          >
            <h3 className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-xl font-bold transition-colors duration-300`}>Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Events', 'Mentors', 'Jobs'].map((link, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                >
                  <NavLink
                    to={`/${link.toLowerCase()}`}
                    className={`${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors duration-300`}
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2"
                    >
                      <span className={`w-2 h-2 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} transition-colors duration-300`}></span>
                      {link}
                    </motion.span>
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="space-y-4"
            variants={itemVariants}
          >
            <h3 className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-xl font-bold transition-colors duration-300`}>Contact Us</h3>
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ x: 5 }}
            >
              <FiMail className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors duration-300`} />
              <span className={`${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors duration-300`}>
                rcm.ac.in
              </span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ x: 5 }}
            >
              <FiPhone className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors duration-300`} />
              <span className={`${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors duration-300`}>
                +91 1234567890
              </span>
            </motion.div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            className="space-y-4"
            variants={itemVariants}
          >
            <h3 className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-xl font-bold transition-colors duration-300`}>Newsletter</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
              Subscribe to our newsletter for the latest updates.
            </p>
            <motion.div
              className="flex"
              whileHover={{ y: -3 }}
            >
              <input
                type="email"
                placeholder="Your email"
                className={`px-4 py-2 rounded-l-lg w-full focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 text-gray-100 focus:ring-blue-500' : 'bg-white text-gray-800 focus:ring-blue-600'} transition-colors duration-300`}
              />
              <motion.button
                className={`${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} px-4 py-2 rounded-r-lg text-white transition-colors duration-300`}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className={`border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} mt-8 pt-6 text-center ${darkMode ? 'text-gray-500' : 'text-gray-400'} transition-colors duration-300`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>© {currentYear} Alumni Network. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;