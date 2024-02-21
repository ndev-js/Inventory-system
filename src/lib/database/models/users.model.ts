import { UserI } from "@/lib/types/User.types";
import mongoose, { Document, Schema, Types } from "mongoose";

const userSchema = new Schema<UserI>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  full_name: { type: String, required: true },
  verified: { type: Boolean, default: false },
  verificationToken: { type: String },
  resetPasswordToken: { type: String },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isSuperAdmin: { type: Boolean, default: false },
  store: { type: Types.ObjectId, ref: "Store" },
  tokens: { type: Object, default: null },
});

export const User =
  mongoose.models.User || mongoose.model<UserI>("User", userSchema);
