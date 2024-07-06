"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
  enum BookingStatus {
    PENDING
    CONFIRMED
    CANCELLED
  }

  type Booking {
    id: ID!
    userId: String!
    flightId: String
    hotelId: String
    totalPrice: Float!
    status: BookingStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input BookingCreateInput {
    userId: String!
    flightId: String
    hotelId: String
  }

  input BookingUpdateInput {
    flightId: String
    hotelId: String
    status: BookingStatus
  }

  type Query {
    getBookingById(bookingId: ID!): Booking @auth
    getBookingHistory(userId: String!): [Booking!]! @auth
    getAllBookings(userId: String!): [Booking!]! @auth
  }

  type Mutation {
    createBooking(userId: String!, bookingData: BookingCreateInput!): Booking! @auth
    updateBookingDetails(bookingId: ID!, bookingData: BookingUpdateInput!): Booking! @auth
    cancelBooking(bookingId: ID!): Booking! @auth
    updateBookingStatus(bookingId: ID!, status: BookingStatus!): Booking! @auth @hasRole(role: "ADMIN")
  }
`;
exports.default = typeDefs;
