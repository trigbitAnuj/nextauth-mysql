import mysql2 from "mysql2";
import { Sequelize } from "sequelize-typescript";
import config from "../../config/config.json";
import Category from "@/model/category/model";
import User from "@/model/user/model";
import Question from "@/model/question/model";
import Option from "@/model/options/model";

const models = {
  Category,
  User,
  Question,
  Option,
};

const dbConfig = config[process.env.NODE_ENV];
const sequelize = new Sequelize({
  ...(dbConfig as any),
  dialectModule: mysql2,
  port: 3306,
  models: Object.values(models),
});

const initDb = async () => {
  try {
    if (!(global as any).dbInit) {
      await sequelize.authenticate();
      console.log("db created successfully");
      await sequelize.sync({ alter: false, hooks: true });
      (global as any).dbInit = true;
    }
  } catch (error) {
    console.log("db init failed");
    throw error;
  }
};

export { sequelize, models, initDb };
