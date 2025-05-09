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
        enum: ['requested', 'active', 'completed', 'cancelled', 'rejected'],
        default: 'requested'
    },
    startDate: Date,
    endDate: Date,
    meetings: [{
        date: Date,
        notes: String,
        duration: Number // in minutes
    }],
    review: {
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        feedback: String,
        createdAt: Date
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes
mentorshipSchema.index({ mentorId: 1 });
mentorshipSchema.index({ menteeId: 1 });
mentorshipSchema.index({ status: 1 });
mentorshipSchema.index({ createdAt: -1 });

export default mongoose.model('Mentorship', mentorshipSchema);