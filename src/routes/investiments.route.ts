import { Router } from "express";

import { InvestimentsController } from "../controllers/investiments.controller";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
import { validateAccountClient } from "../middlewares/validateAccountClient.middleware";

const routes = Router();

routes.use(authenticationMiddleware);

routes.get(
  "/:accountId/saldo",
  validateAccountClient,
  new InvestimentsController().list
);
routes.post(
  "/:accountId/comprar",
  validateAccountClient,
  new InvestimentsController().buy
);
routes.post(
  "/:accountId/vender",
  validateAccountClient,
  new InvestimentsController().sell
);

export { routes as investimentsRoutes };
