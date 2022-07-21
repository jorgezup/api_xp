import { Router } from "express";

import { StocksController } from "../controllers/stocks.controller";

const routes = Router();

// routes.use(authenticationMiddleware);

routes.get("/", new StocksController().list);
/* Is Admin */
routes.post("/", new StocksController().create);
routes.put("/:stock", new StocksController().update);

export { routes as stocksRoute };
