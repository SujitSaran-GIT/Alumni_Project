import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { 
  createDonation, 
  getDonations, 
  handleDonationWebhook 
} from '../controllers/donation.controller.js';

const router = express.Router();

router.post('/', protect, createDonation);
router.get('/', protect, getDonations);
router.post('/webhook', express.raw({ type: 'application/json' }), handleDonationWebhook);

export default router;

// import express from 'express';
// import { protect } from '../middlewares/auth.middleware.js';
// import { 
//   createDonationOrder, 
//   verifyDonation, 
//   getDonations,
//   handleWebhook
// } from '../controllers/donation.controller.js';

// const router = express.Router();

// router.post('/create-order', protect, createDonationOrder);
// router.post('/verify', protect, verifyDonation);
// router.get('/', protect, getDonations);
// router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// export default router;