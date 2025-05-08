import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import {
  createProfile,
  updateProfile,
  getProfileById,
  getAllProfiles,
  getAllMentors,
  toggleMentorStatus,
  deleteProfile,
  searchProfiles
} from '../controllers/profile.controller.js';
import roleMiddleware from '../middlewares/role.middleware.js';

const router = express.Router();

// Public routes
router.route('/search').get(protect, searchProfiles); // Search profiles (public)                                               // passed
router.route('/mentors').get(protect, getAllMentors); // Get all mentors (public)                                               // passed            
router.route('/:id').get(protect ,getProfileById);    // Get profile by ID (public)                                             // passed

// Protected routes (require user authentication)
router.route('/').post(protect, createProfile);          // Create new profile                                                  // passed
router.route('/').put(protect, updateProfile);           // Update entire profile                                               // passed

router.route('/toggle-mentor').put(protect, toggleMentorStatus); // Toggle mentor status                                        // passed
router.route('/me').delete(protect, deleteProfile);      // Delete own profile                                                  // passed

// Admin-only routes
router.route('/').get(protect, roleMiddleware(['admin']), getAllProfiles);   // Get all profiles (admin)                        // passed
router.route('/:id').delete(protect, roleMiddleware(['admin']), deleteProfile); // Delete any profile (admin)                   // passed

export default router;