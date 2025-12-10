// routes/finalExamRoutes.js
import express from "express";
import auth from "../middleware/auth.js";
import {
  createOrUpdateExam,
  getExamForStudent,
  submitExamAnswers,
  getExamByCourseType,     // Admin
  getAllExams,             // Admin
  getStudentResults,       // Admin or Student own
  getStudentExamReview
} from "../controllers/finalExamController.js";

const router = express.Router();

// ADMIN ROUTES
router.post("/:courseType", auth, createOrUpdateExam);        // Create or update exam
router.get("/admin/all", auth, getAllExams);                  // Get all exams
router.get("/admin/:courseType", auth, getExamByCourseType);  // Get one exam (with answers)

// STUDENT ROUTES
router.get("/start/:courseType", auth, getExamForStudent);    // Start exam (questions only)
router.post("/submit/:courseType", auth, submitExamAnswers);  // Submit answers
router.get("/results/my", auth, getStudentResults);           // My results
router.get("/review/my", auth, getStudentExamReview);           // My results



getStudentExamReview
export default router;