import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['alumni', 'admin', 'student'],
    required: true,
    default: 'alumni'
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  graduationYear: {
    type: Number,
    min: 1900,
    max: new Date().getFullYear()
  },
  degree: String,
  profilePic: String,
  isVerified: {
    type: Boolean,
    default: false
  },
  lastActive: Date,
  phone: String,
  bio: String,
  currentJob: {
    title: String,
    company: String,
    location: String
  },
  skills: [String],
  socialLinks: {
    linkedIn: String,
    github: String
  },
  privacySettings: {
    showEmail: Boolean,
    showPhone: Boolean
  },
  notificationPreferences: {
    email: {
      event: { type: Boolean, default: true },
      job: { type: Boolean, default: true },
      message: { type: Boolean, default: true }
    },
    push: {
      event: { type: Boolean, default: true },
      job: { type: Boolean, default: true },
      message: { type: Boolean, default: true }
    }
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ graduationYear: 1 });
userSchema.index({ 'currentJob.location': 'text' });

export default mongoose.model('User', userSchema);