import mysql2 from "mysql2";
import { Sequelize } from "sequelize";
import config from "../../config/config.json";

const dbConfig = config[process.env.NODE_ENV];
const sequelize = new Sequelize({
  ...(dbConfig as any),
  dialectModule: mysql2,
  port: 3306,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error: Error) => {
    console.error("Unable to connect to the database:", error);
  });
export { sequelize };
