import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['event', 'job', 'message', 'mentorship'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  link: String
}, { timestamps: true });

// Indexes
notificationSchema.index({ userId: 1, isRead: 1 });
notificationSchema.index({ createdAt: -1 });

// Add to notificationSchema
notificationSchema.add({
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days default
  }
});

// Then add a periodic cleanup job
const cleanupExpiredNotifications = async () => {
  try {
    await Notification.deleteMany({
      expiresAt: { $lt: new Date() }
    });
  } catch (error) {
    console.error('Error cleaning up notifications:', error);
  }
};

// Run daily
setInterval(cleanupExpiredNotifications, 24 * 60 * 60 * 1000);

export default mongoose.model('Notification', notificationSchema);