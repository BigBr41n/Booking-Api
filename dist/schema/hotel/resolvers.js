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
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const hotels_services_1 = require("../../services/hotels.services");
const resolvers = {
    Query: {
        searchHotels: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { criteria }) {
            try {
                return yield (0, hotels_services_1.searchHotels)(criteria);
            }
            catch (error) {
                throw new apollo_server_express_1.ApolloError(error.message, error.code);
            }
        }),
        getHotelById: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { hotelId }) {
            try {
                _.hotelIdSchema(hotelId);
                return yield (0, hotels_services_1.getHotelById)(hotelId);
            }
            catch (error) {
                throw new apollo_server_express_1.ApolloError(error.message, error.code);
            }
        }),
        getAllHotels: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield (0, hotels_services_1.getAllHotels)();
            }
            catch (error) {
                throw new apollo_server_express_1.ApolloError(error.message, error.code);
            }
        }),
    },
    Mutation: {
        addNewHotel: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { hotelData }) {
            try {
                _.hotelDataSchema(hotelData);
                return yield (0, hotels_services_1.addNewHotel)(hotelData);
            }
            catch (error) {
                throw new apollo_server_express_1.ApolloError(error.message, error.code);
            }
        }),
        updateHotelDetails: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { hotelId, hotelData }) {
            try {
                _.partialHotelDataSchema.parse(hotelData);
                return yield (0, hotels_services_1.updateHotelDetails)(hotelId, hotelData);
            }
            catch (error) {
                throw new apollo_server_express_1.ApolloError(error.message, error.code);
            }
        }),
        removeHotel: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { hotelId }) {
            try {
                return yield (0, hotels_services_1.removeHotel)(hotelId);
            }
            catch (error) {
                throw new apollo_server_express_1.ApolloError(error.message, error.code);
            }
        }),
        updateAvailableRooms: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { hotelId, roomsAvailable }) {
            try {
                _.updateAvailableRoomsSchema({ hotelId, roomsAvailable });
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                ;
                return yield (0, hotels_services_1.updateAvailableRooms)(hotelId, roomsAvailable);
            }
            catch (error) {
                throw new apollo_server_express_1.ApolloError(error.message, error.code);
            }
        }),
    },
};
exports.default = resolvers;
