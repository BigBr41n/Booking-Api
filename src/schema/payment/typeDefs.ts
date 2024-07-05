import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type PaymentIntent {
    clientSecret: String!
  }

  type PaymentConfirmation {
    success: Boolean
    error: String
  }

  type Mutation {
    createPaymentIntent(bookingId: ID!): PaymentIntent! @auth 
    confirmPayment(paymentIntentId: String!): PaymentConfirmation! @auth 
  }
`;





export default typeDefs;