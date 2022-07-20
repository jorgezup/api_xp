import { accountRepository } from "../database/models/repositories/account.repository";

type TransactionResponse = {
  codClient: number;
  saldo: string;
};

export class AccountService {
  async balance(codClient: number) {
    const transactions: TransactionResponse | undefined =
      await accountRepository
        .createQueryBuilder("a")
        .where("a.codClient = :codClient", { codClient })
        .leftJoin("account_transactions", "at2", "a.id =at2.accountId")
        .select("a.codClient")
        .addSelect("ROUND(SUM(at2.value),2)", "saldo")
        .getRawOne();

    if (!transactions) {
      return new Error(`There's no transactions`);
    }

    return {
      ...transactions,
      saldo: Number(transactions.saldo) || 0,
    };
  }
}
