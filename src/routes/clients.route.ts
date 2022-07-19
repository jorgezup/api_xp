import { Router } from "express";

import { ClientController } from "../controllers/clients.controller";
import { clientMiddleware } from "../middlewares/clients.middleware";

const routes = Router();

routes.post("/", clientMiddleware, new ClientController().create);

export { routes as clientRoutes };
