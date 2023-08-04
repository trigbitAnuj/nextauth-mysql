import { sequelize } from "@/config/mysql";
import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import type { CreationOptional } from "sequelize";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare email_verified: CreationOptional<Date>;
  declare image: CreationOptional<string>;
  declare password: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false },
    email_verified: { type: DataTypes.DATE, allowNull: true },
    image: { type: DataTypes.STRING, allowNull: true },
    password: { type: DataTypes.STRING },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: "Users" }
);

// interface UserModel
//   extends Model<
//     InferAttributes<UserModel>,
//     InferCreationAttributes<UserModel>
//   > {
//   username: string | null;
//   email: string;
//   password: string;
// }

// const User = sequelize.define<UserModel>("user", {
//   username: { type: DataTypes.STRING },
//   email: { type: DataTypes.STRING },
//   password: { type: DataTypes.STRING },
// });

export { User };
