"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apolloServer = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const index_1 = require("./schema/index");
const jwt_utils_1 = require("./utils/jwt.utils");
// Express instance
const app = (0, express_1.default)();
// Middlewares
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
exports.apolloServer = new apollo_server_express_1.ApolloServer({
    schema: index_1.schema,
    context: ({ req }) => {
        var _a, _b;
        const token = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
        if (!token)
            return null;
        // Try to retrieve a user with the token
        const user = (0, jwt_utils_1.verifyJwt)(token);
        // Add the user to the context
        return user;
    },
});
exports.default = app;
