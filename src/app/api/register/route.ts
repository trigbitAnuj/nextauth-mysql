import { genSalt, hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/model/userModel";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { username, email, password } = body as {
      username: string;
      email: string;
      password: string;
    };

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // check if user exists

    const user = await User.findOne({ where: { email } });

    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const salt = await genSalt(12);
    const hashedPassword = await hash(password, salt);

    const newUser = await User.create({
      name: username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser, "line 65");

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        savedUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
