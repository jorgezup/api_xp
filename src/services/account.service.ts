import { accountRepository } from "../database/models/repositories/account.repository";

export class AccountService {
  async balance(codClient: number) {
    // const [client] = await accountRepository.find({
    //   select: {
    //     transactions: { value: true },
    //     client: { codClient: true },
    //   },
    //   where: { client: { codClient } },
    //   relations: ["transactions", "client"],
    // });

    const client = await accountRepository.findOneBy({ client: { codClient } });

    if (!client) {
      return new Error("Client not found");
    }

    const transactions = await accountRepository
      .createQueryBuilder("a")
      .where("a.codClient = :codClient", { codClient })
      .leftJoin("account_transactions", "at2", "a.id =at2.accountId")
      .select("a.codClient")
      .addSelect("SUM(at2.value)", "saldo")
      .getRawOne();

    // const accountBalance = () =>
    //   client?.transactions.reduce((acc, cur) => acc + Number(cur.value), 0);

    // const balance = {
    //   codClient: client.client.codClient,
    //   saldo: client.transactions ? Number(accountBalance().toFixed(2)) : 0,
    // };

    return {
      ...transactions,
      saldo: Number(transactions.saldo) || 0,
    };
  }
}
