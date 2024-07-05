import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Review {
    id: ID!
    userId: String!
    flightId: String
    hotelId: String
    rating: Int!
    comment: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User
    flight: Flight
    hotel: Hotel
  }

  input ReviewCreateInput {
    userId: String!
    flightId: String
    hotelId: String
    rating: Int!
    comment: String!
  }

  type Query {
    getReviewsByEntity(entityId: ID!, entityType: String!): [Review!]!
    getReviewsByUser(userId: ID!): [Review!]! 
  }

  type Mutation {
    submitReview(reviewData: ReviewCreateInput!): Review! @auth @hasRole("USER")
    deleteReview(reviewId: ID!): Boolean! @auth 
  }
`;



export default typeDefs;