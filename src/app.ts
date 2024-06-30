import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express';


//express instance
const app = express();

//middlewares
app.use(helmet); 
app.use(express.json());
app.use(cors());



//export const apolloServer = new ApolloServer({ schema });  NO SCHEMA YET

export default app ;