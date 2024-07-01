"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewsByUser = exports.getReviewsByEntity = exports.submitReview = exports.deleteReviewService = void 0;
const client_1 = require("@prisma/client");
const logger_1 = __importDefault(require("../utils/logger"));
const ApiError_1 = require("../utils/ApiError");
const prisma = new client_1.PrismaClient();
///////////////////////************** ONLY ADMIN AND MANAGERS ***************/////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
const deleteReviewService = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.review.delete({ where: { id: reviewId } });
    }
    catch (err) {
        logger_1.default.error("Error during delete all reviews service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to delete all reviews", 500);
    }
});
exports.deleteReviewService = deleteReviewService;
//////////////////////***************** ***************************/////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Submits a new review for a flight or hotel.
 * @param {Omit<Review, "id" | "createdAt" | "updatedAt">} reviewData - The data for the new review.
 * @returns {Promise<Review>} The newly submitted review.
 * @throws Will throw an error if the review cannot be submitted.
 */
const submitReview = (reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newReview = yield prisma.review.create({
            data: reviewData,
        });
        return newReview;
    }
    catch (err) {
        logger_1.default.error("Error during submit review service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to submit review", 500);
    }
});
exports.submitReview = submitReview;
/**
 * Retrieves all reviews for a specific flight or hotel.
 * @param {string} entityId - The ID of the flight or hotel.
 * @param {string} entityType - The type of entity ("flight" or "hotel").
 * @returns {Promise<Review[]>} The list of reviews for the entity.
 * @throws Will throw an error if the reviews cannot be retrieved.
 */
const getReviewsByEntity = (entityId, entityType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.review.findMany({
            where: {
                [`${entityType}Id`]: entityId,
            },
            include: {
                user: true,
                flight: true,
                hotel: true,
            },
        });
    }
    catch (err) {
        logger_1.default.error("Error during get reviews by entity service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to fetch reviews by entity", 500);
    }
});
exports.getReviewsByEntity = getReviewsByEntity;
/**
 * Retrieves all reviews submitted by a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Review[]>} The list of reviews submitted by the user.
 * @throws Will throw an error if the reviews cannot be retrieved.
 */
const getReviewsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.review.findMany({
            where: {
                userId,
            },
            include: {
                user: true,
                flight: true,
                hotel: true,
            },
        });
    }
    catch (err) {
        logger_1.default.error("Error during get reviews by user service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to fetch reviews by user", 500);
    }
});
exports.getReviewsByUser = getReviewsByUser;
