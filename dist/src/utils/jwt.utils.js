"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJwt = signJwt;
exports.verifyJwt = verifyJwt;
exports.signRefreshToken = signRefreshToken;
exports.verifyRefreshToken = verifyRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("./logger"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const privateKey = fs_1.default.readFileSync(path_1.default.join(__dirname, "../..", "private.key"), "utf8");
const publicKey = fs_1.default.readFileSync(path_1.default.join(__dirname, "../..", "public.key"), "utf8");
const refreshTokenPrivateKey = fs_1.default.readFileSync(path_1.default.join(__dirname, "../..", "refTokenPrivate.key"), "utf-8");
const refreshTokenPublicKey = fs_1.default.readFileSync(path_1.default.join(__dirname, "../..", "refTokenPublic.key"), "utf-8");
function signJwt(id, role) {
    const token = jsonwebtoken_1.default.sign({ id, role }, privateKey, {
        algorithm: "RS256",
        expiresIn: "3h",
    });
    return token;
}
function verifyJwt(token) {
    jsonwebtoken_1.default.verify(token, publicKey, { algorithms: ["RS256"] }, (error, decoded) => {
        if (error) {
            logger_1.default.error(error);
            return null;
        }
        else {
            return decoded;
        }
    });
}
function signRefreshToken(id) {
    return jsonwebtoken_1.default.sign({ id }, refreshTokenPrivateKey, {
        algorithm: "RS256",
        expiresIn: "7d",
    });
}
function verifyRefreshToken(token) {
    const decoded = jsonwebtoken_1.default.verify(token, refreshTokenPublicKey, {
        algorithms: ["RS256"],
    });
    return { valid: true, expired: false, decoded };
}
