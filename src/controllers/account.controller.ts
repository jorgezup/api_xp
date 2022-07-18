import { Request, Response } from "express";
import { IAccount } from "../interfaces/account.interface";
import { IAccountTransaction, TypeTransaction } from "../interfaces/transaction.interface";
import { AccountService } from "../services/account.service";
import { AccountTransactionService } from "../services/accountTransaction.service";

export class AccountController {
    async deposit(req: Request, res: Response) {
        const {value} = req.body;

        const transaction: IAccountTransaction = {
            value,
            type: TypeTransaction.DEPOSIT,
            codClient: 847091 //TO-DO: este valor tem que vir da requisição
        }

        const service = new AccountTransactionService()

        const result = await service.depositTransaction(transaction)

        if (result instanceof Error) {
            return res.status(404).json({message: result.message})
        }
        
        return res.json(result)
    }
    async withdraw(req: Request, res: Response) {
        const {value} = req.body;

        const transaction: IAccountTransaction = {
            value, // TO-DO validação
            type: TypeTransaction.WITHDRAW,
            codClient: 847091 //TO-DO: este valor tem que vir da requisição
        }

        const service = new AccountTransactionService()

        const result = await service.withdrawTransaction(transaction)

        if (result instanceof Error) {
            return res.status(500).json({message: result.message})
        }

        return res.json(result)
    }
    async balance(req: Request, res: Response) {
        const codClient: any = req.params.codClient;
        console.log(codClient)

        const service = new AccountService()

        const result = await service.balance(codClient)

        return res.json(result)
    }
}