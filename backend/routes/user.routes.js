import express from 'express';
import { protect, admin } from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';
import validateObjectId from '../middlewares/validateObjectId.js'; // Add this import
import {
  getUsers,
  getUserProfile,
  updateUserProfile,
  getUserById,
  deleteUserById,
  searchUsers,
  getUserStats,
  updateUserRole,
  bulkUpdateUsers,
  verifyUser,
  requestPasswordReset,
  updateLastActive,
  exportUsers,
  createUserProfile,
  getUserByIdForAdmin,
} from '../controllers/user.controller.js';
import upload from '../middlewares/upload.middleware.js';
import uploaded from '../middlewares/upload.profile.js';

const router = express.Router();

// 1. Static routes first
router.route('/profile')
  .post(protect, upload.single('profilePic'), createUserProfile)                                // passed
  .get(protect, getUserProfile)                                                                 // passed
  .put(protect, uploaded.single('profilePic'), updateUserProfile);                              // passed

// 2. Specific named routes before parameterized routes
router.get('/search', protect, searchUsers);                                                    // passed
router.post('/reset-password', requestPasswordReset);                                           // passed
router.post('/activity', protect, updateLastActive);                                            // passed

// 3. Admin-only routes
router.get('/stats', protect, roleMiddleware(['admin']), getUserStats);                         // passed
router.post('/bulk-update', protect, roleMiddleware(['admin']), bulkUpdateUsers);               // passed
router.get('/export', protect, roleMiddleware(['admin']), exportUsers);                         // passed

// 4. ID parameterized routes (with validation)
router.route('/:id')
  .get(protect, validateObjectId, getUserById)                                                  // passed
  .get(protect, validateObjectId, roleMiddleware(['admin']), getUserByIdForAdmin)               // passed
  .delete(protect, validateObjectId, roleMiddleware(['admin']), deleteUserById);                // passed

router.patch('/:id/role', protect, validateObjectId, roleMiddleware(['admin']), updateUserRole);// passed
router.post('/:id/verify', protect, validateObjectId, roleMiddleware(['admin']), verifyUser);   // passed

// 5. Root route
router.route('/')
  .get(protect, roleMiddleware(['admin']), getUsers);                                           // passed

export default router;