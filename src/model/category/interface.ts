import { Optional } from "sequelize";
import { IQuestion } from "../question/interface";

export interface ICategory {
  id: string;
  name: string;
  questions: IQuestion[];
}

export type CategoryCreationAttribute = Omit<
  Optional<ICategory, "questions">,
  "id"
>;
