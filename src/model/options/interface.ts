import { Optional } from "sequelize";
import { IQuestion } from "../question/interface";
import { ICategory } from "../category/interface";

export interface IOptions {
  id: string;
  option: string;
  questionId: string;
  question?: IQuestion;
}
export type OptionsCreationAttribute = Omit<
  Optional<IOptions, "question">,
  "id"
>;
