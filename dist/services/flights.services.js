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
exports.getAllFlightsService = exports.getFlightByIdService = exports.getFlightBySeatType = exports.getFlightsByStatus = exports.getFlightsByPriceRange = exports.getFlightsByArrivalAirport = exports.getFlightsByDepartureAirport = exports.getFlightsByAirline = exports.getFlightsByDate = exports.cancelFlight = exports.updateFlight = exports.addNewFlight = void 0;
// src/services/flights.services.ts
const client_1 = require("@prisma/client");
const logger_1 = __importDefault(require("../utils/logger"));
const ApiError_1 = require("../utils/ApiError");
const prisma = new client_1.PrismaClient();
//////////////////////*************** ONLY FOR ADMIN **************////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
/**
 * Adds a new flight.
 * @param {FlightData} flightData - The data of the new flight.
 * @returns {Promise<Flight>} The newly created flight.
 * @throws Will throw an error if the flight cannot be created.
 */
const addNewFlight = (flightData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.flight.create({
            data: flightData,
        });
    }
    catch (err) {
        logger_1.default.error("Error during add new flight service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to add new flight", 500);
    }
});
exports.addNewFlight = addNewFlight;
/**
 * Updates an existing flight.
 * @param {string} flightId - The ID of the flight to update.
 * @param {Partial<FlightData>} flightData - The updated flight data.
 * @returns {Promise<Flight>} The updated flight.
 * @throws Will throw an error if the flight cannot be updated.
 */
const updateFlight = (flightId, flightData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.flight.update({
            where: { id: flightId },
            data: flightData,
        });
    }
    catch (err) {
        logger_1.default.error("Error during update flight service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to update flight", 500);
    }
});
exports.updateFlight = updateFlight;
/**
 * Cancels a flight.
 * @param {string} flightId - The ID of the flight to cancel.
 * @returns {Promise<Flight>} The canceled flight.
 * @throws Will throw an error if the flight cannot be canceled.
 */
const cancelFlight = (flightId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.flight.update({
            where: { id: flightId },
            data: { status: 'Canceled' },
        });
    }
    catch (err) {
        logger_1.default.error("Error during cancel flight service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to cancel flight", 500);
    }
});
exports.cancelFlight = cancelFlight;
//////////////////////////////************ **************////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/**
 * Gets flights by a specific date.
 * @param {Date} date - The date to filter flights by.
 * @returns {Promise<Flight[]>} The list of flights on the specified date.
 * @throws Will throw an error if the flights cannot be retrieved.
 */
const getFlightsByDate = (date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.flight.findMany({
            where: { departureDate: date },
        });
    }
    catch (err) {
        logger_1.default.error("Error during get flights by date service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to fetch flights by date", 500);
    }
});
exports.getFlightsByDate = getFlightsByDate;
/**
 * Gets flights by airline.
 * @param {string} airline - The airline to filter flights by.
 * @returns {Promise<Flight[]>} The list of flights for the specified airline.
 * @throws Will throw an error if the flights cannot be retrieved.
 */
const getFlightsByAirline = (airline) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.flight.findMany({
            where: { airline },
        });
    }
    catch (err) {
        logger_1.default.error("Error during get flights by airline service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to fetch flights by airline", 500);
    }
});
exports.getFlightsByAirline = getFlightsByAirline;
/**
 * Gets flights by departure airport.
 * @param {string} departureCity - The city of the departure airport to filter flights by.
 * @returns {Promise<Flight[]>} The list of flights departing from the specified city.
 * @throws Will throw an error if the flights cannot be retrieved.
 */
const getFlightsByDepartureAirport = (departureCity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.flight.findMany({
            where: { departureCity },
        });
    }
    catch (err) {
        logger_1.default.error("Error during get flights by departure airport service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to fetch flights by departure airport", 500);
    }
});
exports.getFlightsByDepartureAirport = getFlightsByDepartureAirport;
/**
 * Gets flights by arrival airport.
 * @param {string} arrivalCity - The city of the arrival airport to filter flights by.
 * @returns {Promise<Flight[]>} The list of flights arriving at the specified city.
 * @throws Will throw an error if the flights cannot be retrieved.
 */
const getFlightsByArrivalAirport = (arrivalCity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.flight.findMany({
            where: { arrivalCity },
        });
    }
    catch (err) {
        logger_1.default.error("Error during get flights by arrival airport service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to fetch flights by arrival airport", 500);
    }
});
exports.getFlightsByArrivalAirport = getFlightsByArrivalAirport;
/**
 * Gets flights by price range.
 * @param {number} minPrice - The minimum price.
 * @param {number} maxPrice - The maximum price.
 * @returns {Promise<Flight[]>} The list of flights within the specified price range.
 * @throws Will throw an error if the flights cannot be retrieved.
 */
const getFlightsByPriceRange = (minPrice, maxPrice) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.flight.findMany({
            where: {
                price: {
                    gte: minPrice,
                    lte: maxPrice,
                },
            },
        });
    }
    catch (err) {
        logger_1.default.error("Error during get flights by price range service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to fetch flights by price range", 500);
    }
});
exports.getFlightsByPriceRange = getFlightsByPriceRange;
/**
 * Gets flights by status.
 * @param {string} status - The status of the flight (e.g., "Scheduled", "Canceled").
 * @returns {Promise<Flight[]>} The list of flights with the specified status.
 * @throws Will throw an error if the flights cannot be retrieved.
 */
const getFlightsByStatus = (status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.flight.findMany({
            where: { status },
        });
    }
    catch (err) {
        logger_1.default.error("Error during get flights by status service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to fetch flights by status", 500);
    }
});
exports.getFlightsByStatus = getFlightsByStatus;
/**
 * Gets a flight by seat type.
 * @param {string} seatType - The type of seat to filter flights by.
 * @returns {Promise<Flight[]>} The list of flights with the specified seat type.
 * @throws Will throw an error if the flights cannot be retrieved.
 */
const getFlightBySeatType = (seatType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.flight.findMany({
            where: {
                bookings: {
                    some: {
                        seatType,
                    },
                },
            },
        });
    }
    catch (err) {
        logger_1.default.error("Error during get flights by seat type service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to fetch flights by seat type", 500);
    }
});
exports.getFlightBySeatType = getFlightBySeatType;
/**
 * Gets a flight by ID.
 * @param {string} flightId - The ID of the flight to retrieve.
 * @returns {Promise<Flight | null>} The flight with the specified ID.
 * @throws Will throw an error if the flight cannot be retrieved.
 */
const getFlightByIdService = (flightId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flight = yield prisma.flight.findUnique({
            where: { id: flightId },
        });
        if (!flight)
            throw new ApiError_1.ApiError("no flight found", 404);
        return flight;
    }
    catch (err) {
        logger_1.default.error("Error during get flight by ID service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to fetch flight by ID", 500);
    }
});
exports.getFlightByIdService = getFlightByIdService;
/**
 * Gets all flights.
 * @returns {Promise<Flight[]>} The list of all flights.
 * @throws Will throw an error if the flights cannot be retrieved.
 */
const getAllFlightsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.flight.findMany();
    }
    catch (err) {
        logger_1.default.error("Error during get all flights service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to fetch all flights", 500);
    }
});
exports.getAllFlightsService = getAllFlightsService;
