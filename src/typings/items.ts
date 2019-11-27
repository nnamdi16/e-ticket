import { Document } from "mongoose";

export interface ItemType extends Document {
  name: string;
  quantity: number;
  categoryId: number;
  price: number;
  deleted: boolean;
}
