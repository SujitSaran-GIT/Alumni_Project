import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { 
  requestMentorship, 
  getMentors 
} from '../controllers/mentorship.controller.js';

const router = express.Router();

router.get('/', protect, getMentors);
router.post('/request', protect, requestMentorship);

export default router;