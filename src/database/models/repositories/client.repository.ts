import { AppDataSource } from "../../data-source";
import { Client } from "../entities/Client";

export const clientRepository = AppDataSource.getRepository(Client);
