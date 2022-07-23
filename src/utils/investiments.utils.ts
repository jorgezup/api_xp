import { Stock } from "../database/models/entities/Stock";
import {
  Stock_Transaction,
  TypeStockTransaction,
} from "../database/models/entities/StockTransaction";
import { accountRepository } from "../database/models/repositories/account.repository";
import { stockRepository } from "../database/models/repositories/stock.repository";
import { stockTransactionRepository } from "../database/models/repositories/stockTransaction.repository";

type StockQuantityType = {
  totalQuantity: number;
};

export type StockTransactionType = {
  accountId: number;
  quantity: number;
  type: TypeStockTransaction;
  value: number;
  codStock: number;
};

type StockInHold = {
  codStock: number;
  stockname: string;
  stocksquantity: number;
  avgprice: number;
};

const getUpdatedPriceStock = (codStock: number): Promise<number | Error> =>
  stockRepository
    .createQueryBuilder()
    .select("s.value")
    .from(Stock, "s")
    .where("s.codStock = :id", { id: codStock })
    .getOneOrFail()
    .then(
      (data) => data.value,
      (error) => error
    );

const getStockQuantity = async (
  codStock: number,
  accountId: number
): Promise<StockQuantityType | Error> =>
  stockTransactionRepository
    .createQueryBuilder("st")
    .select("SUM(st.quantity)", "totalQuantity")
    .where("st.codStock = :codStock", { codStock })
    .andWhere("st.accountId = :accountId", { accountId })
    .getRawOne()
    .then(
      (data) => data,
      (error) => error
    );

const createStockTransaction = (stockTransaction: StockTransactionType) =>
  stockTransactionRepository
    .createQueryBuilder()
    .insert()
    .into(Stock_Transaction)
    .values({
      account: { id: stockTransaction.accountId },
      quantity: stockTransaction.quantity,
      type: stockTransaction.type,
      value: stockTransaction.value,
      stock: { codStock: stockTransaction.codStock },
    })
    .execute();

const getListOfStocksInHold = (codClient: number): Promise<StockInHold[]> =>
  accountRepository
    .createQueryBuilder("a")
    .select(
      "s.codStock, s.name as stockName, SUM(st.quantity) as stocksQuantity, ROUND(AVG(st.value),2) as avgPrice"
    )
    .leftJoin("stocks_transactions", "st", "a.id = st.accountId")
    .leftJoin("stocks", "s", "s.codStock = st.codStock")
    .where("a.codClient = :codClient", { codClient })
    .groupBy("s.codStock")
    .getRawMany();

export {
  getUpdatedPriceStock,
  getStockQuantity,
  createStockTransaction,
  getListOfStocksInHold,
};
