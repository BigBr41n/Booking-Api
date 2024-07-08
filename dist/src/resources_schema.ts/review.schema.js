"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIdSchema = exports.entityTypeSchema = exports.entityIdSchema = exports.reviewIdSchema = exports.reviewDataSchema = void 0;
const zod_1 = require("zod");
exports.reviewDataSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    flightId: zod_1.z.string().optional(),
    hotelId: zod_1.z.string().optional(),
    rating: zod_1.z.number().min(1).max(5),
    comment: zod_1.z.string().optional(),
});
exports.reviewIdSchema = zod_1.z.string();
exports.entityIdSchema = zod_1.z.string();
exports.entityTypeSchema = zod_1.z.enum(["flight", "hotel"]);
exports.userIdSchema = zod_1.z.string();
