import "dotenv/config";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

import HttpException from "../shared/http.exception";

const SECRET = process.env.JWT_SECRET || "";

type Payload = {
  id: string;
};

const jwtConfig: SignOptions = {
  // expiresIn: 60, // TO-DO: validar erro "Error: invalid expiresIn option for string payload"
  algorithm: "HS256",
};

// TO-DO -> type payload
const generateJWTToken = (payload: Payload) => jwt.sign(payload, SECRET);

const authenticateToken = async (
  token: string
): Promise<string | JwtPayload | Error> => {
  if (!token) {
    return new HttpException(401, "Token expired");
  }

  try {
    return jwt.verify(token, SECRET);
  } catch (e) {
    return new HttpException(401, "Token expired");
  }
};

const decodeToken = (token: string) => jwt.decode(token);

export { generateJWTToken, authenticateToken, decodeToken };
