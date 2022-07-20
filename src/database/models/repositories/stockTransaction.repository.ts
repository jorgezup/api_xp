import { AppDataSource } from "../../data-source";
import { Stock_Transaction } from "../entities/StockTransaction";

export const stockTransactionRepository =
  AppDataSource.getRepository(Stock_Transaction);
