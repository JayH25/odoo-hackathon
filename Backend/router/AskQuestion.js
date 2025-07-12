import express from "express";
import { askQuestion } from "../controllers/AskQuestion.js";
const router = express.Router();
router.post("/askques", askQuestion);
export default router;
