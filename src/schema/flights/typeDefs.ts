import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date

  type Flight {
    id: ID!
    airline: String!
    flightNumber: String!
    departureDate: Date!
    arrivalDate: Date!
    departureCity: String!
    arrivalCity: String!
    price: Float!
    seatsAvailable: Int!
    status: String!
  }

  input FlightInput {
    airline: String!
    flightNumber: String!
    departureDate: Date!
    arrivalDate: Date!
    departureCity: String!
    arrivalCity: String!
    price: Float!
    seatsAvailable: Int!
    status: String!
  }

  type Query {
    getFlightsByDate(date: Date!): [Flight!]! 
    getFlightsByAirline(airline: String!): [Flight!]!
    getFlightsByDepartureAirport(departureCity: String!): [Flight!]!
    getFlightsByArrivalAirport(arrivalCity: String!): [Flight!]!
    getFlightsByPriceRange(minPrice: Float!, maxPrice: Float!): [Flight!]!
    getFlightsByStatus(status: String!): [Flight!]!
    getFlightBySeatType(seatType: String!): [Flight!]!
    getFlightById(flightId: ID!): Flight
    getAllFlights: [Flight!]!
  }

  type Mutation {
    addNewFlight(flightData: FlightInput!): Flight! @auth @hasRole("ADMIN")
    updateFlight(flightId: ID!, flightData: FlightInput!): Flight! @auth @hasRole("ADMIN")
    cancelFlight(flightId: ID!): Flight! @auth @hasRole("ADMIN")
  }
`;


export default typeDefs;