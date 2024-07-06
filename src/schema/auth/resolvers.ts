import {
  ApolloError,
  AuthenticationError,
} from "apollo-server-express";
import {
  PASS,
  REGISTER_INPUT,
  signUpService,
  loginService,
  verifyEmailService,
  verifyOTP,
  forgotPasswordService,
  restPassword,
  changePasswordService,
} from "../../services/auth.services";
import logger from '../../utils/logger';
import * as auth from '../../resources_schema.ts/auth.schema'





const resolvers = {
  Mutation: {
    signUp: async (_: any, { userData }: { userData: REGISTER_INPUT }) => {
      try {
        auth.signUpSchema.parse(userData);
        return await signUpService(userData);
      } catch (error: any) {
        logger.error("Error in signUp:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },

    login: async (
      _: any,
      { userData }: { userData: { email: string; password: string } }
    ) => {
      try {
        auth.loginSchema.parse(userData);
        return await loginService(userData);
      } catch (error: any) {
        logger.error("Error in login:", error);
        throw new AuthenticationError(error.message);
      }
    },

    verifyEmail: async (_: any, { token }: { token: string }) => {
      try {
        auth.verifyEmailSchema.parse({token});
        return await verifyEmailService(token);
      } catch (error: any) {
        logger.error("Error in verifyEmail:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },

    verifyOTP: async (_: any, { OTP }: { OTP: string }) => {
      try {
        auth.verifyOTPSchema.parse({OTP});
        return await verifyOTP(OTP);
      } catch (error: any) {
        logger.error("Error in verifyOTP:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },

    forgotPassword: async (_: any, { email }: { email: string }) => {
      try {
        auth.forgotPassSchema.parse({email});
        return await forgotPasswordService(email);
      } catch (error: any) {
        logger.error("Error in forgotPassword:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },

    resetPassword: async (
      _: any,
      { token, newPassword }: { token: string; newPassword: string }
    ) => {
      try {
        auth.resetPassSchema.parse({token, newPassword});
        return await restPassword(token, newPassword);
      } catch (error: any) {
        logger.error("Error in resetPassword:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },

    changePassword: async (
      _: any,
      { userID, data }: { userID: string; data: PASS }
    ) => {
      try {
        auth.changePassSchema.parse({userID, data});
        return await changePasswordService(userID, data);
      } catch (error: any) {
        logger.error("Error in changePassword:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },
  },
};

export default resolvers;
