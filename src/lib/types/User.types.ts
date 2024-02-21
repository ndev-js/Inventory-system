import { Types } from "mongoose";

export interface UserI {
  _id: string;
  email: string;
  password: string;
  full_name: string;
  verified?: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isSuperAdmin: boolean;
  store?: Types.ObjectId;
  tokens: {
    accessToken: string;
  };
}
