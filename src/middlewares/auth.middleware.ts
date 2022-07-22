import { NextFunction, Request, Response } from "express";

import { authenticateToken } from "../utils/JWTToken";

export const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization;
  const payload = await authenticateToken(token);
  if (!payload || payload instanceof Error) {
    return next({
      messageType: "Unauthorized",
      statusCode: 401,
    });
  }

  res.locals.payload = payload;

  return next();
};
