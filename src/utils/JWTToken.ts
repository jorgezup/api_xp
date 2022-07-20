import "dotenv/config";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

import { IPayload } from "../interfaces/payload.interface";
import HttpException from "../shared/http.exception";

const SECRET = process.env.JWT_SECRET || "";

const jwtConfig: SignOptions = {
  expiresIn: "15m",
  algorithm: "HS256",
};

const generateJWTToken = (payload: IPayload) =>
  jwt.sign(payload, SECRET, jwtConfig);

const authenticateToken = async (
  token: string | undefined
): Promise<string | JwtPayload> => {
  if (!token) {
    return new HttpException(401, "Token expired");
  }

  try {
    return jwt.verify(token, SECRET);
  } catch (e) {
    return new HttpException(401, "Token expired");
  }
};

export { generateJWTToken, authenticateToken };
