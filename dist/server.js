"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = __importDefault(require("node:http"));
const app_1 = __importDefault(require("./app"));
//import {apolloServer} from './src/app'
const httpServer = node_http_1.default.createServer(app_1.default);
httpServer.maxHeadersCount = 100;
httpServer.keepAliveTimeout = 5000;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        //await apolloServer.start();
        //server.applyMiddleware({ app });
        httpServer.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000-{server.graphqlPath}`));
    });
}
;
startServer();
