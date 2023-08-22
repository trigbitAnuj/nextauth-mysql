import { HasManyCreateAssociationMixin, Optional } from "sequelize";
import { IQuestion } from "../question/interface";
import { IOptions } from "../options/interface";

export interface ICategory {
  id: string;
  name: string;
  questions: IQuestion[];
}

export type CategoryCreationAttribute = Omit<
  Optional<ICategory, "questions">,
  "id"
>;
