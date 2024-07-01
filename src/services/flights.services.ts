// src/services/flights.services.ts
import { PrismaClient, Flight } from '@prisma/client';
import logger from '../utils/logger';
import { ApiError } from '../utils/ApiError';

const prisma = new PrismaClient();

interface FlightData {
  airline: string;
  flightNumber: string;
  departureDate: Date;
  arrivalDate: Date;
  departureCity: string;
  arrivalCity: string;
  price: number;
  seatsAvailable: number;
  status: string;
}



//////////////////////*************** ONLY FOR ADMIN **************////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

/**
 * Adds a new flight.
 * @param {FlightData} flightData - The data of the new flight.
 * @returns {Promise<Flight>} The newly created flight.
 * @throws Will throw an error if the flight cannot be created.
 */
export const addNewFlight = async (flightData: FlightData): Promise<Flight> => {
  try {
    return await prisma.flight.create({
      data: flightData,
    });
  } catch (err: any) {
    logger.error("Error during add new flight service:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to add new flight", 500);
  }
};







/**
 * Updates an existing flight.
 * @param {string} flightId - The ID of the flight to update.
 * @param {Partial<FlightData>} flightData - The updated flight data.
 * @returns {Promise<Flight>} The updated flight.
 * @throws Will throw an error if the flight cannot be updated.
 */
export const updateFlight = async (flightId: string, flightData: Partial<FlightData>): Promise<Flight> => {
  try {
    return await prisma.flight.update({
      where: { id: flightId },
      data: flightData,
    });
  } catch (err: any) {
    logger.error("Error during update flight service:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to update flight", 500);
  }
};






/**
 * Cancels a flight.
 * @param {string} flightId - The ID of the flight to cancel.
 * @returns {Promise<Flight>} The canceled flight.
 * @throws Will throw an error if the flight cannot be canceled.
 */
export const cancelFlight = async (flightId: string): Promise<Flight> => {
  try {
    return await prisma.flight.update({
      where: { id: flightId },
      data: { status: 'Canceled' },
    });
  } catch (err: any) {
    logger.error("Error during cancel flight service:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to cancel flight", 500);
  }
};


//////////////////////////////************ **************////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////







/**
 * Gets flights by a specific date.
 * @param {Date} date - The date to filter flights by.
 * @returns {Promise<Flight[]>} The list of flights on the specified date.
 * @throws Will throw an error if the flights cannot be retrieved.
 */
export const getFlightsByDate = async (date: Date): Promise<Flight[]> => {
  try {
    return await prisma.flight.findMany({
      where: { departureDate: date },
    });
  } catch (err: any) {
    logger.error("Error during get flights by date service:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to fetch flights by date", 500);
  }
};








/**
 * Gets flights by airline.
 * @param {string} airline - The airline to filter flights by.
 * @returns {Promise<Flight[]>} The list of flights for the specified airline.
 * @throws Will throw an error if the flights cannot be retrieved.
 */
export const getFlightsByAirline = async (airline: string): Promise<Flight[]> => {
  try {
    return await prisma.flight.findMany({
      where: { airline },
    });
  } catch (err: any) {
    logger.error("Error during get flights by airline service:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to fetch flights by airline", 500);
  }
};










/**
 * Gets flights by departure airport.
 * @param {string} departureCity - The city of the departure airport to filter flights by.
 * @returns {Promise<Flight[]>} The list of flights departing from the specified city.
 * @throws Will throw an error if the flights cannot be retrieved.
 */
export const getFlightsByDepartureAirport = async (departureCity: string): Promise<Flight[]> => {
  try {
    return await prisma.flight.findMany({
      where: { departureCity },
    });
  } catch (err: any) {
    logger.error("Error during get flights by departure airport service:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to fetch flights by departure airport", 500);
  }
};










/**
 * Gets flights by arrival airport.
 * @param {string} arrivalCity - The city of the arrival airport to filter flights by.
 * @returns {Promise<Flight[]>} The list of flights arriving at the specified city.
 * @throws Will throw an error if the flights cannot be retrieved.
 */
export const getFlightsByArrivalAirport = async (arrivalCity: string): Promise<Flight[]> => {
  try {
    return await prisma.flight.findMany({
      where: { arrivalCity },
    });
  } catch (err: any) {
    logger.error("Error during get flights by arrival airport service:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to fetch flights by arrival airport", 500);
  }
};










/**
 * Gets flights by price range.
 * @param {number} minPrice - The minimum price.
 * @param {number} maxPrice - The maximum price.
 * @returns {Promise<Flight[]>} The list of flights within the specified price range.
 * @throws Will throw an error if the flights cannot be retrieved.
 */
export const getFlightsByPriceRange = async (minPrice: number, maxPrice: number): Promise<Flight[]> => {
  try {
    return await prisma.flight.findMany({
      where: {
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
      },
    });
  } catch (err: any) {
    logger.error("Error during get flights by price range service:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to fetch flights by price range", 500);
  }
};










/**
 * Gets flights by status.
 * @param {string} status - The status of the flight (e.g., "Scheduled", "Canceled").
 * @returns {Promise<Flight[]>} The list of flights with the specified status.
 * @throws Will throw an error if the flights cannot be retrieved.
 */
export const getFlightsByStatus = async (status: string): Promise<Flight[]> => {
  try {
    return await prisma.flight.findMany({
      where: { status },
    });
  } catch (err: any) {
    logger.error("Error during get flights by status service:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to fetch flights by status", 500);
  }
};








/**
 * Gets a flight by seat type.
 * @param {string} seatType - The type of seat to filter flights by.
 * @returns {Promise<Flight[]>} The list of flights with the specified seat type.
 * @throws Will throw an error if the flights cannot be retrieved.
 */
export const getFlightBySeatType = async (seatType: string): Promise<Flight[]> => {
  try {
    return await prisma.flight.findMany({
      where: {
        bookings: {
          some: {
            seatType,
          },
        },
      },
    });
  } catch (err: any) {
    logger.error("Error during get flights by seat type service:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to fetch flights by seat type", 500);
  }
};










/**
 * Gets a flight by ID.
 * @param {string} flightId - The ID of the flight to retrieve.
 * @returns {Promise<Flight | null>} The flight with the specified ID.
 * @throws Will throw an error if the flight cannot be retrieved.
 */
export const getFlightByIdService = async (flightId: string): Promise<Flight | null> => {
  try {
    const flight = await prisma.flight.findUnique({
      where: { id: flightId },
    });
    if(! flight) throw new ApiError("no flight found",404);

    return flight;
  } catch (err: any) {
    logger.error("Error during get flight by ID service:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to fetch flight by ID", 500);
  }
};











/**
 * Gets all flights.
 * @returns {Promise<Flight[]>} The list of all flights.
 * @throws Will throw an error if the flights cannot be retrieved.
 */
export const getAllFlightsService = async (): Promise<Flight[]> => {
  try {

    return await prisma.flight.findMany();

  } catch (err: any) {
    logger.error("Error during get all flights service:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to fetch all flights", 500);
  }
};
