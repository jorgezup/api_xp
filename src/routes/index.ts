import express from "express"
import { ClientRoutes } from "./clients.route"

const routes = express.Router()

routes.use('/clients', ClientRoutes)

export {routes}