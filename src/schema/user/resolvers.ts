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
import * as user from '../../resources_schema.ts/user.schema'



const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    getAllUsers: async (
      _: any,
      { role }: { role: 'USER' | 'MANAGER' | 'ADMIN' }
    ): Promise<Partial<User>[]> => {
      user.getAllUserSchema.parse({role}); 
      return await getAllUsersService(role); 
    },
    getUserById: async (
      _: any,
      args : any , 
      context: { user: { id: string; role: string } }
    ): Promise<Partial<User> | null> => {
      user.getUserByIdSchema.parse({userId : context.user.id});
      return await getUserByIdService(context.user.id)
    }
  },

  Mutation: {
    banUser: async (
      _: any,
      { userId }: { userId: string }
    ): Promise<boolean> => {
      try {
        user.banUserSchema.parse({userId});
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
        user.createManagerSchema.parse(input);
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
    ): Promise<User> => {
      user.updateUserEmailSchema.parse({ userId, newEmail});
      return await updateUserEmailService(userId, newEmail)
    },
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