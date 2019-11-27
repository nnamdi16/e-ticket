import { Document } from "mongoose";

export interface UserType extends Document {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;
  isSuper: boolean;
  deleted: boolean;
}
