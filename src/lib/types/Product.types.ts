import { Types } from "mongoose";

export interface ProductI {
  name: string;
  category: Types.ObjectId;
  variants: Types.ObjectId[];
  description: string;
  brand: string;
  product_code: string;
  status: boolean;
  createdAt: Date;
  updatedAT: Date;
}
