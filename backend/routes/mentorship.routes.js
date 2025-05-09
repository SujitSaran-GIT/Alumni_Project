import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { 
  requestMentorship, 
  getMentors,
  getMentorshipRequests,
  acceptMentorship,
  rejectMentorship,
  getActiveMentorships,
  completeMentorship,
  addMeeting,
  getMentorshipDetails,
  getUserMentorships,
  respondToRequest,
  getAllMentorships,
  getMentorshipStats,
  cancelMentorship,
  searchMentors
} from '../controllers/mentorship.controller.js';
import roleMiddleware from '../middlewares/role.middleware.js';

const router = express.Router();

// General routes
router.get('/', protect, getMentors);                                                         // passed
router.post('/request', protect, requestMentorship);                                          // passed

// Mentor-specific routes
router.get('/requests', protect, getMentorshipRequests);                                      // passed
router.put('/:id/accept', protect, roleMiddleware(['student']), acceptMentorship);            // passed
router.put('/:id/reject', protect, roleMiddleware(['student']), rejectMentorship);            // passed

// Mentorship management
router.get('/active', protect, getActiveMentorships);                                         // passed
router.get('/:id', protect, getMentorshipDetails);                                            // passed
router.put('/:id/complete', protect, completeMentorship);                                     // passed
router.post('/:id/meetings', protect, addMeeting);                                            // passed

// ================== ALUMNI ROUTES ================== //
router.get('/search', protect, searchMentors);                                                // passed
router.get('/my-mentorships', protect, roleMiddleware(['student']), getUserMentorships);      // passed
router.put('/:id/respond', protect, roleMiddleware(['alumni']), respondToRequest);            // passed
router.post('/:id/meetings', protect, roleMiddleware(['alumni']), addMeeting);                // passed

// ================== ADMIN ROUTES ================== //
router.get('/admin/all', protect, roleMiddleware(['admin']), getAllMentorships);              // passed
router.get('/admin/stats', protect, roleMiddleware(['admin']), getMentorshipStats);           // passed
router.put('/admin/:id/cancel', protect, roleMiddleware(['admin']), cancelMentorship);        // passed

export default router;