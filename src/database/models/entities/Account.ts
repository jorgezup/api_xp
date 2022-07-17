import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";

@Entity('accounts')
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "integer", unique: true})
    codClient: number;

    @Column({type: 'timestamp', default: 'now()'})
    created_at: Date;

    @Column({type: 'timestamp', default: 'now()'})
    updated_at: Date

    @ManyToOne(() => Client, client => client.codClient)
    @JoinColumn({name: 'client_id'})
    client: Client
}