import mongoose from "mongoose";

const askQuestionSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export default mongoose.model("AskQuestion", askQuestionSchema);
