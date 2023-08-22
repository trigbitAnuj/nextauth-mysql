import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import { IQuestion, QuestionCreationAttribute } from "./interface";
import Category from "../category/model";
import Option from "../options/model";
import {
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
} from "sequelize";

@Table({ tableName: "Question", timestamps: true })
class Question
  extends Model<Question, QuestionCreationAttribute>
  implements IQuestion
{
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  })
  public declare id: string;

  @Column(DataType.STRING(255))
  name!: string;

  @ForeignKey(() => Category)
  @Column(DataType.UUID)
  public categoryId!: string;

  @HasMany(() => Option, {
    foreignKey: "questionId",
    onDelete: "cascade",
    as: "options",
  })
  public options!: ReturnType<() => Option[]>;

  declare createOptions: HasManyCreateAssociationMixin<Option, "questionId">;
  declare getOptions: HasManyGetAssociationsMixin<Option>;

  @BelongsTo(() => Category, {
    foreignKey: "categoryId",
    as: "category",
  })
  public category!: ReturnType<() => Category>;

  declare createCategory: BelongsToCreateAssociationMixin<Category>;
  declare getCaegory: BelongsToGetAssociationMixin<Category>;

  @CreatedAt
  public declare readonly createdAt: Date;

  @UpdatedAt
  public declare readonly updatedAt: Date;
}

export default Question;
