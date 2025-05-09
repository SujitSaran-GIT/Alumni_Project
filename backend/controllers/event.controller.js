import Event from '../models/Event.js';
import User from '../models/User.js';
import { sendEmail } from '../config/email.js';

const createEvent = async (req, res) => {
  try {
    const event = new Event({
      organizer: req.user._id,
      ...req.body,
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('organizer', 'firstName lastName email')
      .sort({ date: 1 });

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      'organizer',
      'firstName lastName email'
    );

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const alreadyRegistered = event.attendees.some(
      (attendee) => attendee.userId.toString() === req.user._id.toString()
    );

    if (alreadyRegistered) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    event.attendees.push({
      userId: req.user._id,
      registeredAt: Date.now(),
    });

    await event.save();

    // Send confirmation email
    const user = await User.findById(req.user._id);
    await sendEmail(
      user.email,
      `Event Registration Confirmation: ${event.title}`,
      `You have successfully registered for ${event.title} on ${event.date}`,
      `<h1>Event Registration Confirmation</h1>
      <p>You have successfully registered for ${event.title} on ${event.date}</p>`
    );

    res.json({ message: 'Registered for event successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'firstName lastName email')
      .populate('attendees.userId', 'firstName lastName email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, organizer: req.user._id },
      req.body,
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ 
        message: 'Event not found or you are not the organizer' 
      });
    }

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const cancelEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      $or: [
        { organizer: req.user._id },
        { role: 'admin' } // Admins can delete any event
      ]
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found or unauthorized' });
    }

    // Notify attendees
    const attendees = await User.find({ 
      _id: { $in: event.attendees.map(a => a.userId) } 
    });

    attendees.forEach(async attendee => {
      await sendEmail(
        attendee.email,
        `Event Cancelled: ${event.title}`,
        `The event ${event.title} scheduled for ${event.date} has been cancelled`,
        `<h1>Event Cancelled</h1>
        <p>The event ${event.title} scheduled for ${event.date} has been cancelled</p>`
      );
    });

    res.json({ message: 'Event cancelled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getEventsByOrganizer = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.params.organizerId })
      .sort({ date: 1 });

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const searchEvents = async (req, res) => {
  try {
    const { query, location, fromDate, toDate } = req.query;
    const searchFilter = {};

    if (query) {
      searchFilter.$text = { $search: query };
    }
    if (location) {
      searchFilter.location = new RegExp(location, 'i');
    }
    if (fromDate && toDate) {
      searchFilter.date = { $gte: new Date(fromDate), $lte: new Date(toDate) };
    }

    const events = await Event.find(searchFilter)
      .populate('organizer', 'firstName lastName')
      .sort({ date: 1 });

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({
      'attendees.userId': req.user._id
    }).sort({ date: 1 });

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { createEvent, getEvents, registerForEvent, getEventById, updateEvent, cancelEvent, getEventsByOrganizer, searchEvents, getMyEvents,  };