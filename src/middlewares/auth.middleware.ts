/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";

import HttpException from "../shared/http.exception";
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
  // console.log("AQUI PAyload", payload);

  if (payload instanceof HttpException) {
    return next({
      messageType: payload.messageType,
      statusCode: payload.statusCode,
    });
  }
  // pegar o id do usuario logado
  const id = decodeToken(token);

  if (!id) {
    return next({ messageType: "Error", statusCode: 400 });
  }

  res.locals.payload = payload;
  res.locals.loggedClientId = id;

  next();
};
