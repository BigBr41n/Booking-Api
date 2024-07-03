import { ApolloError } from 'apollo-server-express';
import {
  createPaymentIntent,
  confirmPayment
} from '../../services/payments.services';

const resolvers = {
  Mutation: {
    createPaymentIntent: async (_: any, { bookingId }: { bookingId: string }) => {
      try {
        const result = await createPaymentIntent(bookingId);
        return result as { clientSecret: string };
      } catch (error: any) {
        throw new ApolloError(error.message, error.code);
      }
    },
    confirmPayment: async (_: any, { paymentIntentId }: { paymentIntentId: string }) => {
      try {
        const result = await confirmPayment(paymentIntentId);
        return result;
      } catch (error: any) {
        throw new ApolloError(error.message, error.code);
      }
    },
  },
};




export default resolvers;