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
const logger_1 = __importDefault(require("../../utils/logger"));
const users_services_1 = require("../../services/users.services");
const apollo_server_express_1 = require("apollo-server-express");
const resolvers = {
    //Upload: GraphQLUpload,
    Query: {
        getAllUsers: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { role }) { return yield (0, users_services_1.getAllUsersService)(role); }),
        getUserById: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId }) { return yield (0, users_services_1.getUserByIdService)(userId); }),
    },
    Mutation: {
        banUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId }) {
            try {
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
                return yield (0, users_services_1.createNewManager)(input);
            }
            catch (error) {
                logger_1.default.error("Error in createManger:", error);
                throw new apollo_server_express_1.ApolloError(error.message, error.statusCode || "INTERNAL_SERVER_ERROR");
            }
        }),
        updateUserInfo: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId, input }) { return yield (0, users_services_1.updateUserInfoService)(userId, input); }),
        updateUserEmail: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId, newEmail }) { return yield (0, users_services_1.updateUserEmailService)(userId, newEmail); }),
        uploadOrChangeAvatar: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId, file }) {
            const upload = yield file;
            return yield (0, users_services_1.uploadOrChangeAvatarService)(userId, upload);
        }),
    },
};
exports.default = resolvers;
