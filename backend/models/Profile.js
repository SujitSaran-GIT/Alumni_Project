import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  education: [{
    degree: String,
    university: String,
    year: Number
  }],
  workExperience: [{
    company: String,
    role: String,
    startYear: Number,
    endYear: Number
  }],
  interests: [String],
  volunteerHistory: [String],
  isMentor: {
    type: Boolean,
    default: false
  },
  mentorshipTopics: [String]
});

// Indexes
profileSchema.index({ userId: 1 });
profileSchema.index({ isMentor: 1 });

export default mongoose.model('Profile', profileSchema);