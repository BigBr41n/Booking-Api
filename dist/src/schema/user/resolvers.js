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
const graphql_upload_minimal_1 = require("graphql-upload-minimal");
const logger_1 = __importDefault(require("../../utils/logger"));
const users_services_1 = require("../../services/users.services");
const apollo_server_express_1 = require("apollo-server-express");
const user = __importStar(require("../../resources_schema.ts/user.schema"));
const resolvers = {
    Upload: graphql_upload_minimal_1.GraphQLUpload,
    Query: {
        getAllUsers: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { role }) {
            user.getAllUserSchema.parse({ role });
            return yield (0, users_services_1.getAllUsersService)(role);
        }),
        getUserById: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            user.getUserByIdSchema.parse({ userId: context.user.id });
            return yield (0, users_services_1.getUserByIdService)(context.user.id);
        })
    },
    Mutation: {
        banUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId }) {
            try {
                user.banUserSchema.parse({ userId });
                yield (0, users_services_1.banUserService)(userId);
                return true;
            }
            catch (error) {
                logger_1.default.error("Error in banUser:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        createNewManager: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) {
            try {
                user.createManagerSchema.parse(input);
                return yield (0, users_services_1.createNewManager)(input);
            }
            catch (error) {
                logger_1.default.error("Error in createManger:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        updateUserInfo: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { input }, context) { return yield (0, users_services_1.updateUserInfoService)(context.user.id, input); }),
        updateUserEmail: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId, newEmail }) {
            user.updateUserEmailSchema.parse({ userId, newEmail });
            return yield (0, users_services_1.updateUserEmailService)(userId, newEmail);
        }),
        uploadOrChangeAvatar: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { file }, context) {
            const upload = yield file;
            return yield (0, users_services_1.uploadOrChangeAvatarService)(context.user.id, upload);
        }),
    },
};
exports.default = resolvers;
