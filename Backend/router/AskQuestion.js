import express from "express";
import { askQuestion, getquestion } from "../controllers/AskQuestion.js";

const router = express.Router();

router.post("/ask", askQuestion); // POST /api/v1/question/ask
router.get("/getques", getquestion);

export default router;
