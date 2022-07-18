import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./Account";

export enum TypeTransaction {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw'
}

@Entity('account_transactions')
export class Account_Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "decimal", precision: 7, scale: 2})
    value: number;

    @Column({type: "enum", enum: TypeTransaction})
    type: TypeTransaction;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Account, account => account.transactions)
    account: Account
}