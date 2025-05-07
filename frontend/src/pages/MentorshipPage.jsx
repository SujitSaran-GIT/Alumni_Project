import { motion } from 'framer-motion';
import { useState } from 'react';
import { useGetMentorsQuery, useRequestMentorshipMutation } from '../redux/features/api/mentorshipApi';
import MentorCard from '../components/mentorship/MentorCard';
import MentorshipRequestModal from '../components/mentorship/MentorshipRequestModal';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { toast } from 'react-hot-toast';

const MentorshipPage = () => {
  const { data: mentors, isLoading, isError } = useGetMentorsQuery();
  const [requestMentorship] = useRequestMentorshipMutation();
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequest = async (formData) => {
    try {
      await requestMentorship({
        mentorId: selectedMentor._id,
        ...formData
      }).unwrap();
      toast.success('Mentorship request sent successfully!');
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.data?.message || 'Failed to send request');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-8 px-4 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Mentorship Program</h1>
        <p className="mt-2 text-gray-600">
          Connect with experienced alumni for career guidance
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search mentors by name, skills, or company..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option>All Industries</option>
              <option>Technology</option>
              <option>Business</option>
              <option>Healthcare</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option>All Skills</option>
              <option>Leadership</option>
              <option>Interview Prep</option>
              <option>Career Transition</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Mentors Grid */}
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <div className="text-center py-12 text-red-500">
          Failed to load mentors. Please try again later.
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {mentors?.map((mentor) => (
            <motion.div
              key={mentor._id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              whileHover={{ y: -5 }}
            >
              <MentorCard 
                mentor={mentor}
                onRequest={() => {
                  setSelectedMentor(mentor);
                  setIsModalOpen(true);
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Mentorship Request Modal */}
      <MentorshipRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mentor={selectedMentor}
        onSubmit={handleRequest}
      />
    </motion.div>
  );
};

export default MentorshipPage;