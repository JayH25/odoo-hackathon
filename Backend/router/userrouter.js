import express from "express";
import {
  getuser,
  login,
  signup,
  logout,
  updatePassword,
  forgetPassword,
  resetPassword,
} from "../controllers/UserController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getuser);
router.put("/update/password", isAuthenticated, updatePassword);
router.post("/password/forget", forgetPassword);
router.put("/reset/password/:token", resetPassword);

export default router;
