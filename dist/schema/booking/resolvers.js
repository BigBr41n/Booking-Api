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
const booking_services_1 = require("../../services/booking.services");
const logger_1 = __importDefault(require("../../utils/logger"));
const resolvers = {
    Query: {
        getBookingById: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { bookingId }) {
            try {
                return yield (0, booking_services_1.getBookingById)(bookingId);
            }
            catch (error) {
                logger_1.default.error("Error in getBookingById:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        getBookingHistory: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield (0, booking_services_1.getBookingHistory)(context.user.id);
            }
            catch (error) {
                logger_1.default.error("Error in getBookingHistory:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        getAllBookings: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield (0, booking_services_1.getAllBookings)(context.user.id);
            }
            catch (error) {
                logger_1.default.error("Error in getAllBookings:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
    },
    Mutation: {
        createBooking: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { bookingData }, context) {
            try {
                return yield (0, booking_services_1.createBooking)(context.user.id, bookingData);
            }
            catch (error) {
                logger_1.default.error("Error in create booking:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        updateBookingDetails: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { bookingId, bookingData }) {
            try {
                return yield (0, booking_services_1.updateBookingDetails)(bookingId, bookingData);
            }
            catch (error) {
                logger_1.default.error("Error in update bookingDetails:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        cancelBooking: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { bookingId }) {
            try {
                return yield (0, booking_services_1.cancelBooking)(bookingId);
            }
            catch (error) {
                logger_1.default.error("Error in cancel Booking:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        updateBookingStatus: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { bookingId, status }) {
            try {
                return yield (0, booking_services_1.updateBookingStatus)(bookingId, status);
            }
            catch (error) {
                logger_1.default.error("Error in update booking status:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
    },
};
exports.default = resolvers;
