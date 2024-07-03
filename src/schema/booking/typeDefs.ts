import { gql } from 'apollo-server-express';

export const typeDefs = gql`
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