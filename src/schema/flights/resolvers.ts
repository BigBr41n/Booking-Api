import { ApolloError } from 'apollo-server-express';
import {
  addNewFlight,
  updateFlight,
  cancelFlight,
  getFlightsByDate,
  getFlightsByAirline,
  getFlightsByDepartureAirport,
  getFlightsByArrivalAirport,
  getFlightsByPriceRange,
  getFlightsByStatus,
  getFlightBySeatType,
  getFlightByIdService,
  getAllFlightsService,
  FlightData
} from '../../services/flights.services';
import { Flight } from '@prisma/client';
import logger from '../../utils/logger';



export const resolvers = {

  Query: {
    getFlightsByDate: async (_: any, { date }: { date: Date }): Promise<Flight[]> => {
      try {
        return await getFlightsByDate(date);
      } catch (error: any) {
        logger.error("Error in getFlightByDate:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },

    getFlightsByAirline: async (_: any, { airline }: { airline: string }): Promise<Flight[]> => {
      try {
        return await getFlightsByAirline(airline);
      } catch (error: any) {
        logger.error("Error in getFlightsByAirline:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },

    getFlightsByDepartureAirport: async (_: any, { departureCity }: { departureCity: string }): Promise<Flight[]> => {
      try {
        return await getFlightsByDepartureAirport(departureCity);
      } catch (error: any) {
        logger.error("Error in getFlightsByDepar:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },

    getFlightsByArrivalAirport: async (_: any, { arrivalCity }: { arrivalCity: string }): Promise<Flight[]> => {
      try {
        return await getFlightsByArrivalAirport(arrivalCity);
      } catch (error: any) {
        logger.error("Error in getFlightsByAirport:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },

    getFlightsByPriceRange: async (_: any, { minPrice, maxPrice }: { minPrice: number, maxPrice: number }): Promise<Flight[]> => {
      try {
        return await getFlightsByPriceRange(minPrice, maxPrice);
      } catch (error: any) {
        logger.error("Error in by price:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },

    getFlightsByStatus: async (_: any, { status }: { status: string }): Promise<Flight[]> => {
      try {
        return await getFlightsByStatus(status);
      } catch (error: any) {
        logger.error("Error in getFlightsBySTATUS:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },

    getFlightBySeatType: async (_: any, { seatType }: { seatType: string }): Promise<Flight[]> => {
      try {
        return await getFlightBySeatType(seatType);
      } catch (error: any) {
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },

    getFlightById: async (_: any, { flightId }: { flightId: string }): Promise<Flight> => {
        try {
          const flight = await getFlightByIdService(flightId);
          if (!flight) {
            throw new ApolloError('Flight not found', 'NOT_FOUND');
          }
          return flight;
        } catch (error: any) {
            logger.error("Error in getFlightsById:", error);
            throw new ApolloError(
              error.message,
              error.statusCode || "INTERNAL_SERVER_ERROR"
            );
        }
    },

    getAllFlights: async (): Promise<Flight[]> => {
      try {
        return await getAllFlightsService();
      } catch (error: any) {
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },
  },

  Mutation: {
    addNewFlight: async (_: any, { flightData }: { flightData: FlightData }): Promise<Flight> => {
      try {
        return await addNewFlight(flightData);
      } catch (error: any) {
        logger.error("Error in addNewFlight:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },
    updateFlight: async (_: any, { flightId, flightData }: { flightId: string, flightData: FlightData }): Promise<Flight> => {
      try {
        return await updateFlight(flightId, flightData);
      } catch (error: any) {
        logger.error("Error in updateFLight:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },
    cancelFlight: async (_: any, { flightId }: { flightId: string }): Promise<Flight> => {
      try {
        return await cancelFlight(flightId);
      } catch (error: any) {
        logger.error("Error in cancelFlight:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },
  },
};