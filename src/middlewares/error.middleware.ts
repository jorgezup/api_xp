import { Request, Response, NextFunction } from "express";

import httpException from "../shared/http.exception";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { statusCode, messageType } = err as httpException;
  if (statusCode) {
    return res.status(statusCode).json({ message: messageType });
  }

  return res.status(500).json({ message: "Internal server error" });
};

export { errorHandler as errorMiddleware };
