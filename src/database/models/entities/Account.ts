import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account_Transaction } from "./AccountTransaction";

@Entity('accounts')
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "integer", unique: true})
    codClient: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => Account_Transaction, transactions => transactions.account)
    transactions: Account_Transaction[]
}