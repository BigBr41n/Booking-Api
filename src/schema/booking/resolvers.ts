import { ApolloError } from 'apollo-server-express';
import {
  createBooking,
  updateBookingDetails,
  cancelBooking,
  getBookingHistory,
  updateBookingStatus,
  getBookingById,
  getAllBookings
} from '../../services/booking.services';
import logger from '../../utils/logger'
import { Booking, BookingStatus } from '@prisma/client';


const resolvers = {
  Query: {
    getBookingById: async (_: any, { bookingId }: { bookingId: string }): Promise<Booking | null> => {
      try {
        return await getBookingById(bookingId);
      } catch (error: any) {
        logger.error("Error in getBookingById:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },
    getBookingHistory: async (_: any, args : any, context: { user: { id: string; role: string } }) : Promise<Booking[]> => {
      try {
        return await getBookingHistory(context.user.id);
      } catch (error: any) {
        logger.error("Error in getBookingHistory:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },
    getAllBookings: async (_: any, args : any , context: { user: { id: string; role: string } }) : Promise<Booking[]> => {
      try {
        return await getAllBookings(context.user.id);
      } catch (error: any) {
        logger.error("Error in getAllBookings:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },
  },

  Mutation: {
    createBooking: async (_: any, { bookingData }:{bookingData: any } , context: { user: { id: string; role: string } }): Promise<Booking> => {
      try {
        return await createBooking(context.user.id , bookingData);
      } catch (error: any) {
        logger.error("Error in create booking:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },
    updateBookingDetails: async (_: any, { bookingId, bookingData }: { bookingId: string, bookingData: any }): Promise<Booking> => {
      try {
        return await updateBookingDetails(bookingId, bookingData);
      } catch (error: any) {
        logger.error("Error in update bookingDetails:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },
    cancelBooking: async (_: any, { bookingId }: { bookingId: string }) : Promise<Booking> => {
      try {
        return await cancelBooking(bookingId);
      } catch (error: any) {
        logger.error("Error in cancel Booking:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },
    updateBookingStatus: async (_: any, { bookingId, status }: { bookingId: string, status: BookingStatus }):Promise<Booking> => {
      try {
        return await updateBookingStatus(bookingId, status);
      } catch (error: any) {
        logger.error("Error in update booking status:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },
  },
};


export default resolvers ;