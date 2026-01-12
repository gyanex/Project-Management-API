import mongoose, { Schema, Types } from "mongoose";
import { ITask } from "../models/ITask";

const taskSchema = new Schema(
  {
    title: { type: String, required: true, lowercase: true, trim: true },
    status: { type: String, enum: ["TODO", "IN_PROGRESS", "DONE"] },
    projectId: { type: Types.ObjectId, ref: "Project", required: true },
    assignedTo: { type: Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Task = mongoose.model<ITask>("Task", taskSchema);
