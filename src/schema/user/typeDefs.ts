import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Upload
  scalar DateTime

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    phoneNumber: String
    role: Role!
    avatar: String
    createdAt: DateTime!
    updatedAt: DateTime!
    verified: Boolean!
    banned: Boolean!
  }

  enum Role {
    USER
    MANAGER
    ADMIN
  }

  type Query {
    getAllUsers(role: Role!): [User!]! @auth @hasRole(role: "ADMIN")
    getUserById(userId: ID!): User
  }

  type Mutation {
    banUser(userId: ID!): Boolean! @auth @hasRole(role: "ADMIN")
    createNewManager(input: ManagerInput!): User! @auth @hasRole(role: "ADMIN")
    updateUserInfo(userId: ID!, input: UpdateUserInput!): User! @auth 
    updateUserEmail(userId: ID!, newEmail: String!): User! @auth @hasRole(role: "ADMIN")
    uploadOrChangeAvatar(userId: ID!, file: Upload!): User! @auth 
  }

  input ManagerInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    phoneNumber: String
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    phoneNumber: String
  }
`;


export default typeDefs