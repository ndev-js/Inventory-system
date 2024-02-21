import { ProductI } from "@/lib/types/Product.types";
import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema<ProductI>({
  name: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  variants: [{ type: Schema.Types.ObjectId, ref: "Variant" }],
  description: { type: String },
  brand: { type: String, required: true },
  product_code: { type: String, required: true, unique: true },
  status: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAT: { type: Date, default: Date.now() },
});

export const Product =
  mongoose.models.Product || mongoose.model<ProductI>("Product", ProductSchema);
