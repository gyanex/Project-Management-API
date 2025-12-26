import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../models/IUser";

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: [true, "password is required"] },
  role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
  return;
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
