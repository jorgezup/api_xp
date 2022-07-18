import { accountRepository } from "../database/models/repositories/account.repository";
import { IAccountTransaction } from "../interfaces/transaction.interface";

export class AccountService {
    async balance(codClient: number) {
        const [client] = await accountRepository.find({
            select: {
                transactions: {value: true},
                client: {codClient: true}
            }, 
            where:{client: {codClient}},
            relations: ['transactions', 'client']
        })

        const accountBalance = client.transactions.reduce((acc, cur) => acc + Number(cur.value), 0)
        
        const balance = {
            codClient: client.client.codClient,
            saldo: parseFloat(accountBalance.toFixed(2))
        }

        return balance
    }
}