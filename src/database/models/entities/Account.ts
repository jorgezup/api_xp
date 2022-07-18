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

@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Client, (client) => client.account)
  @JoinColumn({ name: "codClient", referencedColumnName: "codClient" })
  client: Client;

  @OneToMany(() => Account_Transaction, (transactions) => transactions.account)
  transactions: Account_Transaction[];
}
