import Mentorship from '../models/Mentorship.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import { getWebSocketService } from '../config/websocket.js';
import mongoose from 'mongoose';

const requestMentorship = async (req, res) => {
    try {
        const { mentorId, topics } = req.body;

        const mentorship = new Mentorship({
            mentorId,
            menteeId: req.user._id,
            topics,
            status: 'requested'
        });

        await mentorship.save();

        // Create notification for mentor
        const mentee = await User.findById(req.user._id);
        const notification = new Notification({
            userId: mentorId,
            type: 'mentorship',
            message: `${mentee.firstName} ${mentee.lastName} has requested mentorship`,
            link: `/mentorship/${mentorship._id}`
        });
        await notification.save();

        res.status(201).json(mentorship);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getMentors = async (req, res) => {
    try {
        const mentors = await User.aggregate([
            { $match: { 'profile.isMentor': true } },
            { $sample: { size: 20 } }, // Get random 20 mentors
            {
                $project: {
                    firstName: 1,
                    lastName: 1,
                    graduationYear: 1,
                    degree: 1,
                    'profile.mentorshipTopics': 1,
                    'profile.bio': 1
                }
            }
        ]);

        res.json(mentors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all mentorship requests for a mentor
const getMentorshipRequests = async (req, res) => {
    try {
        const requests = await Mentorship.find({
            mentorId: req.user._id,
            status: 'requested'
        }).populate('menteeId', 'firstName lastName email profilePic');

        res.json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Accept a mentorship request
const acceptMentorship = async (req, res) => {
    try {
        const mentorship = await Mentorship.findOneAndUpdate(
            {
                _id: req.params.id,
                mentorId: req.user._id,
                status: 'requested'
            },
            {
                status: 'active',
                startDate: new Date()
            },
            { new: true }
        ).populate('menteeId', 'firstName lastName email');

        if (!mentorship) {
            return res.status(404).json({ message: 'Mentorship request not found' });
        }

        // Create notification for mentee
        const notification = new Notification({
            userId: mentorship.menteeId._id,
            type: 'mentorship',
            message: `${req.user.firstName} ${req.user.lastName} has accepted your mentorship request`,
            link: `/mentorship/${mentorship._id}`
        });
        await notification.save();

        // Send real-time notification
        const wsService = getWebSocketService();
        wsService.sendToUser(mentorship.menteeId._id, {
            type: 'MENTORSHIP_ACCEPTED',
            data: mentorship
        });

        res.json(mentorship);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Reject a mentorship request
const rejectMentorship = async (req, res) => {
    try {
        const mentorship = await Mentorship.findOneAndUpdate(
            {
                _id: req.params.id,
                mentorId: req.user._id,
                status: 'requested'
            },
            { status: 'cancelled' },
            { new: true }
        ).populate('menteeId', 'firstName lastName email');

        if (!mentorship) {
            return res.status(404).json({ message: 'Mentorship request not found' });
        }

        // Create notification for mentee
        const notification = new Notification({
            userId: mentorship.menteeId._id,
            type: 'mentorship',
            message: `${req.user.firstName} ${req.user.lastName} has declined your mentorship request`,
            link: `/mentorship/${mentorship._id}`
        });
        await notification.save();

        // Send real-time notification
        const wsService = getWebSocketService();
        wsService.sendToUser(mentorship.menteeId._id, {
            type: 'MENTORSHIP_REJECTED',
            data: mentorship
        });

        res.json({ message: 'Mentorship request declined' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all active mentorships for a user
const getActiveMentorships = async (req, res) => {
    try {
        const mentorships = await Mentorship.find({
            $or: [
                { mentorId: req.user._id },
                { menteeId: req.user._id }
            ],
            status: 'active'
        })
            .populate('mentorId', 'firstName lastName profilePic')
            .populate('menteeId', 'firstName lastName profilePic');

        res.json(mentorships);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Complete a mentorship
const completeMentorship = async (req, res) => {
    try {
        const mentorship = await Mentorship.findOneAndUpdate(
            {
                _id: req.params.id,
                $or: [
                    { mentorId: req.user._id },
                    { menteeId: req.user._id }
                ],
                status: 'active'
            },
            {
                status: 'completed',
                endDate: new Date()
            },
            { new: true }
        );

        if (!mentorship) {
            return res.status(404).json({ message: 'Active mentorship not found' });
        }

        // Create notification for both parties
        const otherUserId = mentorship.mentorId.equals(req.user._id)
            ? mentorship.menteeId
            : mentorship.mentorId;

        const notification = new Notification({
            userId: otherUserId,
            type: 'mentorship',
            message: `Your mentorship with ${req.user.firstName} ${req.user.lastName} has been completed`,
            link: `/mentorship/${mentorship._id}/review`
        });
        await notification.save();

        // Send real-time notification
        const wsService = getWebSocketService();
        wsService.sendToUser(otherUserId, {
            type: 'MENTORSHIP_COMPLETED',
            data: mentorship
        });

        res.json(mentorship);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get mentorship details
const getMentorshipDetails = async (req, res) => {
    try {
        const mentorship = await Mentorship.findOne({
            _id: req.params.id,
            $or: [
                { mentorId: req.user._id },
                { menteeId: req.user._id }
            ]
        })
            .populate('mentorId', 'firstName lastName profilePic')
            .populate('menteeId', 'firstName lastName profilePic');

        if (!mentorship) {
            return res.status(404).json({ message: 'Mentorship not found' });
        }

        res.json(mentorship);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// ================== ALUMNI CONTROLLERS ================== //

// Search for mentors
const searchMentors = async (req, res) => {
    try {
        const { topic, year, degree, name } = req.query;
        const query = { 'profile.isMentor': true };

        if (topic) query['profile.mentorshipTopics'] = { $in: [topic] };
        if (year) query.graduationYear = year;
        if (degree) query.degree = new RegExp(degree, 'i');
        if (name) {
            query.$or = [
                { firstName: new RegExp(name, 'i') },
                { lastName: new RegExp(name, 'i') }
            ];
        }

        const mentors = await User.find(query)
            .select('firstName lastName graduationYear degree profile')
            .limit(20);

        res.json(mentors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get user's mentorships
const getUserMentorships = async (req, res) => {
    try {
        const { status } = req.query;
        const query = {
            $or: [
                { mentorId: req.user._id },
                { menteeId: req.user._id }
            ]
        };

        if (status) query.status = status;

        const mentorships = await Mentorship.find(query)
            .populate('mentorId', 'firstName lastName profilePic')
            .populate('menteeId', 'firstName lastName profilePic')
            .sort({ createdAt: -1 });

        res.json(mentorships);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Respond to mentorship request (accept/reject)
const respondToRequest = async (req, res) => {
    try {
        const { response } = req.body; // 'accept' or 'reject'
        const status = response === 'accept' ? 'active' : 'rejected';

        const mentorship = await Mentorship.findOneAndUpdate(
            {
                _id: req.params.id,
                mentorId: req.user._id,
                status: 'requested'
            },
            {
                status,
                ...(status === 'active' && { startDate: new Date() })
            },
            { new: true }
        ).populate('menteeId', 'firstName lastName email');

        if (!mentorship) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // Create notification
        const message = status === 'active'
            ? `${req.user.firstName} accepted your request`
            : `${req.user.firstName} declined your request`;

        const notification = new Notification({
            userId: mentorship.menteeId._id,
            type: 'mentorship',
            message,
            link: `/mentorship/${mentorship._id}`
        });
        await notification.save();

        // Real-time notification
        getWebSocketService().sendToUser(mentorship.menteeId._id, {
            type: `MENTORSHIP_${status.toUpperCase()}`,
            data: mentorship
        });

        res.json(mentorship);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Add meeting to mentorship
const addMeeting = async (req, res) => {
    try {
        const { date, notes, duration } = req.body;
        if (!date || !notes || !duration) {
            return res.status(400).json({ message: 'Date, notes, and duration are required' });
        }

        const mentorshipId = new mongoose.Types.ObjectId(req.params.id);
        const userId = new mongoose.Types.ObjectId(req.user._id);

        const mentorship = await Mentorship.findOneAndUpdate(
            {
                _id: mentorshipId,
                $or: [
                    { mentorId: userId },
                    { menteeId: userId }
                ],
                status: 'active'
            },
            {
                $push: {
                    meetings: {
                        date: new Date(date),
                        notes,
                        duration
                    }
                }
            },
            { new: true }
        );

        if (!mentorship) {
            console.warn(`Mentorship not found or access denied for user ${userId}`);
            return res.status(404).json({ message: 'Mentorship not found' });
        }

        const otherUserId = mentorship.mentorId.equals(userId)
            ? mentorship.menteeId
            : mentorship.mentorId;

        const notification = new Notification({
            userId: otherUserId,
            type: 'mentorship',
            message: `New meeting scheduled for mentorship`,
            link: `/mentorship/${mentorship._id}`
        });
        await notification.save();

        getWebSocketService().sendToUser(otherUserId, {
            type: 'NEW_MENTORSHIP_MEETING',
            data: mentorship
        });

        res.json(mentorship);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


// ================== ADMIN CONTROLLERS ================== //

// Get all mentorships (admin)
const getAllMentorships = async (req, res) => {
    try {
        const { status, mentorId, menteeId } = req.query;
        const query = {};

        if (status) query.status = status;
        if (mentorId) query.mentorId = mentorId;
        if (menteeId) query.menteeId = menteeId;

        const mentorships = await Mentorship.find(query)
            .populate('mentorId', 'firstName lastName')
            .populate('menteeId', 'firstName lastName')
            .sort({ createdAt: -1 });

        res.json(mentorships);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get mentorship statistics (admin)
const getMentorshipStats = async (req, res) => {
    try {
        const stats = await Mentorship.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    avgDuration: {
                        $avg: {
                            $subtract: ['$endDate', '$startDate']
                        }
                    }
                }
            },
            {
                $project: {
                    status: '$_id',
                    count: 1,
                    avgDuration: { $divide: ['$avgDuration', 1000 * 60 * 60 * 24] }, // Convert to days
                    _id: 0
                }
            }
        ]);

        const meetingStats = await Mentorship.aggregate([
            {
                $unwind: '$meetings'
            },
            {
                $group: {
                    _id: null,
                    totalMeetings: { $sum: 1 },
                    totalHours: { $sum: { $divide: ['$meetings.duration', 60] } }
                }
            }
        ]);

        res.json({
            byStatus: stats,
            meetings: meetingStats[0] || { totalMeetings: 0, totalHours: 0 }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Cancel mentorship (admin)
const cancelMentorship = async (req, res) => {
    try {
        const mentorship = await Mentorship.findByIdAndUpdate(
            req.params.id,
            { status: 'cancelled' },
            { new: true }
        )
            .populate('mentorId', 'firstName lastName email')
            .populate('menteeId', 'firstName lastName email');

        if (!mentorship) {
            return res.status(404).json({ message: 'Mentorship not found' });
        }

        // Notify both parties
        const notificationPromises = [
            new Notification({
                userId: mentorship.mentorId._id,
                type: 'mentorship',
                message: `Admin has cancelled your mentorship`,
                link: `/mentorship/${mentorship._id}`
            }).save(),
            new Notification({
                userId: mentorship.menteeId._id,
                type: 'mentorship',
                message: `Admin has cancelled your mentorship`,
                link: `/mentorship/${mentorship._id}`
            }).save()
        ];

        await Promise.all(notificationPromises);

        // Real-time notifications
        const wsService = getWebSocketService();
        wsService.sendToUser(mentorship.mentorId._id, {
            type: 'MENTORSHIP_CANCELLED',
            data: mentorship
        });
        wsService.sendToUser(mentorship.menteeId._id, {
            type: 'MENTORSHIP_CANCELLED',
            data: mentorship
        });

        res.json(mentorship);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export { requestMentorship, getMentors, getMentorshipRequests, acceptMentorship, rejectMentorship, getActiveMentorships, completeMentorship, searchMentors, getMentorshipDetails, getUserMentorships, respondToRequest, addMeeting, getAllMentorships, getMentorshipStats, cancelMentorship }