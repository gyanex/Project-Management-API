import mongoose, { Schema, Types } from "mongoose";
import { IProject } from "../models/IProject";

const projectSchema = new Schema(
  {
    name: { type: String, require: true, trim: true },
    description: { type: String, trim: true },
    owner: { type: Types.ObjectId, ref: "User", require: true },
    members: [{ type: Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>("Project", projectSchema);
