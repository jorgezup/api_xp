import { AppDataSource } from "../../data-source";
import { Account_Transaction } from "../entities/AccountTransaction";

export const accountTransactionRepository = AppDataSource.getRepository(Account_Transaction)