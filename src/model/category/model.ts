import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from "sequelize-typescript";
import { CategoryCreationAttribute, ICategory } from "./interface";
import Question from "../question/model";

@Table({ tableName: "Categories", timestamps: true })
class Category
  extends Model<Category, CategoryCreationAttribute>
  implements ICategory
{
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  })
  public declare id: string;

  @Column(DataType.STRING(255))
  name!: string;

  @HasMany(() => Question, {
    foreignKey: "categoryId",
    onDelete: "cascade",
    as: "questions",
  })
  public questions!: ReturnType<() => Question[]>;

  @CreatedAt
  public declare readonly createdAt: Date;

  @UpdatedAt
  public declare readonly updatedAt: Date;
}

export default Category;
