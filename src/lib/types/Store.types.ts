import { Types } from "mongoose";

export interface StoreI {
  name: string;
  products: Types.ObjectId[];
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
