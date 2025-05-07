import stripePackage from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

export const createStripeCustomer = async (email, name) => {
  return stripe.customers.create({
    email,
    name
  });
};

export const createPaymentMethod = async (paymentMethodId) => {
  return stripe.paymentMethods.retrieve(paymentMethodId);
};

export default stripe;