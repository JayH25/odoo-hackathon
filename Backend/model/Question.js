import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

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
    answers: [answerSchema], // ✅ Embed the Answer schema
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AskQuestion", askQuestionSchema);
