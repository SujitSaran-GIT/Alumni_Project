import { motion } from 'framer-motion';
import { useRegisterForEventMutation } from '../../redux/features/api/eventApi';
import { toast } from 'react-hot-toast';

const EventCard = ({ event }) => {
  const [registerForEvent] = useRegisterForEventMutation();

  const handleRegister = async () => {
    try {
      await registerForEvent(event._id).unwrap();
      toast.success('Successfully registered for event!');
    } catch (err) {
      toast.error('Failed to register for event');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <motion.img 
        src={event.image} 
        alt={event.title}
        className="w-full h-48 object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4">{event.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(event.date).toLocaleDateString()}
          </span>
          
          <motion.button
            onClick={handleRegister}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;