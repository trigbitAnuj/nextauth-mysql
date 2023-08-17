import { Optional } from "sequelize";
import { ICategory } from "../category/interface";

export interface IQuestion {
  id: string;
  name: string;
  category: ICategory;
  categoryId: string;
}

export type QuestionCreationAttribute = Omit<
  Optional<IQuestion, "category">,
  "id"
>;
