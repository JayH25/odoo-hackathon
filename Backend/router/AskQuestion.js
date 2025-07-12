import express from "express";
import { askQuestion, getquestion } from "../controllers/AskQuestion.js";
const router = express.Router();
router.post("/askques", askQuestion);
router.get("/getques", getquestion);

export default router;
