import { GraphQLUpload } from 'graphql-upload';
import { User } from '@prisma/client';
import {
  getAllUsersService,
  banUserService,
  createNewManager,
  getUserByIdService,
  updateUserInfoService,
  updateUserEmailService,
  uploadOrChangeAvatarService,
} from '../../services/users.services';
import { ApolloError } from 'apollo-server-express';



export const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    getAllUsers: (
      _: any,
      { role }: { role: 'USER' | 'MANAGER' }
    ): Promise<Partial<User>[]> => getAllUsersService(role),

    getUserById: (
      _: any,
      { userId }: { userId: string }
    ): Promise<Partial<User> | null> => getUserByIdService(userId),
  },

  Mutation: {
    banUser: async (
      _: any,
      { userId }: { userId: string }
    ): Promise<boolean> => {
      try {
        await banUserService(userId);
        return true;
      } catch (error: any) {
        console.error("Error in banUser:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },

    createNewManager: (
      _: any,
      { input }: { input: any }
    ): Promise<User> => {
      try {

        return createNewManager(input); 

      } catch (error : any) {
        console.error("Error in createManger:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },

    updateUserInfo: (
      _: any,
      { userId, input }: { userId: string; input: Partial<User> }
    ): Promise<User> => updateUserInfoService(userId, input),

    updateUserEmail: (
      _: any,
      { userId, newEmail }: { userId: string; newEmail: string }
    ): Promise<User> => updateUserEmailService(userId, newEmail),

    uploadOrChangeAvatar: async (
      _: any,
      { userId, file }: { userId: string; file: Promise<GraphQLUpload> }
    ): Promise<User> => {
      const upload = await file;
      return uploadOrChangeAvatarService(userId, upload);
    },
  },
};

interface GraphQLUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => NodeJS.ReadableStream;
}