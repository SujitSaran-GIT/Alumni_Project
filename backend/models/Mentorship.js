import mongoose from 'mongoose';

const mentorshipSchema = new mongoose.Schema({
    mentorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    menteeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    topics: [String],
    status: {
        type: String,
        enum: ['requested', 'active', 'completed', 'cancelled'],
        default: 'requested'
    },
    startDate: Date,
    endDate: Date,
    meetings: [{
        date: Date,
        notes: String,
        duration: Number // in minutes
    }]
}, { timestamps: true });

export default mongoose.model('Mentorship', mentorshipSchema);