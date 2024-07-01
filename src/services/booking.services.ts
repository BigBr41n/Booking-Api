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

    const totalPrice = await calculateTotalPrice(bookingData);

    const newBooking = await prisma.booking.create({
      data: {
        ...bookingData,
        totalPrice,
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













/**
 * Cancels a booking.
 * @param {string} bookingId - The ID of the booking to cancel.
 * @returns {Promise<Booking>} The canceled booking.
 * @throws Will throw an error if the booking cannot be canceled.
 */
export const cancelBooking = async (bookingId: string): Promise<Booking> => {
    try {
      return await prisma.booking.update({
        where: { id: bookingId },
        data: { status: BookingStatus.CANCELLED },
      });
    } catch (err: any) {
      logger.error("Error during cancel booking service:", err);
      if (err instanceof ApiError) {
        throw err;
      }
      throw new ApiError("Failed to cancel booking", 500);
    }
  };
  
  
  
  
  
  
  
  
  
  
  
  
  /**
   * Retrieves booking history for a user.
   * @param {string} userId - The ID of the user.
   * @returns {Promise<Booking[]>} The list of bookings for the user.
   * @throws Will throw an error if the booking history cannot be retrieved.
   */
  export const getBookingHistory = async (userId: string): Promise<Booking[]> => {
    try {
      return await prisma.booking.findMany({
        where: { userId },
      });
    } catch (err: any) {
      logger.error("Error during get booking history service:", err);
      if (err instanceof ApiError) {
        throw err;
      }
      throw new ApiError("Failed to fetch booking history", 500);
    }
  };
  
  
  
  
  
  
  
  
  
  
  
  /**
   * Automatically updates booking status .
   * @param {string} bookingId - The ID of the booking.
   * @param {BookingStatus} status - The new status of the booking.
   * @returns {Promise<Booking>} The updated booking.
   * @throws Will throw an error if the booking status cannot be updated.
   */
  export const updateBookingStatus = async (
    bookingId: string,
    status: BookingStatus
  ): Promise<Booking> => {
    try {
      return await prisma.booking.update({
        where: { id: bookingId },
        data: { status },
      });
    } catch (err: any) {
      logger.error("Error during update booking status service:", err);
      if (err instanceof ApiError) {
        throw err;
      }
      throw new ApiError("Failed to update booking status", 500);
    }
  };
  
  
  
  
  
  
  
  
  
  /**
   * Calculates the total price for a booking.
   * @param {Omit<Booking, "id" | "createdAt" | "updatedAt" | "status">} bookingData - The data for the booking.
   * @returns {Promise<number>} The total price.
   * @throws Will throw an error if the total price cannot be calculated.
   */
  const calculateTotalPrice = async (
    bookingData: Omit<Booking, "id" | "createdAt" | "updatedAt" | "status">
  ): Promise<number> => {
  
  
    let totalPrice = 0;
    if (bookingData.flightId) {
      const flight = await prisma.flight.findUnique({
        where: { id: bookingData.flightId },
      });
      if (flight) totalPrice += flight.price;
    }
    if (bookingData.hotelId) {
      const hotel = await prisma.hotel.findUnique({
        where: { id: bookingData.hotelId },
      });
      if (hotel) totalPrice += hotel.price;
    }
    return totalPrice;
  };
  
  
  
  
  
  
  
  /**
   * Retrieves a booking by ID.
   * @param {string} bookingId - The ID of the booking.
   * @returns {Promise<Booking | null>} The booking with the specified ID.
   * @throws Will throw an error if the booking cannot be retrieved.
   */
  export const getBookingById = async (
    bookingId: string
  ): Promise<Booking | null> => {
    try {
      return await prisma.booking.findUnique({
        where: { id: bookingId },
      });
    } catch (err: any) {
      logger.error("Error during get booking by ID service:", err);
      if (err instanceof ApiError) {
        throw err;
      }
      throw new ApiError("Failed to fetch booking by ID", 500);
    }
  };
  
  
  
  
  
  
  
  
  
  /**
   * Retrieves all bookings for a user by userID.
   * @param {string} userId - The ID of the user
   * @returns {Promise<Booking[]>} The list of all bookings.
   * @throws Will throw an error if the bookings cannot be retrieved.
   */
  export const getAllBookings = async (userId: string): Promise<Booking[]> => {
    try {
      const allBookings = await prisma.booking.findMany({
        where: { userId },
      });
      return allBookings;
    } catch (err: any) {
      logger.error("Error during get all bookings service:", err);
      if (err instanceof ApiError) {
        throw err;
      }
      throw new ApiError("Failed to fetch all bookings", 500);
    }
  };
  