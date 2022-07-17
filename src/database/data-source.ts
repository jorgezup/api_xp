import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from "typeorm";

const port = (process.env.DB_PORT as unknown as number) || undefined;

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["/src/models/entities/*.ts"],
    migrations: ["/src/database/migrations/*.ts"],
})