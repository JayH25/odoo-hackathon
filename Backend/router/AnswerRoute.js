import express from "express";
import {
  getSingleQuestion,
  postAnswer,
  upvoteAnswer,
} from "../controllers/answer.js";

const router = express.Router();

router.get("/single/:id", getSingleQuestion);
router.post("/answer/:id", postAnswer);
router.post("/upvote/:id/:answerIndex", upvoteAnswer);

export default router;
