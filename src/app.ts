import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './schema/index';
import { verifyJwt } from './utils/jwt.utils';

// Express instance
const app = express() as any;

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(cors());

export const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {
      const token = req?.headers?.authorization?.split(" ")[1] ;
      if(!token) return null;

      // Try to retrieve a user with the token
      const user = verifyJwt(token);
      
      // Add the user to the context
      return user;
    },
  });

export default app;
