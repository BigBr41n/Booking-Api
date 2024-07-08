"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelIdSchema = exports.searchHotelsSchema = exports.updateAvailableRoomsSchema = exports.partialHotelDataSchema = exports.hotelDataSchema = void 0;
const zod_1 = require("zod");
exports.hotelDataSchema = zod_1.z.object({
    name: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string(),
    address: zod_1.z.string(),
    price: zod_1.z.number(),
    roomsAvailable: zod_1.z.number(),
    status: zod_1.z.string(),
});
exports.partialHotelDataSchema = exports.hotelDataSchema.partial();
exports.updateAvailableRoomsSchema = zod_1.z.object({
    hotelId: zod_1.z.string(),
    roomsAvailable: zod_1.z.number(),
});
exports.searchHotelsSchema = zod_1.z.object({
    city: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    minPrice: zod_1.z.number().optional(),
    maxPrice: zod_1.z.number().optional(),
});
exports.hotelIdSchema = zod_1.z.string();
