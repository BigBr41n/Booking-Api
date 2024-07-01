import { PrismaClient, Booking, BookingStatus } from "@prisma/client";
import logger from "../utils/logger";
import { ApiError } from "../utils/ApiError";

const prisma = new PrismaClient();





/**
 * Creates a new booking for a flight, hotel, or both.
 * @param {Omit<Booking, "id" | "createdAt" | "updatedAt" | "status">} bookingData - The data for the new booking.
 * @returns {Promise<Booking>} The newly created booking.
 * @throws Will throw an error if the booking cannot be created.
 */
export const createBooking = async (
  userId : string ,
  bookingData: Omit<Booking, "id" | "createdAt" | "updatedAt" | "status">
): Promise<Booking> => {
  try {

    //const totalPrice = await calculateTotalPrice(bookingData);

    const newBooking = await prisma.booking.create({
      data: {
        ...bookingData,
      //  totalPrice,
        userId : userId,
        status: BookingStatus.PENDING,
      },
    });

    return newBooking;
  } catch (err: any) {
    logger.error("Error during create booking service:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to create booking", 500);
  }
};











/**
 * Updates booking details.
 * @param {string} bookingId - The ID of the booking to update.
 * @param {Partial<Booking>} bookingData - The data to update for the booking.
 * @returns {Promise<Booking>} The updated booking.
 * @throws Will throw an error if the booking cannot be updated.
 */
export const updateBookingDetails = async (
  bookingId: string,
  bookingData: Partial<Booking>
): Promise<Booking> => {
  try {
    return await prisma.booking.update({
      where: { id: bookingId },
      data: bookingData,
    });


  } catch (err: any) {
    logger.error("Error during update booking details service:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to update booking details", 500);
  }
};


