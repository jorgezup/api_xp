import { Request, Response } from "express";

import { IPayload } from "../interfaces/payload.interface";
import {
  IAccountTransaction,
  TypeTransaction,
} from "../interfaces/transaction.interface";
import { AccountService } from "../services/account.service";
import { AccountTransactionService } from "../services/accountTransaction.service";

export class AccountController {
  async deposit(req: Request, res: Response) {
    const { value } = req.body;
    const { accountId, codClient }: IPayload = res.locals.payload;

    const transaction: IAccountTransaction = {
      value,
      type: TypeTransaction.DEPOSIT,
      codClient,
      accountId,
    };

    const service = new AccountTransactionService();

    const result = await service.depositTransaction(transaction);

    if (result instanceof Error) {
      return res.status(400).json({ message: result.message });
    }

    return res.status(201).end();
  }
  async withdraw(req: Request, res: Response) {
    const { value } = req.body;
    const { accountId, codClient }: IPayload = res.locals.payload;

    const transaction: IAccountTransaction = {
      value,
      type: TypeTransaction.WITHDRAW,
      codClient,
      accountId,
    };

    const service = new AccountTransactionService();

    const result = await service.withdrawTransaction(transaction);

    if (result instanceof Error) {
      return res.status(400).json({ message: result.message });
    }

    return res.status(201).end();
  }
  async balance(req: Request, res: Response) {
    const { codClient }: IPayload = res.locals.payload;

    const service = new AccountService();

    const result = await service.balance(codClient);

    if (result instanceof Error) {
      return res.status(400).json({ message: result.message });
    }

    return res.json(result);
  }
}
