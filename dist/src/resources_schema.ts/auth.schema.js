"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassSchema = exports.resetPassSchema = exports.forgotPassSchema = exports.verifyOTPSchema = exports.verifyEmailSchema = exports.loginSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(8, { message: "Password must be at least 8 characters long" }),
    firstName: zod_1.z.string().min(2, { message: "First name must be at least 2 characters long" }).max(255, { message: "First name must be at most 255 characters long" }),
    lastName: zod_1.z.string().min(2, { message: "Last name must be at least 2 characters long" }).max(255, { message: "Last name must be at most 255 characters long" }),
    phoneNumber: zod_1.z.string().min(10, { message: "Phone number must be at least 10 characters long" }).max(15, { message: "Phone number must be at most 15 characters long" }).nullable(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(1, { message: "Enter your password please" }), // min(1) is used instead of required
});
exports.verifyEmailSchema = zod_1.z.object({
    token: zod_1.z.string().min(1, { message: "Token is required" }),
});
exports.verifyOTPSchema = zod_1.z.object({
    OTP: zod_1.z.string().min(8, { message: "please enter a valid OTP" })
});
exports.forgotPassSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Please enter a valid email" })
});
exports.resetPassSchema = zod_1.z.object({
    token: zod_1.z.string().min(1, { message: "Token is required" }),
    newPassword: zod_1.z.string().min(8, { message: "Please enter a valid new password" })
});
exports.changePassSchema = zod_1.z.object({
    userID: zod_1.z.string(),
    data: zod_1.z.object({
        oldPassword: zod_1.z.string().min(8, { message: "Please enter your current password" }),
        newPassword: zod_1.z.string().min(8, { message: "Please enter a new password" })
    })
});
