import "dotenv/config";
import jwt, {
  JsonWebTokenError,
  JwtPayload,
  SignOptions,
  TokenExpiredError,
} from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "";

type Payload = {
  id: string;
};

const jwtConfig: SignOptions = {
  //   expiresIn: "1d", TO-DO: validar erro "Error: invalid expiresIn option for string payload"
  algorithm: "HS256",
};

// TO-DO -> type payload
const generateJWTToken = (payload: any) => jwt.sign(payload, SECRET, jwtConfig);

const authenticateToken = async (
  token: string
): Promise<string | JwtPayload | Error> => {
  if (!token) {
    return JsonWebTokenError;
  }

  try {
    return jwt.verify(token, SECRET, jwtConfig);
  } catch (e) {
    return TokenExpiredError;
  }
};

const decodeToken = (token: string) => jwt.decode(token);

export { generateJWTToken, authenticateToken, decodeToken };
