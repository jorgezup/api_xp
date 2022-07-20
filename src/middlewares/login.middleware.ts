import { Request, Response, NextFunction } from "express";
import joi from "joi";

const schema = joi.object({
  codClient: joi.number().min(6).required(),
  password: joi.string().min(6).required(),
});

const loginMiddleware = (req: Request, res: Response, next: NextFunction) => {
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

export { loginMiddleware };
