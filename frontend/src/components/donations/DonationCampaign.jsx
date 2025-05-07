import { motion } from 'framer-motion';

const DonationCampaign = ({ campaign, isSelected }) => {
  return (
    <motion.div
      className={`p-6 rounded-lg border-2 transition-all ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300 bg-white'}`}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden">
            <img 
              src={campaign.image} 
              alt={campaign.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-bold">{campaign.name}</h3>
          <p className="text-gray-600 mt-1 line-clamp-2">{campaign.description}</p>
          <div className="mt-3">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500" 
                style={{ width: `${Math.min(100, (campaign.amountRaised / campaign.goalAmount) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>{Math.round((campaign.amountRaised / campaign.goalAmount) * 100)}% funded</span>
              <span>₹{campaign.amountRaised.toLocaleString()} of ₹{campaign.goalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DonationCampaign;