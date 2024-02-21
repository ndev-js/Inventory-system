import { connectToDatabase } from "@/lib/database";
import { User } from "@/lib/database/models/users.model";
import { verifyJWT } from "@/lib/jwt";
import { UserI } from "@/lib/types/User.types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { jwt: string } }
) => {
  const { jwt } = params;
  try {
    connectToDatabase();
    const payload = verifyJWT(jwt)!;
    const userId = payload._id;
    const activateUser = await User.findOne({ _id: userId });
    if (!activateUser) return NextResponse.json({ message: "user not exist" });
    if (activateUser.verified)
      return NextResponse.json({ message: "user already activated" });
    const result = await User.findByIdAndUpdate(userId, { verified: true });

    return NextResponse.json({
      message: "successfully activetd user",
      user: result,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
