import { Router } from "express";

import { AccountController } from "../controllers/account.controller";
import { accountTransactionMiddleware } from "../middlewares/accountTransaction.middleware";

const routes = Router();

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
routes.get("/:codClient", new AccountController().balance);

export { routes as accountRoutes };
