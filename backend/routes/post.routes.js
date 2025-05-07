import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { createPost, getPosts, addComment } from '../controllers/post.controller.js';

const router = express.Router();

router.route('/')
  .post(protect, createPost)
  .get(getPosts);

router.route('/:id/comments').post(protect, addComment);

export default router;