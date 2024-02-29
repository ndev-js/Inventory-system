import { connectToDatabase } from "@/lib/database";

import { User } from "@/lib/database/models/users.model";
import { UserI } from "@/lib/types/User.types";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { compileEmailActivationTemplate, sendMail } from "@/lib/SMTP";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectToDatabase();
    let imageUrl;
    console.log(req, "req");
    const data: any = await req.formData();
    console.log(data, "here is data ");
    let fullName: string | undefined;
    let email: string | undefined;
    let password: string | undefined;
    let isSuperAdmin: boolean | undefined;
    let imageFile: File | undefined;
    for (const [key, value] of data.entries()) {
      if (key === "full_name") {
        fullName = value as string;
      } else if (key === "email") {
        email = value as string;
      } else if (key === "password") {
        password = value as string;
      } else if (key === "isSuperAdmin") {
        isSuperAdmin = value === "true";
      } else if (key === "image") {
        imageFile = value as File;
      }
    }
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Is Super Admin:", isSuperAdmin);
    console.log("Image File:", imageFile);
    // const hashedPassword: string = await hashPassword(data.password);
    if (imageFile) {
      console.log(data.formData, "---------");
      console.log(data.image, "p--------");
      // imageUrl = await uploadImageToCloudinary(data.image);
      // console.log(imageUrl, "hello world");
    }
    // const user = new User({
    //   full_name: data.full_name,
    //   email: data.email,
    //   password: hashedPassword,
    //   isSuperAdmin: data.isSuperAdmin,
    // });

    // const newUser = await user.save();
    // const jwtUserId = signJWT({
    //   _id: newUser._id,
    // });
    // const activationUrl = `${process.env.NEXT_AUTH_URL}/auth/activation/${jwtUserId}`;
    // const body = compileEmailActivationTemplate(
    //   newUser.full_name,
    //   activationUrl
    // );
    // await sendMail({
    //   to: newUser.email,
    //   subject: "Account Activation",
    //   body: body,
    // });
    // delete newUser.password;
    return NextResponse.json({
      message: "user created Successfully",
      // user: { newUser },
      account: "email activation link has been shared to your email",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
};
