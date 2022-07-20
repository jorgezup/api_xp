import { accountTransactionRepository } from "../database/models/repositories/accountTransaction.repository";
import { IAccountTransaction } from "../interfaces/transaction.interface";
import { AccountService } from "./account.service";

export class AccountTransactionService {
  async depositTransaction(transaction: IAccountTransaction) {
    const newTransaction = accountTransactionRepository.create({
      type: transaction.type,
      value: transaction.value,
      account: { id: transaction.accountId },
    });

    await accountTransactionRepository.save(newTransaction);

    return newTransaction;
  }
  async withdrawTransaction(transaction: IAccountTransaction) {
    const accountService = new AccountService();

    const result = await accountService.balance(transaction.codClient);

    if (result instanceof Error) {
      return new Error(result.message);
    }
    if (result.saldo - transaction.value < 0) {
      return new Error("There's not enought money");
    }

    const newTransaction = accountTransactionRepository.create({
      type: transaction.type,
      value: -transaction.value,
      account: { id: transaction.accountId },
    });

    await accountTransactionRepository.save(newTransaction);

    return newTransaction;
  }
}
