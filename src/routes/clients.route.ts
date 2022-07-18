import { Router } from "express";

import { ClientController } from "../controllers/clients.controller";

const routes = Router();

routes.post("/", new ClientController().create);

export { routes as ClientRoutes };
