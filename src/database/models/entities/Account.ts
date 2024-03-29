import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Account_Transaction } from "./AccountTransaction";
import { Client } from "./Client";
import { Stock_Transaction } from "./StockTransaction";

@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Client, (client) => client.account, { eager: true })
  @JoinColumn({ name: "codClient", referencedColumnName: "codClient" })
  client: Client;

  @OneToMany(
    () => Account_Transaction,
    (transactions) => transactions.account,
    { eager: true }
  )
  transactions: Account_Transaction[];

  @OneToMany(
    () => Stock_Transaction,
    (stocks_transactions) => stocks_transactions.account,
    { eager: true }
  )
  stocks_transactions: Stock_Transaction[];
}
