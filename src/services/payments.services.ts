import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { ApiError } from "../utils/ApiError";
import logger from "../utils/logger";
import dotenv from 'dotenv';
dotenv.config();



const stripe = new Stripe(process.env.SECRET_STRIPE!, {
  apiVersion: "2024-06-20",
});




const prisma = new PrismaClient();

export const createPaymentIntent = async (bookingId: string): Promise<{}> => {
  try {
    // Fetch booking details from your database
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { user: true },
    });

    if (!booking) {
      throw new ApiError("Booking not found", 400);
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(booking.totalPrice * 100), // amount in cents
      currency: "usd",
      metadata: { bookingId: booking.id },
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (err: any) {
    logger.error("Error creating payment intent");
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to create payment intent", 500);
  }
};








export const confirmPayment = async (paymentIntentId: string) : Promise<{ success: boolean } | { error: string }> => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      const bookingId = paymentIntent.metadata.bookingId;

      await prisma.payment.create({
        data: {
          bookingId,
          amount: paymentIntent.amount / 100, // convert back to dollars
          method: "stripe",
          status: "completed",
        },
      });

      await prisma.booking.update({
        where: { id: bookingId },
        data: { status: "CONFIRMED" },
      });

      return { success: true };
    } else {
      return { error: "Payment was not successful" };
    }

  } catch (err: any) {
    logger.error("Error creating payment intent");
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to confirm payment intent", 500);
  }
};
