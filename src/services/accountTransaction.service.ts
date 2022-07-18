import { accountRepository } from "../database/models/repositories/account.repository";
import { accountTransactionRepository } from "../database/models/repositories/accountTransaction.repository";
import { IAccountTransaction } from "../interfaces/transaction.interface";
import { AccountService } from "./account.service";

export class AccountTransactionService {
    async depositTransaction(transaction: any) {
        const clientAccount = await accountRepository.find({
            where: {
                client: {codClient: transaction.codClient}
            },
            relations: ['client']
        })

        if (clientAccount.length === 0) {
            return new Error('Client does not exists')
        }
        const newTransaction = accountTransactionRepository.create({
            type: transaction.type,
            value: transaction.value,
            account: clientAccount[0]
        })

        await accountTransactionRepository.save(newTransaction)

        return newTransaction        
    }
    async withdrawTransaction(transaction: IAccountTransaction) {
        console.log(transaction)
        const clientAccount = await accountRepository.find({
            where: {
                client: {codClient: transaction.codClient}
            },
            relations: ['client']
        })

        if (clientAccount.length === 0) {
            return new Error('Client does not exists')
        }

        const accountService = new AccountService()

        const {saldo} = await accountService.balance(transaction.codClient)

        if (saldo - transaction.value < 0) {
            return new Error ("There's not enought money")
        }

        const newTransaction = accountTransactionRepository.create({
            type: transaction.type,
            value: - transaction.value,
            account: clientAccount[0]
        })

        await accountTransactionRepository.save(newTransaction)

        return newTransaction   
    }
}