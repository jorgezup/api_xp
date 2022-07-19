import { Request, Response } from "express";

import {
  IAccountTransaction,
  TypeTransaction,
} from "../interfaces/transaction.interface";
import { AccountService } from "../services/account.service";
import { AccountTransactionService } from "../services/accountTransaction.service";

export class AccountController {
  async deposit(req: Request, res: Response) {
    const { value } = req.body;
    const { loggedClientId } = res.locals;

    const transaction: IAccountTransaction = {
      value,
      type: TypeTransaction.DEPOSIT,
      codClient: loggedClientId, // TO-DO: este valor tem que vir da requisição
    };

    const service = new AccountTransactionService();

    const result = await service.depositTransaction(transaction);

    if (result instanceof Error) {
      return res.status(404).json({ message: result.message });
    }

    return res.status(201).end();
  }
  async withdraw(req: Request, res: Response) {
    const { value } = req.body;
    const { loggedClientId } = res.locals;

    const transaction: IAccountTransaction = {
      value, // TO-DO validação
      type: TypeTransaction.WITHDRAW,
      codClient: loggedClientId, // TO-DO: este valor tem que vir da requisição
    };

    const service = new AccountTransactionService();

    const result = await service.withdrawTransaction(transaction);

    if (result instanceof Error) {
      return res.status(500).json({ message: result.message });
    }

    return res.status(201).end();
  }
  async balance(req: Request, res: Response) {
    const { loggedClientId } = res.locals;

    const service = new AccountService();

    const result = await service.balance(Number(loggedClientId));

    return res.json(result);
  }
}
