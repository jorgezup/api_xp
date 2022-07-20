import { Router } from "express";

import { AccountController } from "../controllers/account.controller";
import { accountTransactionMiddleware } from "../middlewares/accountTransaction.middleware";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
import { validateAccountClient } from "../middlewares/validateAccountClient.middleware";

const routes = Router();

routes.use(authenticationMiddleware);

routes.post(
  "/:accountId/saque",
  validateAccountClient,
  accountTransactionMiddleware,
  new AccountController().withdraw
);
routes.post(
  "/:accountId/deposito",
  validateAccountClient,
  accountTransactionMiddleware,
  new AccountController().deposit
);
routes.get(
  "/:accountId/saldo",
  validateAccountClient,
  new AccountController().balance
);

export { routes as accountRoutes };
