import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './schema/index';

// Express instance
const app = express() as any;

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(cors());

export const apolloServer = new ApolloServer({ schema });

export default app;
