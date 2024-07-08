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
exports.uploadOrChangeAvatarService = exports.updateUserEmailService = exports.updateUserInfoService = exports.getUserByIdService = exports.createNewManager = exports.banUserService = exports.getAllUsersService = void 0;
const ApiError_1 = require("../utils/ApiError");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
//PRISMA CLIENT
const client_1 = require("@prisma/client");
const logger_1 = __importDefault(require("../utils/logger"));
const prisma = new client_1.PrismaClient();
const getAllUsersService = (role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield prisma.user.findMany({
            where: { role },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                verified: true,
                banned: true,
                avatar: true,
                // exclude sensitive fields
                password: false,
                OTP: false,
                OTPEx: false,
                resetToken: false,
                restExpires: false,
                chToken: false,
                chExpires: false,
                verificationToken: false,
                verificationExpires: false,
            },
        });
        return allUsers;
    }
    catch (err) {
        logger_1.default.error("Error during get all users service:", err);
        throw new ApiError_1.ApiError("Failed to fetch users", 500);
    }
});
exports.getAllUsersService = getAllUsersService;
/**
 * Service to ban a user
 * @param {string} userId - The ID of the user to ban
 * @returns {Promise<void>}
 * @throws {ApiError} - If the user banning fails or the requester lacks permissions
 */
const banUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new ApiError_1.ApiError("User not found!", 404);
        }
        // Ban the user by setting the banned field to true
        yield prisma.user.update({
            where: { id: userId },
            data: { banned: true },
        });
    }
    catch (err) {
        logger_1.default.error("Error during banning user:", err);
        if (err instanceof ApiError_1.ApiError)
            throw err;
        throw new ApiError_1.ApiError("Failed to ban user", 500);
    }
});
exports.banUserService = banUserService;
const createNewManager = (managerData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check for unique email
        const existingUser = yield prisma.user.findUnique({
            where: { email: managerData.email },
        });
        if (existingUser) {
            throw new ApiError_1.ApiError("Email already exists", 401);
        }
        // create the manager
        const newManager = yield prisma.user.create({
            data: {
                email: managerData.email,
                password: yield bcryptjs_1.default.hash(managerData.password, 12),
                firstName: managerData.firstName,
                lastName: managerData.lastName,
                phoneNumber: managerData.phoneNumber,
                role: "MANAGER",
            },
        });
        return newManager;
    }
    catch (err) {
        logger_1.default.error("Error during creating new manager:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to create new manager", 500);
    }
});
exports.createNewManager = createNewManager;
/////////////////////////////********************************//////////////////////////////
/**
 * Service to fetch a user by ID
 * @param {string} userId - The ID of the user to fetch
 * @returns {Promise<Partial<User> | null>} - The user object if found, null if not found
 * @throws {ApiError} - If there's an error during database operation
 */
const getUserByIdService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new ApiError_1.ApiError("User not found", 404);
        }
        const publicUser = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            role: user.role,
            avatar: user.avatar,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            verified: user.verified,
            banned: user.banned,
        };
        return publicUser;
    }
    catch (err) {
        logger_1.default.error("Error during get user by ID service:", err);
        if (err instanceof ApiError_1.ApiError) {
            throw err;
        }
        throw new ApiError_1.ApiError("Failed to fetch user", 500);
    }
});
exports.getUserByIdService = getUserByIdService;
/**
 * Service to update user information
 * @param {string} userId - The ID of the user to update
 * @param {Partial<User>} userInfo - The new user information
 * @returns {Promise<User>} - The updated user document
 * @throws {ApiError} - If the user update fails
 */
const updateUserInfoService = (userId, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield prisma.user.update({
            where: { id: userId },
            data: userInfo,
        });
        return updatedUser;
    }
    catch (err) {
        logger_1.default.error("Error during updating user info:", err);
        throw new ApiError_1.ApiError("Failed to update user info", 500);
    }
});
exports.updateUserInfoService = updateUserInfoService;
/**
 * Service to update user email
 * @param {string} userId - The ID of the user to update
 * @param {string} newEmail - The new email address
 * @returns {Promise<User>} - The updated user document
 * @throws {ApiError} - If the user update fails
 */
const updateUserEmailService = (userId, newEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield prisma.user.update({
            where: { id: userId },
            data: { email: newEmail },
        });
        //TODO : SEND EMAIL TO VERIFY THE OPERATION
        return updatedUser;
    }
    catch (err) {
        logger_1.default.error("Error during updating user email:", err);
        throw new ApiError_1.ApiError("Failed to update user email", 500);
    }
});
exports.updateUserEmailService = updateUserEmailService;
/**
 * Service to upload or change user avatar
 * @param {string} userId - The ID of the user to update
 * @param {GraphQLFile} file - The uploaded file
 * @returns {Promise<User>} - The updated user document
 * @throws {ApiError} - If the avatar update fails
 */
const uploadOrChangeAvatarService = (userId, file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new ApiError_1.ApiError('User not found', 404);
        if (user.avatar) {
            const oldAvatarPath = path_1.default.join(__dirname, '../../../uploads/avatars', user.avatar);
            if (fs_1.default.existsSync(oldAvatarPath)) {
                fs_1.default.unlinkSync(oldAvatarPath);
            }
        }
        const { createReadStream, filename } = file;
        const stream = createReadStream();
        const filePath = path_1.default.join(__dirname, '../../../uploads/avatars', filename);
        // Ensure the uploads directory exists
        const uploadsDir = path_1.default.join(__dirname, '../../../uploads/avatars');
        if (!fs_1.default.existsSync(uploadsDir)) {
            fs_1.default.mkdirSync(uploadsDir, { recursive: true });
        }
        yield new Promise((resolve, reject) => {
            const writeStream = fs_1.default.createWriteStream(filePath);
            stream.pipe(writeStream);
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });
        // Update the user's avatar
        const updatedUser = yield prisma.user.update({
            where: { id: userId },
            data: { avatar: `/avatar/${filename}` },
        });
        return updatedUser;
    }
    catch (err) {
        logger_1.default.error('Error during uploading or changing avatar:', err);
        throw new ApiError_1.ApiError('Failed to upload or change avatar', 500);
    }
});
exports.uploadOrChangeAvatarService = uploadOrChangeAvatarService;
