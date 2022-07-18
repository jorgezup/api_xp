import { Router } from "express";
import { AccountController } from "../controllers/account.controller";

const routes = Router()

routes.post('/saque', new AccountController().withdraw)
routes.post('/deposito', new AccountController().deposit)
routes.get('/:codClient', new AccountController().balance)

export {routes as AccountRoutes}