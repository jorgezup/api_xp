import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Client } from "./Client";

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

    @ManyToOne(() => Client, client => client.codClient)
    @JoinColumn({name: 'client_id'})
    client: Client
}