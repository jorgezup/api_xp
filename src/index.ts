import express from "express";

import { AppDataSource } from "./database/data-source";
import { errorMiddleware } from "./middlewares/error.middleware";
import { routes } from "./routes";

const { PORT } = process.env;

AppDataSource.initialize()
  .then(() => {
    const app = express();

    app.use(express.json());

    app.use(routes);

    app.use(errorMiddleware);

    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((error) => console.log("TypeORM initialization error: ", error));
