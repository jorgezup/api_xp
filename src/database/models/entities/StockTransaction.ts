import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Account } from "./Account";
import { Stock } from "./Stock";

export enum TypeStockTransaction {
  BUY = "buy",
  SELL = "sell",
}

@Entity("stocks_transactions")
export class Stock_Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "decimal", precision: 7, scale: 2 })
  value: number;

  @Column({ type: "enum", enum: TypeStockTransaction })
  type: TypeStockTransaction;

  @Column({ type: "integer" })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Stock, (stock) => stock.stocks_transactions, { eager: true })
  @JoinColumn({ name: "codStock", referencedColumnName: "codStock" })
  stock: Stock;

  @ManyToOne(() => Account, (account) => account.stocks_transactions)
  account: Account;
}
