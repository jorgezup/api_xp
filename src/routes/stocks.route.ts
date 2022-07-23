import { Router } from "express";

import { StocksController } from "../controllers/stocks.controller";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
import { validateIsAdmin } from "../middlewares/isAdmin";

const routes = Router();

routes.use(authenticationMiddleware);

routes.get("/", new StocksController().list);
routes.post("/cadastrar", validateIsAdmin, new StocksController().create);

export { routes as stocksRoute }
