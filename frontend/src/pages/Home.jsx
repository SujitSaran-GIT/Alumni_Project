import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCalendar, FiUsers, FiAward, FiMapPin, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Home = ({ darkMode }) => {
  // Sample data - replace with your actual data
  const notableAlumni = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Senior Researcher at MIT",
      achievement: "Published groundbreaking AI research",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      name: "Mark Williams",
      role: "CEO of TechStart Inc.",
      achievement: "Founded $1B valuation startup",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "Lisa Chen",
      role: "Lead Designer at Apple",
      achievement: "Redesigned iOS interface",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Annual Alumni Gala",
      date: "2023-11-15",
      location: "University Campus Hall",
      description: "Celebrating another year of alumni achievements"
    },
    {
      id: 2,
      title: "Tech Industry Panel",
      date: "2023-12-05",
      location: "Virtual Event",
      description: "Alumni in tech share their experiences"
    },
    {
      id: 3,
      title: "Career Networking Mixer",
      date: "2024-01-20",
      location: "Downtown Conference Center",
      description: "Connect with alumni in your field"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
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

  const floatingVariants = {
    animate: (i) => ({
      y: [0, -20 * (i + 1), 0],
      x: [0, 15 * (i % 2 === 0 ? 1 : -1), 0],
      transition: {
        duration: 8 + i * 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  const cardHoverVariants = {
    hover: {
      y: -15,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const imageHoverVariants = {
    hover: {
      scale: 1.05,
      rotate: Math.random() > 0.5 ? 2 : -2,
      transition: {
        duration: 0.3
      }
    }
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const gradientTextVariants = {
    initial: { backgroundPosition: "0% 50%" },
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="fixed inset-0 overflow-hidden pointer-events-none"
        style={{ y: parallaxY }}
      >
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-blue-500/10 to-blue-600/10"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(40px)"
            }}
            variants={floatingVariants}
            custom={i}
            animate="animate"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
          />
        ))}
      </motion.div>

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <motion.h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="block">Stay Connected,</span>
                <motion.span
                  className="block mt-4 bg-clip-text text-transparent"
                  initial="initial"
                  animate="animate"
                  variants={gradientTextVariants}
                  style={{
                    backgroundSize: "200% 200%",
                    backgroundImage: "linear-gradient(45deg, #3b82f6, #9333ea, #3b82f6)"
                  }}
                >
                  Forever.
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.p
              className="text-xl text-gray-300 max-w-2xl mx-auto mb-10"
              variants={itemVariants}
            >
              Reconnect with classmates, discover opportunities, and be part of our growing alumni network.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              variants={itemVariants}
            >
              <Link to="/register">
                <motion.button
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold relative overflow-hidden group"
                  variants={buttonHoverVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <span className="relative z-10 flex items-center">
                    Join Now <FiArrowRight className="inline ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ opacity: 0 }}
                  />
                </motion.button>
              </Link>

              <Link to="/events">
                <motion.button
                  className="px-8 py-3 rounded-full border-2 border-blue-500 text-blue-400 font-bold hover:bg-blue-500/10 transition-all group"
                  variants={buttonHoverVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <span className="flex items-center">
                    View Events <FiCalendar className="inline ml-2 transition-transform group-hover:rotate-12" />
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Animated floating alumni avatars */}
          <motion.div
            className="mt-20 flex justify-center gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.img
                key={i}
                src={`https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg`}
                alt="Alumni"
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-blue-500 shadow-lg"
                initial={{ y: 0 }}
                animate={{
                  y: [0, -20, 0],
                  rotate: Math.random() > 0.5 ? [0, 5, 0] : [0, -5, 0]
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: Math.random() > 0.5 ? 10 : -10,
                  transition: { duration: 0.3 }
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Animated scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.p className="text-sm text-gray-400 mb-2">Scroll to explore</motion.p>
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FiChevronRight className="w-6 h-6 text-blue-400 transform rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* Notable Alumni Section */}
      <section className="py-20 bg-gray-800/50 backdrop-blur-sm relative overflow-hidden">
        {/* Animated background pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="currentColor"></circle>
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
          </svg>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent"
              initial="initial"
              animate="animate"
              variants={gradientTextVariants}
              style={{
                backgroundSize: "200% 200%",
                backgroundImage: "linear-gradient(45deg, #3b82f6, #9333ea, #3b82f6)"
              }}
            >
              Notable Alumni
            </motion.h2>
            <motion.p
              className="text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Our alumni are making waves across industries. Here are just a few of their success stories.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {notableAlumni.map((alumni, index) => (
              <motion.div
                key={alumni.id}
                className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600 hover:border-blue-500 transition-all relative overflow-hidden"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, type: "spring" }}
                whileHover="hover"
                variants={cardHoverVariants}
              >
                {/* Animated card background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />

                <div className="flex items-center mb-4 relative z-10">
                  <motion.img
                    src={alumni.image}
                    alt={alumni.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                    variants={imageHoverVariants}
                    whileHover="hover"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">{alumni.name}</h3>
                    <p className="text-blue-400">{alumni.role}</p>
                  </div>
                </div>
                <div className="flex items-start relative z-10">
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    transition={{ type: "spring" }}
                  >
                    <FiAward className="text-yellow-400 mt-1 mr-2 flex-shrink-0" />
                  </motion.div>
                  <p className="text-gray-300">{alumni.achievement}</p>
                </div>

                {/* Animated hover effect */}
                <motion.div
                  className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/alumni">
              <motion.button
                className="px-6 py-2 rounded-full border border-blue-500 text-blue-400 hover:bg-blue-500/10 transition-all group flex items-center mx-auto"
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <span>View All Alumni</span>
                <motion.span
                  className="ml-2 inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <FiUsers />
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Animated floating elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-500/10"
              style={{
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: "blur(60px)"
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 0.2, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                type: "spring"
              }}
            />
          ))}
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent"
              initial="initial"
              animate="animate"
              variants={gradientTextVariants}
              style={{
                backgroundSize: "200% 200%",
                backgroundImage: "linear-gradient(45deg, #3b82f6, #9333ea, #3b82f6)"
              }}
            >
              <span className="bg-clip-text text-transparent">Upcoming Events</span>
            </motion.h2>
            <motion.p
              className="text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Join us for these exciting upcoming events and reunions.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all relative"
                initial={{ opacity: 0, y: 60, rotate: index % 2 === 0 ? -1 : 1 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, type: "spring" }}
                whileHover="hover"
                variants={cardHoverVariants}
              >
                <div className="p-6 relative z-10">
                  <div className="flex items-center mb-4">
                    <motion.div
                      className="bg-blue-500/20 p-2 rounded-lg"
                      whileHover={{ scale: 1.1 }}
                    >
                      <FiCalendar className="text-blue-400 w-6 h-6" />
                    </motion.div>
                    <div className="ml-4">
                      <p className="text-gray-400">{
                        new Date(event.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })
                      }</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <div className="flex items-center text-gray-400 mb-4">
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <FiMapPin className="mr-2" />
                    </motion.div>
                    <span>{event.location}</span>
                  </div>
                  <p className="text-gray-300 mb-6">{event.description}</p>
                  <motion.button
                    className="w-full py-2 rounded-lg bg-blue-500/10 border border-blue-500 text-blue-400 hover:bg-blue-500/20 transition-colors flex items-center justify-center group"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 5px 15px -5px rgba(59, 130, 246, 0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>RSVP Now</span>
                    <FiChevronRight className="ml-2 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0" />
                  </motion.button>
                </div>

                {/* Animated hover glow */}
                <motion.div
                  className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/events">
              <motion.button
                className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all group flex items-center mx-auto"
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <span>View All Events</span>
                <motion.span
                  className="ml-2 inline-block"
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 90 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <FiCalendar />
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-gradient-to-br from-blue-900/30 to-blue-800/30 relative overflow-hidden">
        {/* Animated particles */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 4 + 1,
                height: Math.random() * 4 + 1,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3 + 0.1
              }}
              initial={{ y: 0, x: 0 }}
              animate={{
                y: [0, Math.random() * 40 - 20],
                x: [0, Math.random() * 40 - 20]
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>

        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              variants={pulseVariants}
              initial="initial"
              animate="animate"
            >
              Ready to reconnect with your alma mater?
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Join thousands of alumni who are already networking, mentoring, and growing together.
            </motion.p>
            <Link to="/register">
              <motion.button
                className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all relative overflow-hidden group"
                whileHover={{
                  y: -3,
                  scale: 1.05,
                  boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  Get Started Today
                  <motion.span
                    className="ml-2 inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <FiArrowRight />
                  </motion.span>
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ opacity: 0 }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;