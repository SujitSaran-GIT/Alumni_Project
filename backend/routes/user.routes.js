import express from 'express';
import { protect, admin } from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';
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
} from '../controllers/user.controller.js';

const router = express.Router();

// 1. Static routes first
router.route('/profile')
  .post(protect, createUserProfile)
  .get(protect, getUserProfile)               // passed
  .put(protect, updateUserProfile);           // 

// 2. Dynamic routes after
router.route('/')
  .get(protect, roleMiddleware(['admin']), getUsers); // passed

router.route('/:id')
  .get(protect, getUserById)    // passed
  .delete(protect, roleMiddleware(['admin']), deleteUserById);    // passed
// Add these to your user routes
router.get('/search', protect, searchUsers);
router.get('/stats', protect, roleMiddleware(['admin']), getUserStats);
router.patch('/:id/role', protect, roleMiddleware(['admin']), updateUserRole);
router.post('/bulk-update', protect, roleMiddleware(['admin']), bulkUpdateUsers);
router.post('/:id/verify', protect, roleMiddleware(['admin']), verifyUser);
router.post('/reset-password', requestPasswordReset);
router.post('/activity', protect, updateLastActive);
router.get('/export', protect, roleMiddleware(['admin']), exportUsers);


export default router;