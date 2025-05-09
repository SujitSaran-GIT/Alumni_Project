import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  deleteNotification,
  getNotificationsByType
} from '../controllers/notification.controller.js';

const router = express.Router();

router.route('/')
  .get(protect, getNotifications);                          // passed

router.route('/all/read')
  .put(protect, markAllAsRead);                             // passed

router.route('/unread/count')
  .get(protect, getUnreadCount);                            // passed

router.route('/type/:type')
  .get(protect, getNotificationsByType);                    // passed

router.route('/:id/read')
  .put(protect, markAsRead);                                // passed

router.route('/:id')
  .delete(protect, deleteNotification);                     // passed

export default router;