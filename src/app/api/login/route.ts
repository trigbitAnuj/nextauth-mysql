import { User } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export const POST = async (req: NextRequest) => {
  const resBody = await req.json();
  try {
    const { email, password } = resBody;
    if (email === "" || password === "") {
      return NextResponse.json(
        { message: "Provide email or password" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      where: { email },
    });
    console.log(user);

    if (!user) {
      return NextResponse.json({ message: "User not Found" }, { status: 401 });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "invalid Password or email" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "login Successfull", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid Server Response" },
      { status: 500 }
    );
  }
};
