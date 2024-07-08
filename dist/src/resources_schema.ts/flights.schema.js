"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flightIdSchema = exports.seatTypeSchema = exports.statusSchema = exports.priceRangeSchema = exports.arrivalCitySchema = exports.departureCitySchema = exports.airlineSchema = exports.dateSchema = exports.partialFlightDataSchema = exports.flightDataSchema = void 0;
const zod_1 = require("zod");
exports.flightDataSchema = zod_1.z.object({
    airline: zod_1.z.string(),
    flightNumber: zod_1.z.string(),
    departureDate: zod_1.z.date(),
    arrivalDate: zod_1.z.date(),
    departureCity: zod_1.z.string(),
    arrivalCity: zod_1.z.string(),
    price: zod_1.z.number(),
    seatsAvailable: zod_1.z.number(),
    status: zod_1.z.string(),
});
exports.partialFlightDataSchema = exports.flightDataSchema.partial();
exports.dateSchema = zod_1.z.date();
exports.airlineSchema = zod_1.z.string();
exports.departureCitySchema = zod_1.z.string();
exports.arrivalCitySchema = zod_1.z.string();
exports.priceRangeSchema = zod_1.z.object({
    minPrice: zod_1.z.number(),
    maxPrice: zod_1.z.number(),
});
exports.statusSchema = zod_1.z.string();
exports.seatTypeSchema = zod_1.z.string();
exports.flightIdSchema = zod_1.z.string();
