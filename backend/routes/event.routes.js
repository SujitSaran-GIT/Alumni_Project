import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';
import {
  createEvent,
  getEvents,
  registerForEvent,
  getEventById,
  updateEvent,
  cancelEvent,
  getEventsByOrganizer,
  searchEvents,
  getMyEvents
} from '../controllers/event.controller.js';

const router = express.Router();

// Public / Specific routes FIRST
router.route('/search').get(protect, searchEvents);                                                     // passed
router.route('/my-events').get(protect, getMyEvents);                                                   // passed
router.route('/organizer/:organizerId').get(protect, roleMiddleware(['admin']) ,getEventsByOrganizer);  // passed  

// Authenticated CRUD routes
router.route('/')
  .post(protect, roleMiddleware(['admin']), createEvent)                                                // passed
  .get(protect, getEvents);                                                                             // passed

// Dynamic routes LAST
router.route('/:id/register').post(protect, registerForEvent);                                          // passed
router.route('/:id')
  .get(protect, getEventById)                                                                           // passed
  .put(protect, roleMiddleware(['admin']), updateEvent)                                                 // passed
  .delete(protect, roleMiddleware(['admin']), cancelEvent);                                             // passed

export default router;
