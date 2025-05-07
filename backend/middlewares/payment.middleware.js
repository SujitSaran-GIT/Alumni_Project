import Payment from '../models/Payment.js';

export const verifyDonor = async (req, res, next) => {
    try {
        const payment = await Payment.findOne({
            donorId: req.user._id,
            _id: req.params.paymentId
        });

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        req.payment = payment;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const validatePaymentData = (req, res, next) => {
    const { amount, campaign } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: 'Invalid amount' });
    }

    if (!campaign) {
        return res.status(400).json({ message: 'Campaign is required' });
    }

    next();
};