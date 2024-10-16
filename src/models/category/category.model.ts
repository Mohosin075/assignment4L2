import mongoose, { model, Schema } from "mongoose";
import { TCategory } from "./category.interface";

const categorySchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref : 'User'
    },
  },
  {
    timestamps: true,
  }
);

export const Category = model<TCategory>("Category", categorySchema);
