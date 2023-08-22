import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { IOptions, OptionsCreationAttribute } from "./interface";
import Question from "../question/model";
import Category from "../category/model";
import {
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
} from "sequelize";

@Table({ tableName: "Options", timestamps: true })
class Option
  extends Model<Option, OptionsCreationAttribute>
  implements IOptions
{
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  })
  public declare id: string;

  @ForeignKey(() => Question)
  @Column(DataType.UUID)
  public questionId!: string;

  @BelongsTo(() => Question, {
    foreignKey: "questionId",
    as: "questions",
  })
  public question!: ReturnType<() => Question>;

  @Column({ type: DataType.STRING })
  option!: string;

  @CreatedAt
  public declare readonly createdAt: Date;

  @UpdatedAt
  public declare readonly updatedAt: Date;
}
export default Option;
