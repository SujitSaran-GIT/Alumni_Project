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

export { createEvent, getEvents, registerForEvent };