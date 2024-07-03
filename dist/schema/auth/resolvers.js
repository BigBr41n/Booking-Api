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
const auth_services_1 = require("../../services/auth.services");
const logger_1 = __importDefault(require("../../utils/logger"));
const resolvers = {
    Mutation: {
        signUp: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userData }) {
            try {
                return yield (0, auth_services_1.signUpService)(userData);
            }
            catch (error) {
                logger_1.default.error("Error in signUp:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        login: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userData }) {
            try {
                return yield (0, auth_services_1.loginService)(userData);
            }
            catch (error) {
                logger_1.default.error("Error in login:", error);
                throw new apollo_server_express_1.AuthenticationError(error.message);
            }
        }),
        verifyEmail: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { token }) {
            try {
                return yield (0, auth_services_1.verifyEmailService)(token);
            }
            catch (error) {
                logger_1.default.error("Error in verifyEmail:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        verifyOTP: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { OTP }) {
            try {
                return yield (0, auth_services_1.verifyOTP)(OTP);
            }
            catch (error) {
                logger_1.default.error("Error in verifyOTP:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        forgotPassword: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { email }) {
            try {
                return yield (0, auth_services_1.forgotPasswordService)(email);
            }
            catch (error) {
                logger_1.default.error("Error in forgotPassword:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        resetPassword: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { token, newPassword }) {
            try {
                return yield (0, auth_services_1.restPassword)(token, newPassword);
            }
            catch (error) {
                logger_1.default.error("Error in resetPassword:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        changePassword: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userID, data }) {
            try {
                return yield (0, auth_services_1.changePasswordService)(userID, data);
            }
            catch (error) {
                logger_1.default.error("Error in changePassword:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
    },
};
exports.default = resolvers;
