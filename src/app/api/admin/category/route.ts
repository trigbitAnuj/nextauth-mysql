import { models } from "@/config/mysql";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { name }: { name: string } = body;
  console.log(name);
  try {
    const newCategory = await models.Category.create({
      name: name,
    });

    console.log(newCategory);

    const savedCategory = await newCategory.save();

    return NextResponse.json(
      {
        message: "Category created successfully",
        success: true,
        data: { savedCategory },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
