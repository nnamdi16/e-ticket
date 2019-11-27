import mongoose from "mongoose";
import uuid4 from "uuid/v4";
import { TransactionType } from "../typings/transaction";
import { string, number } from "@hapi/joi";

export interface TransactionSchema extends TransactionType, mongoose.Document {
  serviceId: string;
}

const Transaction = new mongoose.Schema(
  {
    serviceId: {
      type: String
    },
    customerId: {
      type: string
    },
    productsId: {
      type: string
    },

    cashierId: {
      type: string
    },

    total: {
      type: number
    }
  },

  { id: false, timestamps: true }
);

Transaction.pre<TransactionSchema>("save", function() {
  if (this.isNew) {
    this.serviceId = uuid4();
  }
});

export default mongoose.model<TransactionSchema>("Transaction", Transaction);
