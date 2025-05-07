import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  campaign: String,
  paymentMethod: String,
  transactionId: String,
  isRecurring: {
    type: Boolean,
    default: false
  },
  receiptSent: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Indexes
donationSchema.index({ donorId: 1 });
donationSchema.index({ createdAt: -1 });

export default mongoose.model('Donation', donationSchema);

// import mongoose from 'mongoose';

// const donationSchema = new mongoose.Schema({
//   donorId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   amount: {
//     type: Number,
//     required: true
//   },
//   currency: {
//     type: String,
//     default: 'INR',
//     enum: ['INR'] // Razorpay only supports INR
//   },
//   razorpayOrderId: {
//     type: String,
//     required: true
//   },
//   razorpayPaymentId: {
//     type: String
//   },
//   razorpaySignature: {
//     type: String
//   },
//   status: {
//     type: String,
//     enum: ['created', 'attempted', 'paid', 'failed'],
//     default: 'created'
//   },
//   campaign: String,
//   receiptSent: {
//     type: Boolean,
//     default: false
//   },
//   method: {
//     type: String,
//     enum: ['card', 'netbanking', 'wallet', 'upi', 'emi'],
//     required: true
//   }
// }, { timestamps: true });

// export default mongoose.model('Donation', donationSchema);