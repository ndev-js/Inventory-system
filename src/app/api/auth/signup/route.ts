import { connectToDatabase } from "@/lib/database";

import { User } from "@/lib/database/models/users.model";
import { UserI } from "@/lib/types/User.types";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { signJWT } from "@/lib/jwt";
import { compileEmailActivationTemplate, sendMail } from "@/lib/SMTP";

const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectToDatabase();
    const data: Omit<UserI, "_id"> = await req.json();
    console.log(data, "here is data ");
    const hashedPassword: string = await hashPassword(data.password);
    const user = new User({
      full_name: data.full_name,
      email: data.email,
      password: hashedPassword,
      isSuperAdmin: data.isSuperAdmin,
    });
    const newUser = await user.save();
    const jwtUserId = signJWT({
      _id: newUser._id,
    });
    const activationUrl = `${process.env.NEXT_AUTH_URL}/auth/activation/${jwtUserId}`;
    const body = compileEmailActivationTemplate(
      newUser.full_name,
      activationUrl
    );
    await sendMail({
      to: newUser.email,
      subject: "Account Activation",
      body: body,
    });
    delete newUser.password;
    return NextResponse.json({
      message: "user created Successfully",
      user: { newUser },
      account: "email activation link has been shared to your email",
    });
  } catch (error) {
    console.log(error);
  }
};
