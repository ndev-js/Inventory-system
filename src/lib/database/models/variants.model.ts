import { VariantI } from "@/lib/types/Variant.types";
import mongoose, { Schema } from "mongoose";

const variantSchema = new Schema<VariantI>({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  size: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  stock_quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Variant =
  mongoose.models.VariantI ||
  mongoose.model<VariantI>("Variant", variantSchema);
