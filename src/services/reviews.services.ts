import { PrismaClient, Review } from "@prisma/client";
import  logger  from "../utils/logger";
import { ApiError } from "../utils/ApiError";

const prisma = new PrismaClient();


///////////////////////************** ONLY ADMIN , MANAGERS AND OWNER ***************/////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////



export const deleteReviewService = async(reviewId : string) : Promise<void>=>{
    try {
      await prisma.review.delete({where : {id : reviewId }});
    } catch (err: any) {
      logger.error("Error during delete all reviews service:", err);
      if (err instanceof ApiError) {
        throw err;
      }
      throw new ApiError("Failed to delete all reviews", 500);
    }
}






//////////////////////***************** ***************************/////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////






/**
 * Submits a new review for a flight or hotel.
 * @param {Omit<Review, "id" | "createdAt" | "updatedAt">} reviewData - The data for the new review.
 * @returns {Promise<Review>} The newly submitted review.
 * @throws Will throw an error if the review cannot be submitted.
 */
export const submitReview = async (reviewData: Omit<Review, "id" | "createdAt" | "updatedAt">): Promise<Review> => {
  try {
    const newReview = await prisma.review.create({
      data: reviewData,
    });

    return newReview;
  } catch (err: any) {
    logger.error("Error during submit review service:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to submit review", 500);
  }
};











/**
 * Retrieves all reviews for a specific flight or hotel.
 * @param {string} entityId - The ID of the flight or hotel.
 * @param {string} entityType - The type of entity ("flight" or "hotel").
 * @returns {Promise<Review[]>} The list of reviews for the entity.
 * @throws Will throw an error if the reviews cannot be retrieved.
 */
export const getReviewsByEntity = async (entityId: string, entityType: "flight" | "hotel"): Promise<Review[]> => {
  try {
    return await prisma.review.findMany({
      where: {
        [`${entityType}Id`]: entityId,
      },
      include: {
        user: true,
        flight: true,
        hotel: true,
      },
    });
  } catch (err: any) {
    logger.error("Error during get reviews by entity service:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to fetch reviews by entity", 500);
  }
};








/**
 * Retrieves all reviews submitted by a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Review[]>} The list of reviews submitted by the user.
 * @throws Will throw an error if the reviews cannot be retrieved.
 */
export const getReviewsByUser = async (userId: string): Promise<Review[]> => {
  try {
    return await prisma.review.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        flight: true,
        hotel: true,
      },
    });
  } catch (err: any) {
    logger.error("Error during get reviews by user service:", err);
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError("Failed to fetch reviews by user", 500);
  }
};
