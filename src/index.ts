import express from "express";
import {} from "express";
import { createConnection } from "typeorm";
import { User } from "./models/user";
import {
  handleUserLogin,
  handleUserSignup,
  authenticateMiddleware
} from "./controllers/user";
import { getStockList, getStock, postStock } from "./controllers/stock";
const app = express();
app.use(express.json(), express.urlencoded());

const port = 8080; // default port to listen

(async () => {
  const connection = await createConnection({
    type: "sqlite",
    database: "temp/sqlitedb.db",
    synchronize: true,
    logging: false,
    entities: ["src/models/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"]
  });

  app.post("/login", handleUserLogin);
  app.post("/signup", handleUserSignup);
  app.route("/stock").get(getStockList);
  app.post("/stock", postStock);
  app.use("/stock/:name", authenticateMiddleware);
  app.get("/stock/:name", getStock);

  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
})();
