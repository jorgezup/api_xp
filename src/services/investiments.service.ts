import { TradeOrder } from "../controllers/investiments.controller";
import { Stock } from "../database/models/entities/Stock";
import {
  Stock_Transaction,
  TypeStockTransaction,
} from "../database/models/entities/StockTransaction";
import { accountRepository } from "../database/models/repositories/account.repository";
import { stockRepository } from "../database/models/repositories/stock.repository";
import { stockTransactionRepository } from "../database/models/repositories/stockTransaction.repository";
import { TypeTransaction } from "../interfaces/transaction.interface";
import { AccountTransactionService } from "./accountTransaction.service";

type StockQuantityType = {
  totalQuantity: number;
};

type StockTransaction = {
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

const createStockTransaction = (stockTransaction: StockTransaction) =>
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

export class InvestimentsService {
  async buyStock(order: TradeOrder) {
    const updatedValue = await getUpdatedPriceStock(order.codStock);

    if (updatedValue instanceof Error) {
      return updatedValue;
    }

    const orderPrice = updatedValue * order.quantity;

    const accountTransactionService = new AccountTransactionService();

    const accountResponse = await accountTransactionService.withdrawTransaction(
      {
        accountId: order.accountId,
        codClient: order.codClient,
        type: TypeTransaction.BUY_STOCK,
        value: orderPrice,
      }
    );

    if (accountResponse instanceof Error) {
      return accountResponse;
    }

    const stockTransaction: StockTransaction = {
      accountId: order.accountId,
      quantity: order.quantity,
      type: TypeStockTransaction.BUY,
      value: updatedValue,
      codStock: order.codStock,
    };

    const newStockTransaction = await createStockTransaction(stockTransaction);

    return newStockTransaction;
  }
  async sellStock(order: TradeOrder) {
    const updatedValue = await getUpdatedPriceStock(order.codStock);

    if (updatedValue instanceof Error) {
      return updatedValue;
    }

    const stockQuantity = await getStockQuantity(
      order.codStock,
      order.accountId
    );

    if (stockQuantity instanceof Error) {
      return stockQuantity;
    }

    if (
      stockQuantity.totalQuantity === null ||
      stockQuantity.totalQuantity - order.quantity < 0
    ) {
      return new Error("There's not enought stock");
    }

    const orderPrice = updatedValue * order.quantity;

    const accountTransactionService = new AccountTransactionService();

    const accountResponse = await accountTransactionService.depositTransaction({
      accountId: order.accountId,
      codClient: order.codClient,
      type: TypeTransaction.SELL_STOCK,
      value: orderPrice,
    });

    if (accountResponse instanceof Error) {
      return accountResponse;
    }

    const stockTransaction: StockTransaction = {
      accountId: order.accountId,
      quantity: order.quantity,
      type: TypeStockTransaction.SELL,
      value: updatedValue,
      codStock: order.codStock,
    };

    const newStockTransaction = await createStockTransaction(stockTransaction);

    return newStockTransaction;
  }
  async list(codClient: number) {
    const listOfStocks = await getListOfStocksInHold(codClient);

    // { message: `There's no stocks` }
    if (listOfStocks.length === 1 && !listOfStocks[0].codStock) {
      return [];
    }

    const stocksInHold = listOfStocks.filter(
      (stock) => stock.stocksquantity > 0
    );

    return stocksInHold;
  }
}
