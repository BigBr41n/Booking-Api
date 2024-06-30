import http from 'node:http'
import app from './app'
//import {apolloServer} from './src/app'

const httpServer = http.createServer(app);


httpServer.maxHeadersCount = 100 ; 
httpServer.keepAliveTimeout = 5000;



async function startServer() {
    //await apolloServer.start();
    //server.applyMiddleware({ app });
  
    httpServer.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready at http://localhost:4000-{server.graphqlPath}`)
    );
};


startServer();







