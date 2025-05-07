import { motion } from 'framer-motion';
import { useState } from 'react';
import { useGetCampaignsQuery } from '../redux/features/api/donationApi';
import DonationCampaign from '../components/donations/DonationCampaign';
// import DonationForm from '../components/donations/DonationForm';
import ProgressBar from '../components/ui/ProgressBar';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const DonationsPage = () => {
  const { data: campaigns, isLoading } = useGetCampaignsQuery();
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-8 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900">Support Your Alma Mater</h1>
        <p className="mt-2 text-gray-600">
          Contribute to meaningful initiatives and help shape the future
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Campaigns List */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-6">
              {campaigns?.map((campaign, index) => (
                <motion.div
                  key={campaign._id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedCampaign(campaign)}
                  className="cursor-pointer"
                >
                  <DonationCampaign 
                    campaign={campaign} 
                    isSelected={selectedCampaign?._id === campaign._id}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Donation Form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="sticky top-4 h-fit"
        >
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4">
              {selectedCampaign ? `Donate to ${selectedCampaign.name}` : 'Select a campaign'}
            </h3>
            
            {selectedCampaign && (
              <>
                <ProgressBar 
                  value={selectedCampaign.amountRaised} 
                  max={selectedCampaign.goalAmount} 
                  className="my-4"
                />
                <div className="flex justify-between text-sm text-gray-600 mb-6">
                  <span>Raised: ₹{selectedCampaign.amountRaised.toLocaleString()}</span>
                  <span>Goal: ₹{selectedCampaign.goalAmount.toLocaleString()}</span>
                </div>
                
                {/* <DonationForm 
                  campaignId={selectedCampaign._id} 
                  campaignName={selectedCampaign.name}
                /> */}
              </>
            )}

            {!selectedCampaign && (
              <motion.div 
                className="text-center py-8 text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-5xl mb-4">👈</div>
                <p>Select a campaign from the list</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DonationsPage;