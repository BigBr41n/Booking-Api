//import { GraphQLUpload } from 'graphql-upload';
import { GraphQLUpload } from 'graphql-upload-minimal'
import { User } from '@prisma/client';
import logger from '../../utils/logger'
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



const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    getAllUsers: async (
      _: any,
      { role }: { role: 'USER' | 'MANAGER' | 'ADMIN' }
    ): Promise<Partial<User>[]> => await getAllUsersService(role),

    getUserById: async (
      _: any,
      args : any , 
      context: { user: { id: string; role: string } }
    ): Promise<Partial<User> | null> => await getUserByIdService(context.user.id),
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
        logger.error("Error in banUser:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },

    createNewManager: async (
      _: any,
      { input }: { input: any }
    ): Promise<User> => {
      try {

        return await createNewManager(input); 

      } catch (error : any) {
        logger.error("Error in createManger:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },

    updateUserInfo: async (
      _: any,
      { input }: {input: Partial<User> }, 
      context: { user: { id: string; role: string } }
    ): Promise<User> => await updateUserInfoService(context.user.id, input),

    updateUserEmail: async (
      _: any,
      { userId, newEmail }: { userId: string; newEmail: string }
    ): Promise<User> => await updateUserEmailService(userId, newEmail),

    uploadOrChangeAvatar: async (
      _: any,
      { file }: { file: Promise<GraphQLUpload> }, 
      context: { user: { id: string; role: string } }
    ): Promise<User> => {
      const upload = await file;
      return await uploadOrChangeAvatarService(context.user.id , upload);
    },
  },
};

interface GraphQLUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => NodeJS.ReadableStream;
}



export default resolvers;