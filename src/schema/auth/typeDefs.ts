const { gql } = require('apollo-server-express');

const typeDefs = gql`
  enum Role {
    USER
    ADMIN
    MANAGER
  }

  scalar DateTime

  type User {
    id: ID!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    OTP: String
    OTPEx: DateTime
    resetToken: String
    restExpires: DateTime
    chToken: String
    chExpires: DateTime
    verificationToken: String
    verificationExpires: DateTime
    verified: Boolean!
    phoneNumber: String
    avatar: String
    role: Role!
    banned: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Tokens {
    accessToken: String!
    refreshToken: String!
  }


  type Mutation {
    signUp(userData: RegisterInput!): User!
    login(userData: LoginInput!): String!
    verifyEmail(token: String!): String!
    verifyOTP(OTP: String!): Tokens!
    forgotPassword(email: String!): String!
    resetPassword(token: String!, newPassword: String!): String!
    changePassword(userID: ID!, data: PasswordChangeInput!): String!
  }

  input RegisterInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    phoneNumber: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input PasswordChangeInput {
    old: String!
    new: String!
  }
`;

module.exports = typeDefs;
