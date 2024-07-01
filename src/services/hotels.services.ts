import { PrismaClient, Hotel } from "@prisma/client";
import  logger  from "../utils/logger";
import { ApiError } from "../utils/ApiError";

const prisma = new PrismaClient();


/**
 * Adds a new hotel.
 * @param {Omit<Hotel, "id" | "createdAt" | "updatedAt">} hotelData - The data for the new hotel.
 * @returns {Promise<Hotel>} The newly created hotel.
 * @throws Will throw an error if the hotel cannot be created.
 */
export const addNewHotel = async (hotelData: Omit<Hotel, "id" | "createdAt" | "updatedAt">): Promise<Hotel> => {
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
export const updateHotelDetails = async (hotelId: string, hotelData: Partial<Hotel>): Promise<Hotel> => {
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


