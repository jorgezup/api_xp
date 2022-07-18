export enum TypeTransaction {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

export interface IAccountTransaction {
  value: number;
  type: TypeTransaction;
  codClient: number;
}
