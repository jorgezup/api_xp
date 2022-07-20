import { Router } from "express";

import { ClientController } from "../controllers/clients.controller";
import { clientMiddleware } from "../middlewares/clients.middleware";
import { loginMiddleware } from "../middlewares/login.middleware";

const routes = Router();

routes.post("/criar", clientMiddleware, new ClientController().create);
routes.post("/entrar", loginMiddleware, new ClientController().login);

export { routes as clientRoutes };
