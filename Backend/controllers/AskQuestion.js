import { catchAsyncErr } from "../middleware/catchasyncErr.js";
import AskQuestion from "../model/Question.js";

export const askQuestion = catchAsyncErr(async (req, res) => {
  const { title, description, tags, username } = req.body;

  if (!title || !description || !tags || !username) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const askQues = await AskQuestion.create({
    title,
    description,
    tags,
    username,
  });

  if (!askQues) {
    return res.status(500).json({
      success: false,
      message: "Unable to create question",
    });
  }

  res.status(201).json({
    success: true,
    message: "Question posted successfully",
    data: askQues,
  });
});
export const getquestion = catchAsyncErr(async (req, res) => {
  const isQuestion = await AskQuestion.find();
  if (!isQuestion) {
    res.json({
      message: "Fail to fetch ",
    });
  }
  res.json({
    success: true,
    message: isQuestion,
  });
});
