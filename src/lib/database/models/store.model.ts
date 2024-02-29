import mongoose, { Types, Schema } from "mongoose";
import { StoreI } from "@/lib/types/Store.types";
const storeSchema = new Schema<StoreI>({
  name: { type: String, required: true },
  owner: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },
  logo: { type: String },
  category: { type: String, required: true },
  website: { type: String },
  products: [{ type: Types.ObjectId, ref: "Product" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
});

export const Store =
  mongoose.models.Store || mongoose.model<StoreI>("Store", storeSchema);
