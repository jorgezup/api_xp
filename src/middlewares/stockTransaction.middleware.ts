import { Request, Response, NextFunction } from "express";
import joi from "joi";

const schema = joi.object({
  codStock: joi.number().required(),
  quantity: joi.number().required(),
});

const stockTransactionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = schema.validate(req.body);

  if (error) {
    const { type, message } = error.details[0];
    next({
      statusCode: type === "any.required" ? 400 : 422,
      messageType: message,
    });
  }

  next();
};

export { stockTransactionMiddleware };
