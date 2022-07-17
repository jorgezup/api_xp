import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @Column({type: 'timestamp', default: 'now()'})
    created_at: Date;

    @Column({type: 'timestamp', default: 'now()'})
    updated_at: Date

    @OneToMany(() => Account, account => account.client)
    account: Account
}