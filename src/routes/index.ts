import express from "express";

import { AccountRoutes } from "./account.route";
import { ClientRoutes } from "./clients.route";

const routes = express.Router();

routes.use("/clients", ClientRoutes);
routes.use("/conta", AccountRoutes);

export { routes };
