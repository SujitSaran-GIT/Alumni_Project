import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { updateProfile, getProfileById } from '../controllers/profile.controller.js';

const router = express.Router();

router.route('/').put(protect, updateProfile);
router.route('/:id').get(getProfileById);

export default router;