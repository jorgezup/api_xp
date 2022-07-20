import { TradeOrder } from "../controllers/investiments.controller";
import { Account } from "../database/models/entities/Account";
import { Stock } from "../database/models/entities/Stock";
import {
  Stock_Transaction,
  TypeStockTransaction,
} from "../database/models/entities/StockTransaction";
import { accountRepository } from "../database/models/repositories/account.repository";
import { stockRepository } from "../database/models/repositories/stock.repository";
import { stockTransactionRepository } from "../database/models/repositories/stockTransaction.repository copy";

type StockQuantityType = {
  totalQuantity: number;
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

const getStockQuantity = (
  codStock: number,
  accountId: number
): Promise<StockQuantityType> =>
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

export class InvestimentsService {
  async buyStock(order: TradeOrder) {
    const updatedValue = await getUpdatedPriceStock(order.codStock);

    if (updatedValue instanceof Error) {
      return updatedValue;
    }

    const newStockTransaction = await stockTransactionRepository
      .createQueryBuilder()
      .insert()
      .into(Stock_Transaction)
      .values({
        account: { id: order.accountId },
        quantity: order.quantity,
        type: TypeStockTransaction.BUY,
        value: updatedValue,
        stock: { codStock: order.codStock },
      })
      .execute();

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

    if (
      stockQuantity.totalQuantity === null ||
      stockQuantity.totalQuantity - order.quantity < 0
    ) {
      return new Error("There's not enought stock");
    }
    const newStockTransaction = await stockTransactionRepository
      .createQueryBuilder()
      .insert()
      .into(Stock_Transaction)
      .values({
        account: { id: order.accountId },
        quantity: -order.quantity,
        type: TypeStockTransaction.SELL,
        value: updatedValue,
        stock: { codStock: order.codStock },
      })
      .execute();

    return newStockTransaction;
  }
  async list(codClient: number) {
    const list = await accountRepository
      .createQueryBuilder("a")
      .select(
        "s.codStock, s.name as `stockName`, SUM(st.quantity) as `stocksQuantity`, ROUND(AVG(st.value),2) as `avgPrice`"
      )
      .leftJoin("stocks_transactions", "st", "a.id = st.accountId")
      .leftJoin("stocks", "s", "s.codStock = st.codStock")
      .where("a.codClient = :codClient", { codClient })
      .groupBy("s.codStock")
      .getRawMany();

    // { message: `There's no stocks` }
    if (list.length === 1 && !list[0].codStock) {
      return [];
    }

    return list;
  }
}
