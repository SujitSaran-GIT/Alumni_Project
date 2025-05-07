import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCreateDonationMutation } from '../../features/api/donationApi';
// import { loadRazorpay } from '../../utils/razorpayUtils';
import { toast } from 'react-hot-toast';

const DonationForm = ({ campaignId, campaignName }) => {
  const [amount, setAmount] = useState(1000);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [createDonation] = useCreateDonationMutation();

  const presetAmounts = [500, 1000, 2000, 5000];

  const handleDonation = async () => {
    if (!name) {
      toast.error('Please enter your name');
      return;
    }

    try {
      // Load Razorpay script
      // await loadRazorpay('https://checkout.razorpay.com/v1/checkout.js');
      
      // Create order on backend
      const { data } = await createDonation({ 
        amount, 
        campaignId,
        name,
        message 
      }).unwrap();

      // Initialize Razorpay
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: 'INR',
        name: "Alumni Portal Donation",
        description: `Donation to ${campaignName}`,
        order_id: data.orderId,
        handler: function(response) {
          // Verification happens via webhook
          toast.success('Thank you for your donation!');
        },
        prefill: {
          name: name,
          email: data.email || '',
          contact: data.phone || ''
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error('Donation failed. Please try again.');
      console.error('Donation error:', err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount (₹)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min="100"
          className="w-full p-2 border rounded-md"
        />
        <div className="flex gap-2 mt-2">
          {presetAmounts.map((amt) => (
            <motion.button
              key={amt}
              type="button"
              onClick={() => setAmount(amt)}
              className={`px-3 py-1 text-sm rounded-md ${amount === amt ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              whileTap={{ scale: 0.95 }}
            >
              ₹{amt}
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message (Optional)
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded-md"
          rows="3"
        />
      </div>

      <motion.button
        onClick={handleDonation}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-medium"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Donate ₹{amount}
      </motion.button>
    </motion.div>
  );
};

export default DonationForm;