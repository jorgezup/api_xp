import { Request, Response, NextFunction } from "express";
import joi from "joi";

const schema = joi.object({
  name: joi.string().min(3).required(),
  surname: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.number().min(6).required(),
});

const validateClient = (req: Request, res: Response, next: NextFunction) => {
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

export { validateClient as clientMiddleware };
