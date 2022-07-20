import { AppDataSource } from "../../data-source";
import { Stock } from "../entities/Stock";

export const stockRepository = AppDataSource.getRepository(Stock);
