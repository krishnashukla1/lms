

import express from "express";
import auth from "../middleware/auth.js";
import {
  studentLogin,
  getStudentDashboard,
  getStudentProfile,
  getModulesWithProgress,
  submitQuiz,
  submitAssignment
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/login", studentLogin);
router.get("/dashboard", auth, getStudentDashboard);
router.get("/profile", auth, getStudentProfile);
router.get("/modules", auth, getModulesWithProgress);
router.post("/quiz", auth, submitQuiz);
router.post("/assignment", auth, submitAssignment);

export default router;
