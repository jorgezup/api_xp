export enum TypeTransaction {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
  BUY_STOCK = "buy-stock",
  SELL_STOCK = "sell-stock",
}

export interface IAccountTransaction {
  value: number;
  type: TypeTransaction;
  codClient: number;
  accountId: number;
}
