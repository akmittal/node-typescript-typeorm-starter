import express from "express";
import { createConnection } from "typeorm";
import { getCustomerList, postCustomer } from "./controllers/customer";
import { getitemList, postitem } from "./controllers/item";
import { getorderList, postorder } from "./controllers/order";
import { getStock, getStockList, postStock } from "./controllers/stock";
import { authenticateMiddleware, handleUserLogin, handleUserSignup } from "./controllers/user";
const app = express();
app.use(express.json(), express.urlencoded());

const port = process.env.PORT || 3000; // default port to listen

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

  app.route("/customer").get(getCustomerList);
  app.post("/customer", postCustomer);

  app.route("/item").get(getitemList);
  app.post("/item", postitem);

  app.route("/order").get(getorderList);
  app.post("/order", postorder);
  app.use("/stock/:name", authenticateMiddleware);
  app.get("/stock/:name", getStock);

  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
})();
