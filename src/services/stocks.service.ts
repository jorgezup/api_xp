import fetch from "node-fetch";

import { stockRepository } from "../database/models/repositories/stock.repository";
import { StockResponse } from "../interfaces/stock.interface";
import HttpException from "../shared/http.exception";

const requestApi = async (stockName: string) => {
  const response = await fetch(`${process.env.EXTERNAL_API}${stockName}`);

  const { results } = await response.json();

  const resultObject = Object.entries(results)[0][1] as StockResponse;

  return resultObject;
};

export class StocksService {
  async createStock(name: string) {
    const stock = await stockRepository.findOneBy({ name });

    if (stock) {
      return new Error("Stock already exists");
    }

    const resultObject = await requestApi(name);

    if (resultObject.error) {
      const messageText = resultObject.message.split(":")[0];
      return new HttpException(422, messageText);
    }

    const newStock = stockRepository.create({
      name: resultObject.symbol,
      value: resultObject.price,
    });

    const objectNewStock = await stockRepository.save(newStock);

    return {
      codStock: objectNewStock.codStock,
      name: objectNewStock.name,
      value: objectNewStock.value,
    };
  }
  async listStocks() {
    const stocks = await stockRepository.find();

    const stocksPromises = stocks.map(({ name }) => this.updateStock(name));

    const stocksUpdated = await Promise.all(stocksPromises);

    return stocksUpdated;
  }
  async updateStock(stock: string) {
    const resultObject = await requestApi(stock);

    if (resultObject.error) {
      const messageText = resultObject.message.split(":")[0];
      return new HttpException(422, messageText);
    }

    const updatedStock = {
      name: resultObject.symbol,
      value: resultObject.price,
      // updatedAt: resultObject.updated_at,
    };

    const foundStock = await stockRepository.findOneBy({
      name: updatedStock.name,
    });

    if (!foundStock) {
      return new HttpException(
        404,
        `${updatedStock.name} not found. Contact admin to register this stock.`
      );
    }

    stockRepository
      .createQueryBuilder()
      .update()
      .set({ value: updatedStock.value })
      .where("name = :name", { name: updatedStock.name })
      .execute();

    return {
      codStock: foundStock.codStock,
      ...updatedStock,
    };
  }
}
