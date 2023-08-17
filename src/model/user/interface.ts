import { AdapterUser } from "next-auth/adapters";
import { Optional } from "sequelize";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IUser extends AdapterUser {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  image?: string;
  password: string;
  isBlocked?: boolean;
  role: Role;
}

export type UserCreationAttribute = Omit<
  Optional<IUser, "emailVerified" | "image" | "isBlocked">,
  "id"
>;
