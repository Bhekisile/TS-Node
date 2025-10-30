import { Schema, Model, model } from "mongoose";
import { ITask } from "./task.interface";

const TaskSchema: Schema<ITask> = new Schema({
  title: {
    type: String,
    required: [true, "Task title is required"],
    maxLength: [100, "Task title cannot exceed 100 characters"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Task description is required"],
    maxLength: [500, "Task description cannot exceed 500 characters"],
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["todo", "inProgress", "completed"],
    default: "todo",
  },
  priority: {
    type: String,
    required: true,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  dueDate: {
    type: Date,
    required: false,
  }
}, 
{
  timestamps: true,
}
);

export const Task: Model<ITask> = model("Task", TaskSchema);