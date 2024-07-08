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
exports.getAllHotels = exports.getHotelById = exports.searchHotels = exports.updateAvailableRooms = exports.removeHotel = exports.updateHotelDetails = exports.addNewHotel = void 0;
const client_1 = require("@prisma/client");
const logger_1 = __importDefault(require("../utils/logger"));
const ApiError_1 = require("../utils/ApiError");
const prisma = new client_1.PrismaClient();
////////////////////////////////************** ONLY FOR ADMINS or INSIDE CALLING****************/////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Adds a new hotel.
 * @param {Omit<Hotel, "id" | "createdAt" | "updatedAt">} hotelData - The data for the new hotel.
 * @returns {Promise<Hotel>} The newly created hotel.
 * @throws Will throw an error if the hotel cannot be created.
 */
const addNewHotel = (hotelData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.hotel.create({
            data: hotelData,
        });
    }
    catch (err) {
        logger_1.default.error("Error during add new hotel service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to add new hotel", 500);
    }
});
exports.addNewHotel = addNewHotel;
/**
 * Updates hotel details.
 * @param {string} hotelId - The ID of the hotel to update.
 * @param {Partial<Hotel>} hotelData - The data to update for the hotel.
 * @returns {Promise<Hotel>} The updated hotel.
 * @throws Will throw an error if the hotel cannot be updated.
 */
const updateHotelDetails = (hotelId, hotelData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.hotel.update({
            where: { id: hotelId },
            data: hotelData,
        });
    }
    catch (err) {
        logger_1.default.error("Error during update hotel details service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to update hotel details", 500);
    }
});
exports.updateHotelDetails = updateHotelDetails;
/**
 * Removes a hotel.
 * @param {string} hotelId - The ID of the hotel to remove.
 * @returns {Promise<Hotel>} The removed hotel.
 * @throws Will throw an error if the hotel cannot be removed.
 */
const removeHotel = (hotelId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.hotel.delete({
            where: { id: hotelId },
        });
    }
    catch (err) {
        logger_1.default.error("Error during remove hotel service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to remove hotel", 500);
    }
});
exports.removeHotel = removeHotel;
/**
 * Updates available rooms for a hotel.
 * @param {string} hotelId - The ID of the hotel.
 * @param {number} roomsAvailable - The new number of available rooms.
 * @returns {Promise<Hotel>} The updated hotel.
 * @throws Will throw an error if the available rooms cannot be updated.
 */
const updateAvailableRooms = (hotelId, roomsAvailable) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.hotel.update({
            where: { id: hotelId },
            data: { roomsAvailable },
        });
    }
    catch (err) {
        logger_1.default.error("Error during update available rooms service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to update available rooms", 500);
    }
});
exports.updateAvailableRooms = updateAvailableRooms;
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
const searchHotels = (criteria) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.hotel.findMany({
            where: {
                city: criteria.city,
                country: criteria.country,
                price: {
                    gte: criteria.minPrice,
                    lte: criteria.maxPrice,
                },
            },
        });
    }
    catch (err) {
        logger_1.default.error("Error during search hotels service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to search hotels", 500);
    }
});
exports.searchHotels = searchHotels;
/**
 * Retrieves a hotel by ID.
 * @param {string} hotelId - The ID of the hotel.
 * @returns {Promise<Hotel | null>} The hotel with the specified ID.
 * @throws Will throw an error if the hotel cannot be retrieved.
 */
const getHotelById = (hotelId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.hotel.findUnique({
            where: { id: hotelId },
        });
    }
    catch (err) {
        logger_1.default.error("Error during get hotel by ID service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to fetch hotel by ID", 500);
    }
});
exports.getHotelById = getHotelById;
/**
 * Retrieves all hotels.
 * @returns {Promise<Hotel[]>} The list of all hotels.
 * @throws Will throw an error if the hotels cannot be retrieved.
 */
const getAllHotels = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.hotel.findMany();
    }
    catch (err) {
        logger_1.default.error("Error during get all hotels service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to fetch all hotels", 500);
    }
});
exports.getAllHotels = getAllHotels;
