"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
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
    submitReview(reviewData: ReviewCreateInput!): Review! @auth 
    deleteReview(reviewId: ID!): Boolean! @auth 
  }
`;
exports.default = typeDefs;
