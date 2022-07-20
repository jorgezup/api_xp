import { Router } from "express";

import { InvestimentsController } from "../controllers/investiments.controller";
import { StocksController } from "../controllers/stocks.controller";
import { accountTransactionMiddleware } from "../middlewares/accountTransaction.middleware";
import { authenticationMiddleware } from "../middlewares/auth.middleware";

const routes = Router();

// routes.use(authenticationMiddleware);

routes.get("/", new StocksController().list);
routes.post("/", new StocksController().create);

export { routes as stocksRoute };
