import mongoose from "mongoose";
import uuid4 from "uuid/v4";
import { ItemType } from "../typings/items";
import { number, string, boolean } from "@hapi/joi";

export interface ItemSchema extends ItemType, mongoose.Document {
  itemId: string;
}

const Item = new mongoose.Schema(
  {
    ItemId: {
      type: String
    },

    name: {
      type: String,
      required: true
    },

    quantity: {
      type: number,
      required: true
    },

    categoryId: {
      type: string
    },

    price: {
      type: number,
      required: true
    },

    deleted: {
      type: boolean
    }
  },
  { id: false, timestamps: true }
);

Item.pre<ItemSchema>("save", function() {
  if (this.isNew) {
    this.itemId = uuid4();
  }
});

export default mongoose.model<ItemSchema>("Item", Item);
