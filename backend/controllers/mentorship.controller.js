import Mentorship from '../models/Mentorship.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';

export const requestMentorship = async (req, res) => {
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

export const getMentors = async (req, res) => {
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