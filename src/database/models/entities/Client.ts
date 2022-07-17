import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}