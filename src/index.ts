import express from "express";
import { AppDataSource } from "./database/data-source";

const PORT = process.env.PORT

AppDataSource.initialize().then(() => {
    const app = express()

    app.use(express.json())

    app.listen(PORT, () => {console.log(`Server is running on ${PORT}`)})
}).catch((error) => console.log("TypeORM initialization error: ", error))