import { stockRepository } from "../database/models/repositories/stock.repository";

type StockRequest = {
  name: string;
  value: number;
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
}
