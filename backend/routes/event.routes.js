import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { createJob, getJobs, applyForJob } from '../controllers/job.controller.js';

const router = express.Router();

router.route('/')
  .post(protect, createJob)
  .get(getJobs);

router.route('/:id/apply').post(protect, applyForJob);

export default router;