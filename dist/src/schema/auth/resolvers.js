"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const auth = __importStar(require("../../resources_schema.ts/auth.schema"));
const resolvers = {
    Mutation: {
        signUp: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userData }) {
            try {
                auth.signUpSchema.parse(userData);
                return yield (0, auth_services_1.signUpService)(userData);
            }
            catch (error) {
                logger_1.default.error("Error in signUp:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        login: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userData }) {
            try {
                auth.loginSchema.parse(userData);
                return yield (0, auth_services_1.loginService)(userData);
            }
            catch (error) {
                logger_1.default.error("Error in login:", error);
                throw new apollo_server_express_1.AuthenticationError(error.message);
            }
        }),
        verifyEmail: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { token }) {
            try {
                auth.verifyEmailSchema.parse({ token });
                return yield (0, auth_services_1.verifyEmailService)(token);
            }
            catch (error) {
                logger_1.default.error("Error in verifyEmail:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        verifyOTP: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { OTP }) {
            try {
                auth.verifyOTPSchema.parse({ OTP });
                return yield (0, auth_services_1.verifyOTP)(OTP);
            }
            catch (error) {
                logger_1.default.error("Error in verifyOTP:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        forgotPassword: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { email }) {
            try {
                auth.forgotPassSchema.parse({ email });
                return yield (0, auth_services_1.forgotPasswordService)(email);
            }
            catch (error) {
                logger_1.default.error("Error in forgotPassword:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        resetPassword: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { token, newPassword }) {
            try {
                auth.resetPassSchema.parse({ token, newPassword });
                return yield (0, auth_services_1.restPassword)(token, newPassword);
            }
            catch (error) {
                logger_1.default.error("Error in resetPassword:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        changePassword: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userID, data }) {
            try {
                auth.changePassSchema.parse({ userID, data });
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
