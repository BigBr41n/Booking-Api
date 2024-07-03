import http from 'node:http';
import app, { apolloServer } from './app';

const httpServer = http.createServer(app);

httpServer.maxHeadersCount = 100;
httpServer.keepAliveTimeout = 5000;

async function startServer() {
    await apolloServer.start();
    apolloServer.applyMiddleware({
      app: app,
      path: '/graphql',
      cors: false
  })

    httpServer.listen({ port: 4000 }, () => {
        console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
    });
}

startServer();
