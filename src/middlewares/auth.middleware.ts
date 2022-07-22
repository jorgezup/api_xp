import { NextFunction, Request, Response } from "express";

import { authenticateToken } from "../utils/JWTToken";

export const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // const token = req.headers.authorization;
  if (!req.headers.authorization) {
    return next({
      messageType: "Unauthorized",
      statusCode: 401,
    });
  }
  let token: string | undefined;
  const [Bearer, tokenString] = req.headers.authorization.split(" ");
  /* Insomnia não passa a palavra Bearer, porém o Swagger utiliza a palavra Bearer antes do token 
  essa lógica, o authorization é validado, e feito um split, caso haja a palavra Bearer, o tokenString
  é atribuído ao token, caso contrário o Bearer é atribuído ao token
  */

  if (Bearer === "Bearer") {
    token = tokenString;
  } else {
    token = Bearer;
  }

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
