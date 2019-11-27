import { Document } from "mongoose";

export interface TransactionType extends Document {
  customerId: number;
  productsId: number;
  cashierId: number;
  total: number;
}
