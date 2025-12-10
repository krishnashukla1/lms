

import express from "express";
import auth from "../middleware/auth.js";
import { createQuiz, getAllQuiz, evaluateQuiz, getQuizByModule, getQuizById, updateQuiz, deleteQuestionFromQuiz,deleteQuizById ,reviewQuiz} from "../controllers/quizController.js";

const router = express.Router();

// Create quiz (admin)
router.post("/", auth, createQuiz);

// Get all quizzes (admin)
router.get("/all", auth, getAllQuiz);

// Get single quiz by ID (admin)
router.get("/:id", auth, getQuizById);

// Update quiz by ID (admin)
router.put("/:id", auth, updateQuiz);

// Delete single question by index (admin) - using PUT since it modifies the array
router.put("/delete-question/:moduleId", auth, deleteQuestionFromQuiz);

// Evaluate quiz (student)
router.post("/evaluate", auth, evaluateQuiz);

// Get quiz by module ID (shared)
router.get("/by-module/:id", auth, getQuizByModule);

// Delete entire quiz
router.delete("/:id", auth, deleteQuizById);

router.get('/review/:moduleId', auth, reviewQuiz);


export default router;