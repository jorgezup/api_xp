import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { Account } from "./Account";

@Entity("clients")
export class Client {
  @PrimaryColumn()
  codClient: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  surname: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ type: "text" })
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Account, (account) => account.client)
  account: Account;

  constructor() {
    if (!this.codClient) {
      this.codClient = Math.floor(100000 + Math.random() * 900000);
    }
  }
}
