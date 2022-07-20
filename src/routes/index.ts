import express from "express";

import { accountRoutes } from "./account.route";
import { clientRoutes } from "./clients.route";
import { investimentsRoutes } from "./investiments.route";
import { stocksRoute } from "./stocks.route";

const routes = express.Router();

routes.use("/clientes", clientRoutes);
routes.use("/conta", accountRoutes);
routes.use("/investimentos", investimentsRoutes);
routes.use("/acoes", stocksRoute);

export { routes };
