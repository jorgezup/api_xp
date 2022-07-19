import express from "express";

import { accountRoutes } from "./account.route";
import { clientRoutes } from "./clients.route";

const routes = express.Router();

routes.use("/clients", clientRoutes);
routes.use("/conta", accountRoutes);

export { routes };
