import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account } from "./Account";

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "integer", unique: true})
    codClient: number;

    @Column({type: 'text'})
    name: string;

    @Column({type: 'text'})
    surname: string;

    @Column({type: 'text'})
    email: string;

    @Column({type: 'text'})
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => Account, account => account.client)
    account: Account
}