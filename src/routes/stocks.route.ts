import { Router } from "express";

import { StocksController } from "../controllers/stocks.controller";
import { authenticationMiddleware } from "../middlewares/auth.middleware";

const routes = Router();

routes.use(authenticationMiddleware);

routes.get("/", new StocksController().list);
/* Is Admin */
routes.post("/cadastrar", new StocksController().create);

export { routes as stocksRoute };
