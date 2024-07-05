import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { authDirective, hasRoleDirective } from "./directives";

const { authDirectiveTypeDefs, authDirectiveTransformer } =
  authDirective("auth");
const { hasRoleDirectiveTypeDefs, hasRoleDirectiveTransformer } =
  hasRoleDirective("hasRole");

import userTypeDefs from "./user/typeDefs";
import userResolvers from "./user/resolvers";

import hotelTypeDefs from "./hotel/typeDefs";
import hotelResolvers from "./hotel/resolvers";

import flightTypeDefs from "./flights/typeDefs";
import flightResolvers from "./flights/resolvers";

import bookingTypeDefs from "./booking/typeDefs";
import bookingResolvers from "./booking/resolvers";

import paymentTypeDefs from "./payment/typeDefs";
import paymentResolvers from "./payment/resolvers";

import reviewTypeDefs from "./review/typeDefs";
import reviewResolvers from "./review/resolvers";

import authTypeDefs from "./auth/typeDefs";
import authResolvers from "./auth/resolvers";

const typeDefs = mergeTypeDefs([
  authDirectiveTypeDefs,
  hasRoleDirectiveTypeDefs,
  userTypeDefs,
  hotelTypeDefs,
  reviewTypeDefs,
  authTypeDefs,
  bookingTypeDefs,
  paymentTypeDefs,
  flightTypeDefs,
]);

const resolvers = mergeResolvers([
  userResolvers,
  hotelResolvers,
  reviewResolvers,
  authResolvers,
  bookingResolvers,
  paymentResolvers,
  flightResolvers,
]);



let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});



// apply the directive transformers
schema = authDirectiveTransformer(schema);
schema = hasRoleDirectiveTransformer(schema);

export { schema };
