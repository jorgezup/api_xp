import { Request, Response } from "express";

import { IPayload } from "../interfaces/payload.interface";
import { InvestimentsService } from "../services/investiments.service";

export type TradeOrder = {
  codStock: number;
  quantity: number;
  codClient: number;
  accountId: number;
};

export type IOrderRequest = {
  codStock: number;
  quantity: number;
};

export class InvestimentsController {
  async list(req: Request, res: Response) {
    const { codClient }: IPayload = res.locals.payload;

    const service = new InvestimentsService();

    const stocks = await service.list(codClient);

    return res.status(200).json(stocks);
  }
  async buy(req: Request, res: Response) {
    const { accountId, codClient }: IPayload = res.locals.payload;
    const trade: IOrderRequest = req.body;

    const service = new InvestimentsService();

    const order: TradeOrder = {
      accountId,
      codClient,
      codStock: trade.codStock,
      quantity: trade.quantity,
    };

    const result = await service.buyStock(order);

    if (result instanceof Error) {
      return res.status(400).json({ message: result.message });
    }

    return res.status(201).end();
  }
  async sell(req: Request, res: Response) {
    const { accountId, codClient }: IPayload = res.locals.payload;
    const trade: IOrderRequest = req.body;

    const service = new InvestimentsService();

    const order: TradeOrder = {
      accountId,
      codClient,
      codStock: trade.codStock,
      quantity: trade.quantity,
    };

    const result = await service.sellStock(order);

    if (result instanceof Error) {
      return res.status(400).json({ message: result.message });
    }

    return res.status(201).end();
  }
}
