import { CategoryI } from "@/lib/types/Category.types";
import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema<CategoryI>({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Category =
  mongoose.models.Category ||
  mongoose.model<CategoryI>("Category", categorySchema);
