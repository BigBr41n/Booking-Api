"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserEmailSchema = exports.updateUserInfoSchema = exports.getUserByIdSchema = exports.createManagerSchema = exports.banUserSchema = exports.getAllUserSchema = void 0;
const zod_1 = require("zod");
const RoleEnum = zod_1.z.enum(["USER", "MANAGER", "ADMIN"]);
exports.getAllUserSchema = zod_1.z.object({
    role: RoleEnum,
});
exports.banUserSchema = zod_1.z.object({
    userId: zod_1.z.string({})
});
exports.createManagerSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    email: zod_1.z.string().email(),
    phoneNumber: zod_1.z.string().min(1, { message: "Phone number must be included" }),
    password: zod_1.z.string().min(8, { message: "Password must be at least 8 characters long" })
});
exports.getUserByIdSchema = zod_1.z.object({
    userId: zod_1.z.string({})
});
exports.updateUserInfoSchema = zod_1.z.object({
    firstName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().email().optional(),
    poneNUmber: zod_1.z.string().email().optional(),
});
exports.updateUserEmailSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1),
    newEmail: zod_1.z.string().email(),
});
