/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from "express";

import { authenticateToken, decodeToken } from "../utils/JWTToken";

export const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TO-DO -> consistent return
  const token = req.headers.authorization;
  // TO-DO -> validar mensagens de erro
  if (!token) {
    return next({ messageType: " token not found", statusCode: 400 });
  }

  const payload = await authenticateToken(token);

  if (payload instanceof Error) {
    return next({ messageType: payload.message });
  }
  // pegar o id do usuario logado
  const id = decodeToken(token);

  res.locals.payload = payload;
  res.locals.loggedClientId = id;

  next();
};
