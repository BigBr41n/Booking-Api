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
exports.getAllBookings = exports.getBookingById = exports.updateBookingStatus = exports.getBookingHistory = exports.cancelBooking = exports.updateBookingDetails = exports.createBooking = void 0;
const client_1 = require("@prisma/client");
const logger_1 = __importDefault(require("../utils/logger"));
const ApiError_1 = require("../utils/ApiError");
const prisma = new client_1.PrismaClient();
/**
 * Creates a new booking for a flight, hotel, or both.
 * @param {Omit<Booking, "id" | "createdAt" | "updatedAt" | "status">} bookingData - The data for the new booking.
 * @returns {Promise<Booking>} The newly created booking.
 * @throws Will throw an error if the booking cannot be created.
 */
const createBooking = (userId, bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalPrice = yield calculateTotalPrice(bookingData);
        const newBooking = yield prisma.booking.create({
            data: Object.assign(Object.assign({}, bookingData), { totalPrice, userId: userId, status: client_1.BookingStatus.PENDING }),
        });
        return newBooking;
    }
    catch (err) {
        logger_1.default.error("Error during create booking service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to create booking", 500);
    }
});
exports.createBooking = createBooking;
/**
 * Updates booking details.
 * @param {string} bookingId - The ID of the booking to update.
 * @param {Partial<Booking>} bookingData - The data to update for the booking.
 * @returns {Promise<Booking>} The updated booking.
 * @throws Will throw an error if the booking cannot be updated.
 */
const updateBookingDetails = (bookingId, bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.booking.update({
            where: { id: bookingId },
            data: bookingData,
        });
    }
    catch (err) {
        logger_1.default.error("Error during update booking details service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to update booking details", 500);
    }
});
exports.updateBookingDetails = updateBookingDetails;
/**
 * Cancels a booking.
 * @param {string} bookingId - The ID of the booking to cancel.
 * @returns {Promise<Booking>} The canceled booking.
 * @throws Will throw an error if the booking cannot be canceled.
 */
const cancelBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.booking.update({
            where: { id: bookingId },
            data: { status: client_1.BookingStatus.CANCELLED },
        });
    }
    catch (err) {
        logger_1.default.error("Error during cancel booking service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to cancel booking", 500);
    }
});
exports.cancelBooking = cancelBooking;
/**
 * Retrieves booking history for a user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Booking[]>} The list of bookings for the user.
 * @throws Will throw an error if the booking history cannot be retrieved.
 */
const getBookingHistory = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.booking.findMany({
            where: { userId },
        });
    }
    catch (err) {
        logger_1.default.error("Error during get booking history service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to fetch booking history", 500);
    }
});
exports.getBookingHistory = getBookingHistory;
/**
 * Automatically updates booking status .
 * @param {string} bookingId - The ID of the booking.
 * @param {BookingStatus} status - The new status of the booking.
 * @returns {Promise<Booking>} The updated booking.
 * @throws Will throw an error if the booking status cannot be updated.
 */
const updateBookingStatus = (bookingId, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.booking.update({
            where: { id: bookingId },
            data: { status },
        });
    }
    catch (err) {
        logger_1.default.error("Error during update booking status service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to update booking status", 500);
    }
});
exports.updateBookingStatus = updateBookingStatus;
/**
 * Calculates the total price for a booking.
 * @param {Omit<Booking, "id" | "createdAt" | "updatedAt" | "status">} bookingData - The data for the booking.
 * @returns {Promise<number>} The total price.
 * @throws Will throw an error if the total price cannot be calculated.
 */
const calculateTotalPrice = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    let totalPrice = 0;
    if (bookingData.flightId) {
        const flight = yield prisma.flight.findUnique({
            where: { id: bookingData.flightId },
        });
        if (flight)
            totalPrice += flight.price;
    }
    if (bookingData.hotelId) {
        const hotel = yield prisma.hotel.findUnique({
            where: { id: bookingData.hotelId },
        });
        if (hotel)
            totalPrice += hotel.price;
    }
    return totalPrice;
});
/**
 * Retrieves a booking by ID.
 * @param {string} bookingId - The ID of the booking.
 * @returns {Promise<Booking | null>} The booking with the specified ID.
 * @throws Will throw an error if the booking cannot be retrieved.
 */
const getBookingById = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.booking.findUnique({
            where: { id: bookingId },
        });
    }
    catch (err) {
        logger_1.default.error("Error during get booking by ID service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to fetch booking by ID", 500);
    }
});
exports.getBookingById = getBookingById;
/**
 * Retrieves all bookings for a user by userID.
 * @param {string} userId - The ID of the user
 * @returns {Promise<Booking[]>} The list of all bookings.
 * @throws Will throw an error if the bookings cannot be retrieved.
 */
const getAllBookings = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBookings = yield prisma.booking.findMany({
            where: { userId },
        });
        return allBookings;
    }
    catch (err) {
        logger_1.default.error("Error during get all bookings service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to fetch all bookings", 500);
    }
});
exports.getAllBookings = getAllBookings;
