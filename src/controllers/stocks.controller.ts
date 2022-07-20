import { Request, Response } from "express";

import { StocksService } from "../services/stocks.service";

export class StocksController {
  async create(req: Request, res: Response) {
    const { name, value } = req.body;

    const service = new StocksService();

    const response = await service.createStock({ name, value });

    if (response instanceof Error) {
      return res.status(400).json({ message: response.message });
    }

    return res.status(201).json(response);
  }
  async list(req: Request, res: Response) {
    const service = new StocksService();

    const response = await service.listStocks();

    return res.status(200).json(response);
  }
}
