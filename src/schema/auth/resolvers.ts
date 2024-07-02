import {
  ApolloError,
  UserInputError,
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





const resolvers = {
  Mutation: {
    signUp: async (_: any, { userData }: { userData: REGISTER_INPUT }) => {
      try {
        return await signUpService(userData);
      } catch (error: any) {
        console.error("Error in signUp:", error);
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
        return await loginService(userData);
      } catch (error: any) {
        console.error("Error in login:", error);
        throw new AuthenticationError(error.message);
      }
    },

    verifyEmail: async (_: any, { token }: { token: string }) => {
      try {
        return await verifyEmailService(token);
      } catch (error: any) {
        console.error("Error in verifyEmail:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },

    verifyOTP: async (_: any, { OTP }: { OTP: string }) => {
      try {
        return await verifyOTP(OTP);
      } catch (error: any) {
        console.error("Error in verifyOTP:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },

    forgotPassword: async (_: any, { email }: { email: string }) => {
      try {
        return await forgotPasswordService(email);
      } catch (error: any) {
        console.error("Error in forgotPassword:", error);
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
        return await restPassword(token, newPassword);
      } catch (error: any) {
        console.error("Error in resetPassword:", error);
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
        return await changePasswordService(userID, data);
      } catch (error: any) {
        console.error("Error in changePassword:", error);
        throw new ApolloError(
          error.message,
          error.statusCode || "INTERNAL_SERVER_ERROR"
        );
      }
    },
  },
};

export default resolvers;
