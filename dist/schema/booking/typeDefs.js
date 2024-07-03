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
    getBookingById(bookingId: ID!): Booking
    getBookingHistory(userId: String!): [Booking!]!
    getAllBookings(userId: String!): [Booking!]!
  }

  type Mutation {
    createBooking(userId: String!, bookingData: BookingCreateInput!): Booking!
    updateBookingDetails(bookingId: ID!, bookingData: BookingUpdateInput!): Booking!
    cancelBooking(bookingId: ID!): Booking!
    updateBookingStatus(bookingId: ID!, status: BookingStatus!): Booking!
  }
`;
exports.default = typeDefs;
