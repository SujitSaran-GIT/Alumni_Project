import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MentorCard = ({ mentor, onRequest }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
      {/* Mentor Image */}
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        <img 
          src={mentor.avatar || '/default-mentor.jpg'}
          alt={mentor.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-xl font-bold text-white">{mentor.name}</h3>
          <p className="text-white/90 text-sm">
            {mentor.currentJob?.title} at {mentor.currentJob?.company}
          </p>
        </div>
      </div>

      {/* Mentor Details */}
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-4">
          <p className="text-gray-600 text-sm mb-2">
            <span className="font-medium">Graduation Year:</span> {mentor.graduationYear}
          </p>
          <p className="text-gray-600 text-sm mb-2">
            <span className="font-medium">Expertise:</span> {mentor.expertise?.join(', ')}
          </p>
          <p className="text-gray-600 text-sm line-clamp-3">
            {mentor.bio || 'Experienced professional offering mentorship in their field.'}
          </p>
        </div>

        <div className="mt-auto pt-4 flex justify-between items-center">
          <Link 
            to={`/alumni/${mentor._id}`}
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            View Profile
          </Link>
          <motion.button
            onClick={onRequest}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Request Mentorship
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;