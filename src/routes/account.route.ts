import { Router } from "express";

import { AccountController } from "../controllers/account.controller";
import { accountTransactionMiddleware } from "../middlewares/accountTransaction.middleware";
import { authenticationMiddleware } from "../middlewares/auth.middleware";

const routes = Router();

routes.use(authenticationMiddleware);

routes.post(
  "/saque",
  accountTransactionMiddleware,
  new AccountController().withdraw
);
routes.post(
  "/deposito",
  accountTransactionMiddleware,
  new AccountController().deposit
);
routes.get("/", new AccountController().balance);

export { routes as accountRoutes };
