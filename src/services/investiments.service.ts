import { TradeOrder } from "../controllers/investiments.controller";
import { TypeStockTransaction } from "../database/models/entities/StockTransaction";
import { TypeTransaction } from "../interfaces/transaction.interface";
import {
  createStockTransaction,
  getListOfStocksInHold,
  getStockQuantity,
  getUpdatedPriceStock,
  StockTransactionType,
} from "../utils/investiments.utils";
import { AccountTransactionService } from "./accountTransaction.service";

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

    const stockTransaction: StockTransactionType = {
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

    const stockTransaction: StockTransactionType = {
      accountId: order.accountId,
      quantity: -order.quantity,
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
