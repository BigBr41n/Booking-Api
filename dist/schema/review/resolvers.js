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
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const reviews_services_1 = require("../../services/reviews.services");
const resolvers = {
    Query: {
        getReviewsByEntity: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { entityId, entityType }) {
            try {
                _.entityIdSchema.parse(entityId);
                _.entityTypeSchema.parse(entityType);
                return yield (0, reviews_services_1.getReviewsByEntity)(entityId, entityType);
            }
            catch (error) {
                throw new apollo_server_express_1.ApolloError(error.message, error.code);
            }
        }),
        getReviewsByUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId }) {
            try {
                return yield (0, reviews_services_1.getReviewsByUser)(userId);
            }
            catch (error) {
                throw new apollo_server_express_1.ApolloError(error.message, error.code);
            }
        }),
    },
    Mutation: {
        submitReview: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { reviewData }) {
            try {
                _.reviewDataSchema.parse(reviewData);
                return yield (0, reviews_services_1.submitReview)(reviewData);
            }
            catch (error) {
                throw new apollo_server_express_1.ApolloError(error.message, error.code);
            }
        }),
        deleteReview: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { reviewId }) {
            try {
                yield (0, reviews_services_1.deleteReviewService)(reviewId);
                return true;
            }
            catch (error) {
                throw new apollo_server_express_1.ApolloError(error.message, error.code);
            }
        }),
    },
};
exports.default = resolvers;
