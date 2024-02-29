import { User } from "@/lib/database/models/users.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { UserI } from "@/lib/types/User.types";
import { generateAccessToken } from "@/lib/jwt";
import { connectToDatabase } from "@/lib/database";
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();
    console.log(email, password);
    const user = await User.findOne({ email: email });
    if (!user) return NextResponse.json({ message: "user not found" });
    if (!user.verified)
      return NextResponse.json({ message: "please verify email first" });
    const passwordMatch = comparePassword(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid email or password" });
    }
    const payload = {
      userId: user._id,
      email: user.email,
    };
    const access_token = await generateAccessToken(payload);
    console.log(access_token, "accesstoken");

    await User.findByIdAndUpdate(user._id, { tokens: { access_token } });

    return NextResponse.json({ message: "LoggedIn Success", access_token });
  } catch (error) {
    console.log(error);
    return null;
  }
};

async function comparePassword(plainPassword: string, hashedPassword: string) {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    console.log(error);
    return false;
  }
}
