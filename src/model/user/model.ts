import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import { IUser, Role, UserCreationAttribute } from "./interface";

@Table({ tableName: "Users", timestamps: true })
class User extends Model<IUser, UserCreationAttribute> implements IUser {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  })
  public declare id: string;

  @Column(DataType.STRING(255))
  name!: string;

  @Column(DataType.STRING(255))
  email!: string;

  @Column(DataType.STRING(255))
  password!: string;

  @Column(DataType.STRING(255))
  image!: string;

  @Column({ type: DataType.DATE, defaultValue: null })
  emailVerified!: Date | null;

  @Column({ type: DataType.STRING(10), defaultValue: Role.USER })
  role!: Role;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isBlocked!: boolean;

  @CreatedAt
  public declare readonly createdAt: Date;

  @UpdatedAt
  public declare readonly updatedAt: Date;
}
export default User;
