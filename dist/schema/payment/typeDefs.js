"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
  type PaymentIntent {
    clientSecret: String!
  }

  type PaymentConfirmation {
    success: Boolean
    error: String
  }

  type Mutation {
    createPaymentIntent(bookingId: ID!): PaymentIntent!
    confirmPayment(paymentIntentId: String!): PaymentConfirmation!
  }
`;
exports.default = typeDefs;
