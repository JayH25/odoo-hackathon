import express from "express";
import { getSingleQuestion, postAnswer } from "../controllers/answer.js";

const router = express.Router();

router.get("/single/:id", getSingleQuestion);
router.post("/answer/:id", postAnswer);

export default router;
