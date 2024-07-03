import { makeExecutableSchema } from  'graphql-tools';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

import userTypeDefs from './user/typeDefs';
import userResolvers from './user/resolvers';

import hotelTypeDefs from './hotel/typeDefs';
import hotelResolvers from './hotel/resolvers';

import flightTypeDefs from './flights/typeDefs';
import flightResolvers from './flights/resolvers';

import bookingTypeDefs from './booking/typeDefs';
import bookingResolvers from './booking/resolvers';

import paymentTypeDefs from './payment/typeDefs';
import paymentResolvers from './payment/resolvers';

import reviewTypeDefs from './review/typeDefs';
import reviewResolvers from './review/resolvers';

import authTypeDefs from './auth/typeDefs'
import authResolvers from './auth/resolvers'


const typeDefs = mergeTypeDefs([userTypeDefs, hotelTypeDefs , reviewTypeDefs , authTypeDefs , bookingTypeDefs , paymentTypeDefs, flightTypeDefs ]);
const resolvers = mergeResolvers([userResolvers, hotelResolvers , reviewResolvers , authResolvers , bookingResolvers , paymentResolvers , flightResolvers]);

export const schema = makeExecutableSchema({ typeDefs, resolvers });

