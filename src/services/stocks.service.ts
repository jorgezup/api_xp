import fetch from "node-fetch";

import { stockRepository } from "../database/models/repositories/stock.repository";
import HttpException from "../shared/http.exception";

type StockRequest = {
  name: string;
  value: number;
};

type ErrorAPI = {
  error: string;
  message: string;
};

type StockResponse = {
  error?: ErrorAPI;
  message: string;
  symbol: string;
  price: number;
  updated_at: Date;
};

export class StocksService {
  async createStock({ name, value }: StockRequest) {
    const stock = await stockRepository.findOneBy({ name });

    if (stock) {
      return new Error("Stock already exists");
    }

    const newStock = stockRepository.create({ name, value });

    await stockRepository.save(newStock);

    return newStock;
  }
  async listStocks() {
    const stocks = await stockRepository.find();

    return stocks;
  }
  async updateStock(stock: string) {
    const response = await fetch(`${process.env.EXTERNAL_API}${stock}`);

    const { results } = await response.json();

    const resultObject = Object.entries(results)[0][1] as StockResponse;

    if (resultObject.error) {
      const messageText = resultObject.message.split(":")[0];
      return new HttpException(422, messageText);
    }

    const updatedStock = {
      name: resultObject.symbol,
      price: resultObject.price,
      updatedAt: resultObject.updated_at,
    };

    const foundStock = await stockRepository.findOneBy({
      name: updatedStock.name,
    });

    if (!foundStock) {
      const newStock = stockRepository.create({
        name: updatedStock.name,
        value: updatedStock.price,
      });

      await stockRepository.save(newStock);
    } else {
      stockRepository
        .createQueryBuilder()
        .update()
        .set({ value: updatedStock.price })
        .where("name = :name", { name: updatedStock.name })
        .execute();
    }

    return updatedStock;
  }
}
