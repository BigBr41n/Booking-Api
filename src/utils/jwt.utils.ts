import jwt, { VerifyErrors } from "jsonwebtoken";
import logger from "./logger";
import fs from "fs";
import path from "path";


const privateKey = fs.readFileSync(
  path.join(__dirname, "../..", "private.key"),
  "utf8"
);

const publicKey = fs.readFileSync(
  path.join(__dirname, "../..", "public.key"),
  "utf8"
);

const refreshTokenPrivateKey = fs.readFileSync(
  path.join(__dirname, "../..", "refTokenPrivate.key"),
  "utf-8"
);
const refreshTokenPublicKey = fs.readFileSync(
  path.join(__dirname, "../..", "refTokenPublic.key"),
  "utf-8"
);




export function signJwt(id: string , role : string): string | null {
  const token = jwt.sign({id , role}, privateKey, {
    algorithm: "RS256",
    expiresIn: "3h",
  });
  return token;
}




export function verifyJwt(token: string): any {
  jwt.verify(
    token,
    publicKey,
    { algorithms: ["RS256"] },
    (error: VerifyErrors | null, decoded: any | undefined) => {
      if (error) {
        logger.error(error);
        return null;
      } else {
        return decoded;
      }
    }
  );
}




export function signRefreshToken(id: string): string {
  return jwt.sign({id}, refreshTokenPrivateKey, {
    algorithm: "RS256",
    expiresIn: "7d",
  });
}





export function verifyRefreshToken(token: string): any {
  const decoded = jwt.verify(token, refreshTokenPublicKey, {
    algorithms: ["RS256"],
  });
  return { valid: true, expired: false, decoded };
}