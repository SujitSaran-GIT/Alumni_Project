import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import {
  createPost,
  getPosts,
  addComment,
  getPostsByTag,
  getPostsByAuthor,
  getPostById,
  updatePost,
  deletePost,
  upvotePost,
  searchPosts,
  getPostAnalytics
} from '../controllers/post.controller.js';
import roleMiddleware from '../middlewares/role.middleware.js';

const router = express.Router();

// Public/General routes
router.route('/')
  .post(protect, roleMiddleware(['alumni']), createPost)                                  // passed
  .get(protect, getPosts);                                                                // passed

// Specific routes (must be above :id route)
router.route('/search').get(protect, searchPosts);                                        // passed
router.route('/analytics').get(protect, roleMiddleware(['admin']), getPostAnalytics);     // passed
router.route('/tag/:tag').get(protect, getPostsByTag);                                    // passed
router.route('/author/:authorId').get(protect, getPostsByAuthor);                         // passed

// Routes with :id/upvote and :id/comments (must come before :id)
router.route('/:id/upvote').post(protect, upvotePost);                                    // passed
router.route('/:id/comments').post(protect, addComment);                                  // passed

// Route with dynamic :id (placed last to avoid overriding specific routes)
router.route('/:id')
  .get(protect, getPostById)                                                              // passed
  .put(protect, roleMiddleware(['alumni']), updatePost)                                   // passed
  .delete(protect, roleMiddleware(['alumni', 'admin']), deletePost);                      // passed

export default router;
