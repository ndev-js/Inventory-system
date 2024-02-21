import { Types } from "mongoose";

export interface VariantI {
  product: Types.ObjectId; // Reference to the Product document
  size: string;
  color: string;
  price: number;
  stock_quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
