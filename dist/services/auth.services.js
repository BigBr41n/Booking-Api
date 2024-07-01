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
exports.changePasswordService = exports.restPassword = exports.forgotPasswordService = exports.verifyOTP = exports.verifyEmailService = exports.loginService = exports.signUpService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const ApiError_1 = require("../utils/ApiError");
const logger_1 = __importDefault(require("../utils/logger"));
const generateOTP_1 = require("../utils/generateOTP");
const crypto_1 = __importDefault(require("crypto"));
//IMPORT SEND EMAILS FUNCTIONS : 
const mailer_1 = require("../utils/mailer");
//IMPORT THE PRISMA CLIENT WITH THE MODEL
const client_1 = require("@prisma/client");
const jwt_utils_1 = require("../utils/jwt.utils");
const prisma = new client_1.PrismaClient();
const signUpService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //check for unique emails
        const user = yield prisma.user.findFirst({
            where: { email: userData.email },
        });
        if (user)
            throw new ApiError_1.ApiError("Email already  Exists", 401);
        const activationToken = crypto_1.default.randomBytes(32).toString("hex");
        const activeExpires = Date.now() + 1000 * 60 * 60;
        const newUser = yield prisma.user.create({
            data: {
                email: userData.email,
                password: yield bcryptjs_1.default.hash(userData.password, 12),
                firstName: userData.firstName,
                lastName: userData.lastName,
                phoneNumber: userData.phoneNumber,
                verificationToken: activationToken,
                verificationExpires: new Date(activeExpires),
            },
        });
        yield (0, mailer_1.sendEmailVerification)(userData.email, userData.firstName, activationToken);
        return newUser;
    }
    catch (err) {
        logger_1.default.error("Error during sign up service:", err);
        //throw the error to the controller
        if (err instanceof ApiError_1.ApiError)
            throw err;
        throw new ApiError_1.ApiError(err, 500);
    }
});
exports.signUpService = signUpService;
/**
 *service to login a registered user
 *@param {SIGNUP} userData - user data needed to register
 *@returns {Promise<LOGIN | undefined>} - the logged in user with the access token & refresh token
 *@throws {ApiError} -if the user login operation failed
 **/
const loginService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({ where: { email: userData.email } });
        if (!user) {
            throw new ApiError_1.ApiError("User not found!", 404);
        }
        if (!user.verified) {
            throw new ApiError_1.ApiError("Email not verified!", 401);
        }
        const isMatch = yield bcryptjs_1.default.compare(userData.password, user.password);
        if (!isMatch) {
            throw new ApiError_1.ApiError("Invalid credentials!", 401);
        }
        const OTP = (0, generateOTP_1.generateOTP)(8);
        yield (0, mailer_1.sendOTP)(user.email, user.firstName, OTP);
        return "please check the OTP sent to your email";
    }
    catch (err) {
        logger_1.default.error("Error during login service:", err);
        //throw the error to the controller
        if (err instanceof ApiError_1.ApiError)
            throw err;
        throw new ApiError_1.ApiError("Internal Server Error", 500);
    }
});
exports.loginService = loginService;
/**
 * @param {string} token - The token sent to email
 * @returns {Promise<string | null>} - return a string of email successfully activated
 * @throws {ApiError} -if the user email verification failed
*/
const verifyEmailService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //check if the token is valid
        const checkToken = yield prisma.user.findFirst({
            where: {
                verificationToken: token,
            },
        });
        if (!checkToken) {
            throw new ApiError_1.ApiError("Token invalid", 401);
        }
        //check the time of the token if not invalid
        const user = yield prisma.user.findFirst({
            where: {
                verificationToken: token,
                verificationExpires: { gt: new Date(Date.now()) },
            },
        });
        //Token expired or Invalid 
        if (!user) {
            const newToken = crypto_1.default.randomBytes(32).toString("hex");
            const activeExpires = Date.now() + 1000 * 60 * 60;
            yield prisma.user.update({
                where: { id: checkToken.id },
                data: {
                    verificationToken: newToken,
                    verificationExpires: new Date(activeExpires),
                },
            });
            (0, mailer_1.sendEmailVerification)(checkToken.email, checkToken.firstName, newToken);
            throw new ApiError_1.ApiError("Token expired or invalid we sent you a new one", 401);
        }
        //token is valid and email is verified
        yield prisma.user.update({
            where: { id: user.id },
            data: {
                verified: true,
                verificationToken: "",
                verificationExpires: "",
            }
        });
        return "Email verified successfully";
    }
    catch (err) {
        logger_1.default.error("Error during verifyEmailService:", err);
        if (err instanceof ApiError_1.ApiError)
            throw err;
        throw new ApiError_1.ApiError("Internal Server Error", 500);
    }
});
exports.verifyEmailService = verifyEmailService;
;
const verifyOTP = (OTP) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findFirst({
            where: {
                OTP: OTP,
                OTPEx: { gt: new Date() },
            },
        });
        if (!user) {
            throw new ApiError_1.ApiError("OTP invalid; please Login Again", 401);
        }
        const accessToken = (0, jwt_utils_1.signJwt)(user.id);
        const refreshToken = (0, jwt_utils_1.signRefreshToken)(user.id);
        if (!accessToken || !refreshToken) {
            throw new ApiError_1.ApiError("Error creating tokens", 500);
        }
        return { accessToken, refreshToken };
    }
    catch (err) {
        logger_1.default.error("Error during verifyOTP:", err);
        if (err instanceof ApiError_1.ApiError)
            throw err;
        throw new ApiError_1.ApiError("Internal Server Error", 500);
    }
});
exports.verifyOTP = verifyOTP;
/**
 * @param {string} email - email of the user who forgot his pass
 * @returns {Promise<String>} - return string that confirms the email sent successfully
 * @throws {ApiError} - if any error internal or by the user
 */
const forgotPasswordService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({ where: { email: email } });
        //if no user is found
        if (!user)
            throw new ApiError_1.ApiError("Invalid Email!", 200);
        const changePassToken = crypto_1.default.randomBytes(32).toString("hex");
        const changePassTokenExpires = Date.now() + 1000 * 60 * 60;
        yield prisma.user.update({ where: {
                email: email
            },
            data: {
                resetToken: changePassToken,
                restExpires: new Date(changePassTokenExpires),
            } });
        yield (0, mailer_1.sendForgotPassToken)(email, user.firstName, changePassToken);
        return "email sent successfully";
    }
    catch (err) {
        logger_1.default.error("Error during forgot password service:", err);
        if (err instanceof ApiError_1.ApiError)
            throw err;
        throw new ApiError_1.ApiError("Internal Server Error", 500);
    }
});
exports.forgotPasswordService = forgotPasswordService;
/**
 *service to rest user password after confirming the token
 *@param {string} token - user token that got from the sent email
 *@param {string} newPassword - the new password of the user account
 *@returns {Promise<boolean >} - if the reset password succeeded sent true
 *@throws {ApiError} -if any error occurred
**/
const restPassword = (token, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findFirst({ where: { resetToken: token,
                restExpires: { gt: new Date(Date.now()) },
            } });
        if (!user) {
            throw new ApiError_1.ApiError("Invalid Token or expired ", 401);
        }
        //update the user password
        yield prisma.user.update({ where: { id: user.id }, data: {
                password: yield bcryptjs_1.default.hash(newPassword, 12),
                resetToken: "",
                restExpires: "",
            } });
        return "password changed successfully";
    }
    catch (err) {
        logger_1.default.error("Error during forgot password conf service:", err);
        //throw the error to the controller
        if (err instanceof ApiError_1.ApiError)
            throw err;
        throw new ApiError_1.ApiError("INternal Server Error", 500);
    }
});
exports.restPassword = restPassword;
;
const changePasswordService = (userID, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data.old || !data.new) {
            throw new ApiError_1.ApiError("You must provide both the old and new password", 400);
        }
        const user = yield prisma.user.findUnique({ where: { id: userID } });
        //if user does not exist
        if (!user) {
            throw new ApiError_1.ApiError("User not found", 404);
        }
        //is user exists
        const isMatch = yield bcryptjs_1.default.compare(data.old, user.password);
        if (!isMatch) {
            throw new ApiError_1.ApiError("Invalid old password", 401);
        }
        //update the user password
        yield prisma.user.update({ where: { id: user.id }, data: {
                password: yield bcryptjs_1.default.hash(data.new, 12),
            } });
        yield (0, mailer_1.passwordChangedNotify)(user.email, user.firstName);
        return "password changed successfully";
    }
    catch (err) {
        logger_1.default.error("Error during change password service:", err);
        //throw the error to the controller
        if (err instanceof ApiError_1.ApiError)
            throw err;
        throw new ApiError_1.ApiError("Internal Server Error", 500);
    }
});
exports.changePasswordService = changePasswordService;
