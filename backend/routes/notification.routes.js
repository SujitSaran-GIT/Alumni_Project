import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { getNotifications, markAsRead } from '../controllers/notification.controller.js';

const router = express.Router();

router.route('/')
  .get(protect, getNotifications);

router.route('/:id/read').put(protect, markAsRead);

export default router;