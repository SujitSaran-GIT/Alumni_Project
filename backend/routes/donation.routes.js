import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';
import {
  createDonation,
  getDonations,
  handleDonationWebhook,
  getDonationById,
  getDonationsByCampaign,
  getAllDonations,
  updateDonationStatus,
  getDonationStats,
  createRecurringDonation
} from '../controllers/donation.controller.js';

const router = express.Router();

// User routes
router.route('/')
  .post(protect, roleMiddleware(['alumni']), createDonation)
  .get(protect, getDonations);

router.route('/recurring')
  .post(protect, roleMiddleware(['alumni']), createRecurringDonation);

router.route('/stats')
  .get(protect, getDonationStats);

router.route('/:id')
  .get(protect, getDonationById);

// Admin routes
router.route('/admin/all')
  .get(protect, roleMiddleware(['admin']), getAllDonations);

router.route('/admin/campaign/:campaign')
  .get(protect, roleMiddleware(['admin']), getDonationsByCampaign);

router.route('/admin/:id/status')
  .put(protect, roleMiddleware(['admin']), updateDonationStatus);

// Webhook (no auth)
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