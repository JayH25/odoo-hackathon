import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import dbConnect from "./database/db.js";
import userRoutes from "./router/userrouter.js";
import ErrorMiddleware from "./middleware/err.js";
import AskQues from "./router/AskQuestion.js";
import AnswerRoutes from "./router/AnswerRoute.js";
dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/question", AskQues);
app.use("/api/v1/question", AnswerRoutes);

app.use(ErrorMiddleware);

dbConnect();

export { app };
