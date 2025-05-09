import Donation from '../models/Donation.js';
import User from '../models/User.js';
import { sendEmail } from '../config/email.js';
import stripePackage from 'stripe';
import { v4 as uuidv4 } from 'uuid';

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

const createDonation = async (req, res) => {
  try {
    const { amount, campaign, paymentMethodId } = req.body;
    const currency = 'INR';

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid donation amount' });
    }

    if (!campaign) {
      return res.status(400).json({ message: 'Campaign is required' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert ₹ to paise
      currency,
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
      metadata: {
        userId: req.user._id.toString(),
        campaign,
        donationId: uuidv4()
      },
      return_url: `${process.env.FRONTEND_URL}/donation/complete`
    });

    const donation = new Donation({
      donorId: req.user._id,
      amount,
      currency,
      campaign,
      paymentMethod: 'stripe',
      transactionId: paymentIntent.id,
      status: paymentIntent.status
    });

    const createdDonation = await donation.save();

    const user = await User.findById(req.user._id);
    await sendEmail(
      user.email,
      'Donation Initiated',
      `We've received your donation request of ₹${amount} to ${campaign}`,
      `<h1>Donation Initiated</h1>
      <p>Amount: ₹${amount}</p>
      <p>Campaign: ${campaign}</p>
      <p>Status: Processing</p>`
    );

    res.status(201).json({
      donation: createdDonation,
      clientSecret: paymentIntent.client_secret
    });

  } catch (error) {
    console.error('Donation error:', error);
    if (error.type === 'StripeCardError') {
      return res.status(400).json({ message: error.message || 'Payment failed' });
    }
    res.status(500).json({ message: error.message || 'Donation processing failed' });
  }
};


const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donorId: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    // Add receipt URL for Stripe payments
    const donationsWithReceipts = await Promise.all(
      donations.map(async donation => {
        if (donation.paymentMethod === 'stripe') {
          try {
            const paymentIntent = await stripe.paymentIntents.retrieve(
              donation.transactionId
            );
            return {
              ...donation,
              receiptUrl: paymentIntent.charges.data[0]?.receipt_url || null
            };
          } catch (error) {
            console.error('Error fetching receipt:', error);
            return donation;
          }
        }
        return donation;
      })
    );

    res.json(donationsWithReceipts);
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ message: 'Failed to retrieve donations' });
  }
};

// Webhook handler for Stripe events
const handleDonationWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payment
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    try {
      // Update donation status
      const donation = await Donation.findOneAndUpdate(
        { transactionId: paymentIntent.id },
        { 
          status: 'completed',
          receiptSent: true
        },
        { new: true }
      ).populate('donorId');

      if (donation && donation.donorId) {
        // Send receipt email
        await sendEmail(
          donation.donorId.email,
          'Donation Receipt',
          `Thank you for your donation of ${donation.amount} ${donation.currency} to ${donation.campaign}`,
          `<h1>Thank You for Your Donation</h1>
          <p>Amount: ${donation.amount} ${donation.currency}</p>
          <p>Campaign: ${donation.campaign}</p>
          <p>Transaction ID: ${donation.transactionId}</p>
          <p>Receipt: <a href="${paymentIntent.charges.data[0]?.receipt_url}">View Online Receipt</a></p>`
        );
      }
    } catch (error) {
      console.error('Webhook processing error:', error);
    }
  }

  res.json({ received: true });
};

const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findOne({
      _id: req.params.id,
      donorId: req.user._id
    }).populate('donorId', 'firstName lastName email');

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Add receipt URL for Stripe payments
    if (donation.paymentMethod === 'stripe') {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        donation.transactionId
      );
      donation.receiptUrl = paymentIntent.charges.data[0]?.receipt_url || null;
    }

    res.json(donation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getDonationsByCampaign = async (req, res) => {
  try {
    const { campaign } = req.params;
    const donations = await Donation.find({ campaign })
      .populate('donorId', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateDonationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['completed', 'failed', 'refunded'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const donation = await Donation.findOneAndUpdate(
      { _id: req.params.id },
      { status },
      { new: true }
    ).populate('donorId');

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Notify donor if status changed to refunded
    if (status === 'refunded' && donation.donorId) {
      await sendEmail(
        donation.donorId.email,
        'Donation Refunded',
        `Your donation of ${donation.amount} ${donation.currency} has been refunded`,
        `<h1>Donation Refunded</h1>
        <p>Amount: ${donation.amount} ${donation.currency}</p>
        <p>Campaign: ${donation.campaign}</p>
        <p>Transaction ID: ${donation.transactionId}</p>`
      );
    }

    res.json(donation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getDonationStats = async (req, res) => {
  try {
    const stats = await Donation.aggregate([
      {
        $match: { status: 'completed' }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 },
          averageAmount: { $avg: '$amount' }
        }
      }
    ]);

    const campaignStats = await Donation.aggregate([
      {
        $match: { status: 'completed' }
      },
      {
        $group: {
          _id: '$campaign',
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { totalAmount: -1 } }
    ]);

    res.json({
      overall: stats[0] || { totalAmount: 0, count: 0, averageAmount: 0 },
      byCampaign: campaignStats
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const createRecurringDonation = async (req, res) => {
  try {
    const { amount, campaign, paymentMethodId, interval = 'month' } = req.body;
    const currency = 'INR';

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid donation amount' });
    }

    if (!['month', 'year'].includes(interval)) {
      return res.status(400).json({ message: 'Invalid interval' });
    }

    const user = await User.findById(req.user._id);
    let customer;

    if (user.stripeCustomerId) {
      customer = await stripe.customers.retrieve(user.stripeCustomerId);
    } else {
      customer = await stripe.customers.create({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        metadata: { userId: user._id.toString() }
      });
      user.stripeCustomerId = customer.id;
      await user.save();
    }

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{
        price_data: {
          currency,
          product_data: {
            name: `Recurring donation to ${campaign}`
          },
          unit_amount: Math.round(amount * 100),
          recurring: { interval }
        }
      }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent']
    });

    const donation = new Donation({
      donorId: req.user._id,
      amount,
      currency,
      campaign,
      paymentMethod: 'stripe',
      transactionId: subscription.id,
      status: 'pending',
      isRecurring: true
    });

    const createdDonation = await donation.save();

    res.status(201).json({
      donation: createdDonation,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret
    });

  } catch (error) {
    console.error('Recurring donation error:', error);
    res.status(500).json({ message: error.message || 'Recurring donation setup failed' });
  }
};

const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find({})
      .populate('donorId', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (error) {
    console.error('Error fetching all donations:', error);
    res.status(500).json({ message: 'Failed to retrieve all donations' });
  }
};


export { 
  createDonation, 
  getDonations, 
  handleDonationWebhook,
  getDonationById,
  getDonationsByCampaign,
  updateDonationStatus,
  getDonationStats,
  createRecurringDonation,
  getAllDonations
};


// import Donation from '../models/Donation.js';
// import User from '../models/User.js';
// import { sendEmail } from '../config/email.js';
// import razorpay, { validateSignature } from '../config/razorpay.js';
// import crypto from 'crypto';

// const createDonationOrder = async (req, res) => {
//   try {
//     const { amount, campaign, method = 'card' } = req.body;
    
//     // Validate amount (minimum ₹1)
//     if (!amount || amount < 100) { // Amount in paise (100 paise = ₹1)
//       return res.status(400).json({ 
//         message: 'Amount must be at least ₹1' 
//       });
//     }

//     // Create Razorpay order
//     const options = {
//       amount: amount * 100, // Razorpay expects amount in paise
//       currency: 'INR',
//       receipt: `donation_${Date.now()}`,
//       payment_capture: 1, // Auto-capture payment
//       notes: {
//         userId: req.user._id.toString(),
//         campaign,
//         purpose: 'Alumni Donation'
//       }
//     };

//     const order = await razorpay.orders.create(options);

//     // Create donation record
//     const donation = new Donation({
//       donorId: req.user._id,
//       amount: amount,
//       currency: 'INR',
//       razorpayOrderId: order.id,
//       status: 'created',
//       campaign,
//       method
//     });

//     await donation.save();

//     res.status(201).json({
//       order,
//       donationId: donation._id
//     });

//   } catch (error) {
//     console.error('Donation error:', error);
//     res.status(500).json({ 
//       message: error.error?.description || 'Donation processing failed' 
//     });
//   }
// };

// const verifyDonation = async (req, res) => {
//   try {
//     const { orderId, paymentId, signature, donationId } = req.body;
    
//     // Validate signature
//     const isValid = validateSignature(orderId, paymentId, signature);
//     if (!isValid) {
//       return res.status(400).json({ message: 'Invalid payment signature' });
//     }

//     // Update donation record
//     const donation = await Donation.findByIdAndUpdate(
//       donationId,
//       {
//         razorpayPaymentId: paymentId,
//         razorpaySignature: signature,
//         status: 'paid'
//       },
//       { new: true }
//     ).populate('donorId');

//     if (!donation) {
//       return res.status(404).json({ message: 'Donation not found' });
//     }

//     // Send receipt email
//     if (donation.donorId) {
//       await sendEmail(
//         donation.donorId.email,
//         'Donation Receipt',
//         `Thank you for your donation of ₹${donation.amount} to ${donation.campaign}`,
//         `<h1>Thank You for Your Donation</h1>
//         <p>Amount: ₹${donation.amount}</p>
//         <p>Campaign: ${donation.campaign}</p>
//         <p>Transaction ID: ${donation.razorpayPaymentId}</p>
//         <p>Payment Method: ${donation.method}</p>`
//       );
//     }

//     res.json({ 
//       success: true,
//       donation 
//     });

//   } catch (error) {
//     console.error('Verification error:', error);
//     res.status(500).json({ message: 'Payment verification failed' });
//   }
// };

// const getDonations = async (req, res) => {
//   try {
//     const donations = await Donation.find({ donorId: req.user._id })
//       .sort({ createdAt: -1 });

//     res.json(donations);
//   } catch (error) {
//     console.error('Get donations error:', error);
//     res.status(500).json({ message: 'Failed to retrieve donations' });
//   }
// };

// // Razorpay Webhook Handler
// const handleWebhook = async (req, res) => {
//   const body = req.body;
//   const signature = req.headers['x-razorpay-signature'];
//   const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

//   // Verify webhook signature
//   const generatedSignature = crypto
//     .createHmac('sha256', secret)
//     .update(JSON.stringify(body))
//     .digest('hex');

//   if (generatedSignature !== signature) {
//     return res.status(400).json({ success: false });
//   }

//   // Handle payment capture event
//   if (body.event === 'payment.captured') {
//     const payment = body.payload.payment.entity;
    
//     try {
//       await Donation.findOneAndUpdate(
//         { razorpayOrderId: payment.order_id },
//         {
//           razorpayPaymentId: payment.id,
//           status: 'paid',
//           method: payment.method,
//           receiptSent: true
//         }
//       );
//     } catch (error) {
//       console.error('Webhook processing error:', error);
//     }
//   }

//   res.json({ success: true });
// };

// export { 
//   createDonationOrder, 
//   verifyDonation, 
//   getDonations, 
//   handleWebhook 
// };