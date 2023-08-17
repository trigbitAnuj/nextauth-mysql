import { Optional } from "sequelize";
import Question from "../question/model";

export interface IOptions {
  id: string;
  option: string;
  questionId: string;
  question?: Question;
}
export type OptionsCreationAttribute = Omit<
  Optional<IOptions, "question">,
  "id"
>;
