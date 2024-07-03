import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Hotel {
    id: ID!
    name: String!
    city: String!
    country: String!
    address: String!
    price: Float!
    roomsAvailable: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input HotelCreateInput {
    name: String!
    city: String!
    country: String!
    address: String!
    price: Float!
    roomsAvailable: Int!
  }

  input HotelUpdateInput {
    name: String
    city: String
    country: String
    address: String
    price: Float
    roomsAvailable: Int
  }

  input HotelSearchCriteria {
    city: String
    country: String
    minPrice: Float
    maxPrice: Float
  }

  type Query {
    searchHotels(criteria: HotelSearchCriteria!): [Hotel!]!
    getHotelById(hotelId: ID!): Hotel
    getAllHotels: [Hotel!]!
  }

  type Mutation {
    addNewHotel(hotelData: HotelCreateInput!): Hotel!
    updateHotelDetails(hotelId: ID!, hotelData: HotelUpdateInput!): Hotel!
    removeHotel(hotelId: ID!): Hotel!
    updateAvailableRooms(hotelId: ID!, roomsAvailable: Int!): Hotel!
  }
`;


export default typeDefs;