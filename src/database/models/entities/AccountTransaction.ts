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

    @Column({type: "decimal"})
    value: number;

    @Column({type: "enum", enum: Account_Transaction})
    type: TypeTransaction;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Account, account => account.transactions)
    account: Account
}