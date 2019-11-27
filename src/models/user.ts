import mongoose from "mongoose";
import uuid4 from "uuid/v4";
import { UserType } from "../typings/user";

export interface UserSchema extends UserType, mongoose.Document {
  userId: string;
}

const User = new mongoose.Schema(
  {
    userId: {
      type: String
    },

    firstName: {
      type: String,
      required: true
    },

    lastName: {
      type: String,
      required: true
    },

    username: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    isAdmin: {
      type: Boolean
    },

    isSuper: {
      type: Boolean
    },

    deleted: {
      type: Boolean
    }
  },
  { id: false, timestamps: true }
);

User.pre<UserSchema>("save", function() {
  if (this.isNew) {
    this.userId = uuid4();
  }
});

export default mongoose.model<UserSchema>("User", User);
