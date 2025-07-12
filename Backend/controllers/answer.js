import AskQuestion from "../model/Question.js";
import { catchAsyncErr } from "../middleware/catchasyncErr.js";

export const getSingleQuestion = catchAsyncErr(async (req, res) => {
  const question = await AskQuestion.findById(req.params.id);
  if (!question) {
    return res
      .status(404)
      .json({ success: false, message: "Question not found" });
  }
  res.status(200).json({ success: true, question });
});

export const postAnswer = catchAsyncErr(async (req, res) => {
  const { anstext, username } = req.body;
  const question = await AskQuestion.findById(req.params.id);

  if (!question) {
    return res
      .status(404)
      .json({ success: false, message: "Question not found" });
  }

  question.answers.push({ anstext, username, questiontext: question.title });
  await question.save();

  res
    .status(201)
    .json({ success: true, message: "Answer submitted", data: question });
});
export const upvoteAnswer = catchAsyncErr(async (req, res) => {
  const { id, answerIndex } = req.params;
  const { username } = req.body;

  const question = await AskQuestion.findById(id);
  if (!question) {
    return res
      .status(404)
      .json({ success: false, message: "Question not found" });
  }

  const answer = question.answers[answerIndex];
  if (!answer) {
    return res
      .status(404)
      .json({ success: false, message: "Answer not found" });
  }

  if (answer.voters.includes(username)) {
    return res.status(400).json({
      success: false,
      message: "You have already upvoted this answer",
    });
  }

  answer.votes += 1;
  answer.voters.push(username);

  await question.save();

  res
    .status(200)
    .json({ success: true, message: "Upvoted successfully", data: question });
});
