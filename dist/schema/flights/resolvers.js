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
const apollo_server_express_1 = require("apollo-server-express");
const flights_services_1 = require("../../services/flights.services");
const logger_1 = __importDefault(require("../../utils/logger"));
const resolvers = {
    Query: {
        getFlightsByDate: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { date }) {
            try {
                return yield (0, flights_services_1.getFlightsByDate)(date);
            }
            catch (error) {
                logger_1.default.error("Error in getFlightByDate:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        getFlightsByAirline: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { airline }) {
            try {
                return yield (0, flights_services_1.getFlightsByAirline)(airline);
            }
            catch (error) {
                logger_1.default.error("Error in getFlightsByAirline:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        getFlightsByDepartureAirport: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { departureCity }) {
            try {
                return yield (0, flights_services_1.getFlightsByDepartureAirport)(departureCity);
            }
            catch (error) {
                logger_1.default.error("Error in getFlightsByDepar:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        getFlightsByArrivalAirport: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { arrivalCity }) {
            try {
                return yield (0, flights_services_1.getFlightsByArrivalAirport)(arrivalCity);
            }
            catch (error) {
                logger_1.default.error("Error in getFlightsByAirport:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        getFlightsByPriceRange: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { minPrice, maxPrice }) {
            try {
                return yield (0, flights_services_1.getFlightsByPriceRange)(minPrice, maxPrice);
            }
            catch (error) {
                logger_1.default.error("Error in by price:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        getFlightsByStatus: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { status }) {
            try {
                return yield (0, flights_services_1.getFlightsByStatus)(status);
            }
            catch (error) {
                logger_1.default.error("Error in getFlightsBySTATUS:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        getFlightBySeatType: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { seatType }) {
            try {
                return yield (0, flights_services_1.getFlightBySeatType)(seatType);
            }
            catch (error) {
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        getFlightById: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { flightId }) {
            try {
                const flight = yield (0, flights_services_1.getFlightByIdService)(flightId);
                if (!flight) {
                    throw new apollo_server_express_1.ApolloError('Flight not found', 'NOT_FOUND');
                }
                return flight;
            }
            catch (error) {
                logger_1.default.error("Error in getFlightsById:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        getAllFlights: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield (0, flights_services_1.getAllFlightsService)();
            }
            catch (error) {
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
    },
    Mutation: {
        addNewFlight: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { flightData }) {
            try {
                return yield (0, flights_services_1.addNewFlight)(flightData);
            }
            catch (error) {
                logger_1.default.error("Error in addNewFlight:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        updateFlight: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { flightId, flightData }) {
            try {
                return yield (0, flights_services_1.updateFlight)(flightId, flightData);
            }
            catch (error) {
                logger_1.default.error("Error in updateFLight:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        cancelFlight: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { flightId }) {
            try {
                return yield (0, flights_services_1.cancelFlight)(flightId);
            }
            catch (error) {
                logger_1.default.error("Error in cancelFlight:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
    },
};
exports.default = resolvers;
