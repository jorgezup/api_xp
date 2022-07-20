import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { Stock_Transaction } from "./StockTransaction";

@Entity("stocks")
export class Stock {
  @PrimaryColumn()
  codStock: number;

  @Column({ type: "text", nullable: false })
  name: string;

  @Column({ type: "decimal", precision: 7, scale: 2 })
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => Stock_Transaction,
    (stocks_transactions) => stocks_transactions.account
  )
  stocks_transactions: Stock_Transaction[];

  constructor() {
    if (!this.codStock) {
      this.codStock = Math.floor(100000 + Math.random() * 9000);
    }
  }
}
