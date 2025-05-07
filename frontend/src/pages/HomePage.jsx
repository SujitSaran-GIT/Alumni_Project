import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useGetFeaturedContentQuery } from '../redux/features/api/contentApi';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const HomePage = () => {
  const { data: featured, isLoading } = useGetFeaturedContentQuery();

  // Mock data in case API isn't ready
  const fallbackFeatured = [
    {
      _id: '1',
      title: 'Annual Alumni Meet 2023',
      excerpt: 'Join us for the biggest gathering of alumni this year',
      image: '/images/event1.jpg'
    },
    {
      _id: '2',
      title: 'Career Development Workshop',
      excerpt: 'Learn from industry experts about career growth strategies',
      image: '/images/event2.jpg'
    }
  ];

  const displayContent = featured || fallbackFeatured;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-0"
    >
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-r from-blue-800 to-purple-600 text-white overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-[url('/hero-pattern.svg')] bg-cover opacity-10"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'] 
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Welcome to <span className="text-yellow-300">AlumniConnect</span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Reconnect with old classmates, discover new opportunities, and grow your professional network.
          </motion.p>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link 
              to="/register" 
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition-all"
            >
              Join Now
            </Link>
            <Link 
              to="/about" 
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold py-3 px-8 rounded-full text-lg transition-all"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Join Our Network?
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: '👥',
                title: 'Network',
                desc: 'Connect with thousands of alumni worldwide'
              },
              {
                icon: '💼',
                title: 'Opportunities',
                desc: 'Access exclusive job postings and internships'
              },
              {
                icon: '🎓',
                title: 'Mentorship',
                desc: 'Get guidance from experienced professionals'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Featured Updates
          </motion.h2>
          
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {displayContent?.map((item, index) => (
                <motion.div
                  key={item._id || index}
                  className="bg-white rounded-xl overflow-hidden shadow-md"
                  initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-full h-48 bg-gray-200 overflow-hidden">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.excerpt}</p>
                    <Link 
                      to={item._id ? `/news/${item._id}` : '#'}
                      className="text-blue-600 font-medium hover:underline"
                    >
                      Read More
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;