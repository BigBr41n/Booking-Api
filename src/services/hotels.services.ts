import { PrismaClient, Hotel } from "@prisma/client";
import logger from "../utils/logger";
import { ApiError } from "../utils/ApiError";

const prisma = new PrismaClient();



////////////////////////////////************** ONLY FOR ADMINS or INSIDE CALLING****************/////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Adds a new hotel.
 * @param {Omit<Hotel, "id" | "createdAt" | "updatedAt">} hotelData - The data for the new hotel.
 * @returns {Promise<Hotel>} The newly created hotel.
 * @throws Will throw an error if the hotel cannot be created.
 */
export const addNewHotel = async (
  hotelData: Omit<Hotel, "id" | "createdAt" | "updatedAt">
): Promise<Hotel> => {
  try {
    return await prisma.hotel.create({
      data: hotelData,
    });
  } catch (err: any) {
    logger.error("Error during add new hotel service:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to add new hotel", 500);
  }
};











/**
 * Updates hotel details.
 * @param {string} hotelId - The ID of the hotel to update.
 * @param {Partial<Hotel>} hotelData - The data to update for the hotel.
 * @returns {Promise<Hotel>} The updated hotel.
 * @throws Will throw an error if the hotel cannot be updated.
 */
export const updateHotelDetails = async (
  hotelId: string,
  hotelData: Partial<Hotel>
): Promise<Hotel> => {
  try {
    return await prisma.hotel.update({
      where: { id: hotelId },
      data: hotelData,
    });
  } catch (err: any) {
    logger.error("Error during update hotel details service:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to update hotel details", 500);
  }
};









/**
 * Removes a hotel.
 * @param {string} hotelId - The ID of the hotel to remove.
 * @returns {Promise<Hotel>} The removed hotel.
 * @throws Will throw an error if the hotel cannot be removed.
 */
export const removeHotel = async (hotelId: string): Promise<Hotel> => {
  try {
    return await prisma.hotel.delete({
      where: { id: hotelId },
    });
  } catch (err: any) {
    logger.error("Error during remove hotel service:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to remove hotel", 500);
  }
};









/**
 * Updates available rooms for a hotel.
 * @param {string} hotelId - The ID of the hotel.
 * @param {number} roomsAvailable - The new number of available rooms.
 * @returns {Promise<Hotel>} The updated hotel.
 * @throws Will throw an error if the available rooms cannot be updated.
 */
export const updateAvailableRooms = async (
  hotelId: string,
  roomsAvailable: number
): Promise<Hotel> => {
  try {
    return await prisma.hotel.update({
      where: { id: hotelId },
      data: { roomsAvailable },
    });
  } catch (err: any) {
    logger.error("Error during update available rooms service:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to update available rooms", 500);
  }
};

//////////////////////////////*************** ***************///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////











/**
 * Searches hotels based on criteria.
 * @param {object} criteria - The search criteria.
 * @param {string} criteria.city - The city of the hotel.
 * @param {string} criteria.country - The country of the hotel.
 * @param {number} criteria.minPrice - The minimum price of the hotel.
 * @param {number} criteria.maxPrice - The maximum price of the hotel.
 * @returns {Promise<Hotel[]>} The list of hotels matching the criteria.
 * @throws Will throw an error if the hotels cannot be retrieved.
 */
export const searchHotels = async (criteria: {
  city?: string;
  country?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<Hotel[]> => {
  try {
    return await prisma.hotel.findMany({
      where: {
        city: criteria.city,
        country: criteria.country,
        price: {
          gte: criteria.minPrice,
          lte: criteria.maxPrice,
        },
      },
    });
  } catch (err: any) {
    logger.error("Error during search hotels service:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to search hotels", 500);
  }
};








/**
 * Retrieves a hotel by ID.
 * @param {string} hotelId - The ID of the hotel.
 * @returns {Promise<Hotel | null>} The hotel with the specified ID.
 * @throws Will throw an error if the hotel cannot be retrieved.
 */
export const getHotelById = async (hotelId: string): Promise<Hotel | null> => {
  try {
    return await prisma.hotel.findUnique({
      where: { id: hotelId },
    });
  } catch (err: any) {
    logger.error("Error during get hotel by ID service:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to fetch hotel by ID", 500);
  }
};








/**
 * Retrieves all hotels.
 * @returns {Promise<Hotel[]>} The list of all hotels.
 * @throws Will throw an error if the hotels cannot be retrieved.
 */
export const getAllHotels = async (): Promise<Hotel[]> => {
  try {
    return await prisma.hotel.findMany();
  } catch (err: any) {
    logger.error("Error during get all hotels service:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to fetch all hotels", 500);
  }
};
