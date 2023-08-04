import { User } from "@/model/userModel";
import bcryptjs from "bcryptjs";

export const loginUser = async (email: string, password: string) => {
  if (email === "" || password === "") {
    return { message: "Provide email or password" };
  }

  const user = await User.findOne({
    where: { email },
  });
  if (!user) {
    return { message: "User not Found" };
  }
  const validPassword = await bcryptjs.compare(password, user.password);
  if (!validPassword) {
    return {
      message: "invalid Password",
    };
  }
  return { message: "login Successfull", user: user };
};
