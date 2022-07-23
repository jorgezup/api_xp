import { NextFunction, Request, Response } from "express";

/* Valida se a conta é admin */

export const validateIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { payload } = res.locals;

  if (!payload.isAdmin) {
    return next({
      messageType: "Unauthorized",
      statusCode: 401,
    });
  }

  return next();
};
