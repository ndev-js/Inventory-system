import { Types } from "mongoose";

export interface StoreI {
  name: string;
  owner: string;
  description: string;
  location: string;
  category: string;
  logo?: string;
  website?: string;
  isActive?: Boolean;
  products?: Types.ObjectId[];
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
