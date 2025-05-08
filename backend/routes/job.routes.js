import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';
import {
  createJob,
  getJobs,
  searchJobs,
  getJobById,
  updateJob,
  closeJob,
  applyForJob,
  getMyPostedJobs,
  getMyAppliedJobs,
  getJobApplications,
  getAllJobs,
  forceCloseAnyJob,
  deleteAnyJob,
  getAllApplications
} from '../controllers/job.controller.js';

const router = express.Router();

// ===================
// 📂 PUBLIC ROUTES
// ===================
router.get('/', getJobs);                         // GET /jobs                                                                                    // passed
router.get('/search', searchJobs);                // GET /jobs/search                                                                             // passed

// ===================
// 🛠️ ADMIN ROUTES (KEEP ABOVE DYNAMIC ROUTES)
// ===================
router.get('/admin/jobs', protect, roleMiddleware(['admin']), getAllJobs);                // GET /jobs/admin/jobs                                 // passed
router.put('/admin/jobs/:id/force-close', protect, roleMiddleware(['admin']), forceCloseAnyJob); // PUT /jobs/admin/jobs/:id/force-close          // passed
router.delete('/admin/jobs/:id', protect, roleMiddleware(['admin']), deleteAnyJob);       // DELETE /jobs/admin/jobs/:id                          // passed
router.get('/admin/applications', protect, roleMiddleware(['admin']), getAllApplications); // GET /jobs/admin/applications                        // passed

// ===================
// 🔐 PROTECTED ROUTES
// ===================

// 🎓 Alumni Only
router.post('/', protect, roleMiddleware(['alumni']), createJob);                         // POST /jobs                                           // passed
router.get('/my-jobs', protect, roleMiddleware(['alumni']), getMyPostedJobs);             // GET /jobs/my-jobs                                    // passed
router.put('/:id', protect, roleMiddleware(['alumni']), updateJob);                       // PUT /jobs/:id                                        // passed
router.put('/:id/close', protect, roleMiddleware(['alumni']), closeJob);                  // PUT /jobs/:id/close                                  // passed

// 🙋‍♂️ Applicants
router.get('/applied', protect, getMyAppliedJobs);                                         // GET /jobs/applied                                   // passed
router.post('/:id/apply', protect, applyForJob);                                           // POST /jobs/:id/apply                                // passed

// 👀 Admins Viewing Job Applications
router.get('/:id/applications', protect, roleMiddleware(['admin']), getJobApplications);  // GET /jobs/:id/applications                           // passed

// ===================
// 📄 CATCH-ALL DYNAMIC ROUTE (KEEP LAST)
// ===================
router.get('/:id', protect, getJobById); // GET /jobs/:id                                                                                         // passed

export default router;
