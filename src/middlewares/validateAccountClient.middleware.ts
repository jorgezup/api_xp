import { NextFunction, Request, Response } from "express";

/* Valida a conta do usuário passado na requisição com o payload  */

export const validateAccountClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accountId } = req.params;
  const { payload } = res.locals;

  if (Number(accountId) !== Number(payload.accountId)) {
    return next({
      messageType: payload.messageType,
      statusCode: payload.statusCode,
    });
  }

  return next();
};
