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
const payments_services_1 = require("../../services/payments.services");
const resolvers = {
    Mutation: {
        createPaymentIntent: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { bookingId }) {
            try {
                const result = yield (0, payments_services_1.createPaymentIntent)(bookingId);
                return result;
            }
            catch (error) {
                throw new apollo_server_express_1.ApolloError(error.message, error.code);
            }
        }),
        confirmPayment: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { paymentIntentId }) {
            try {
                const result = yield (0, payments_services_1.confirmPayment)(paymentIntentId);
                return result;
            }
            catch (error) {
                throw new apollo_server_express_1.ApolloError(error.message, error.code);
            }
        }),
    },
};
exports.default = resolvers;
