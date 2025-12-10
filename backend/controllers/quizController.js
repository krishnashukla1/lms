import Quiz from "../models/Quiz.js";
import Progress from "../models/Progress.js";
import Module from "../models/Module.js";
import FinalExam from "../models/FinalExam.js";
import Enrollment from "../models/Enrollment.js";
import mongoose from "mongoose";

// ==================== ADMIN: QUIZ MANAGEMENT ====================

// Create or Update Quiz for a Module (Admin)
export const createQuiz = async (req, res) => {
  try {
    const { moduleId, questions } = req.body;

    if (!moduleId || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "moduleId and valid questions array are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(moduleId)) {
      return res.status(400).json({ message: "Invalid moduleId" });
    }

    const module = await Module.findById(moduleId);
    if (!module) return res.status(404).json({ message: "Module not found" });

    const updatedQuiz = await Quiz.findOneAndUpdate(
      { moduleId },
      { questions },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({
      message: updatedQuiz.moduleId ? "Quiz updated successfully" : "Quiz created successfully",
      quiz: updatedQuiz,
    });
  } catch (err) {
    console.error("createQuiz error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get All Quizzes (Admin)
export const getAllQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("moduleId", "title order courseType");
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Quiz by ID (Admin)
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate("moduleId");
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Quiz (Admin)
export const updateQuiz = async (req, res) => {
  try {
    const { questions } = req.body;
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { questions },
      { new: true }
    );
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json({ message: "Quiz updated", quiz });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Question from Quiz (by index)
export const deleteQuestionFromQuiz = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { index } = req.body;

    if (!mongoose.Types.ObjectId.isValid(moduleId)) {
      return res.status(400).json({ message: "Invalid module ID" });
    }

    const quiz = await Quiz.findOne({ moduleId });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    if (index < 0 || index >= quiz.questions.length) {
      return res.status(400).json({ message: "Invalid question index" });
    }

    quiz.questions.splice(index, 1);
    await quiz.save();

    res.json({ message: "Question deleted", questions: quiz.questions });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Entire Quiz
export const deleteQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json({ message: "Quiz deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ==================== STUDENT: QUIZ ACTIONS ====================

// Get Quiz by Module ID (Student)
export const getQuizByModule = async (req, res) => {
  try {
    const { id: moduleId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(moduleId)) {
      return res.status(400).json({ message: "Invalid module ID" });
    }

    const quiz = await Quiz.findOne({ moduleId }).select("questions");
    if (!quiz) return res.status(404).json({ message: "No quiz found for this module" });

    res.json({
      quizId: quiz._id,
      questions: quiz.questions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Submit & Evaluate Module Quiz
// export const evaluateQuiz = async (req, res) => {
//   try {
//     const { moduleId, answers } = req.body;
//     const studentId = req.user._id;

//     const quiz = await Quiz.findOne({ moduleId });
//     if (!quiz) return res.status(404).json({ message: "Quiz not found" });

//     let score = 0;
//     quiz.questions.forEach((q, i) => {
//       if (String(q.correct) === String(answers[i])) score++;
//     });
//     const total = quiz.questions.length;
//     const passed = score === total;

//     // Get student's active course
//     const enrollment = await Enrollment.findOne({ student: studentId, isActive: true });
//     if (!enrollment) return res.status(403).json({ message: "You are not enrolled in any course" });

//     const courseType = enrollment.courseType;

//     // Update progress
//     let progress = await Progress.findOne({ studentId, courseType });
//     if (!progress) {
//       progress = await Progress.create({ studentId, courseType, completedModules: [], scores: [] });
//     }

//     // Remove old attempt
//     progress.scores = progress.scores.filter(s => s.moduleId?.toString() !== moduleId);

//     // Save new attempt
//     progress.scores.push({ moduleId, score, answers });

//     if (passed && !progress.completedModules.map(id => id.toString()).includes(moduleId)) {
//       progress.completedModules.push(moduleId);

//       // Unlock next module
//       const currentModule = await Module.findById(moduleId);
//       const nextModule = await Module.findOne({
//         courseType,
//         order: currentModule.order + 1,
//       });
//       if (nextModule) progress.unlockedModule = nextModule._id;
//     }

//     await progress.save();

//     res.json({ score, total, passed });
//   } catch (err) {
//     console.error("evaluateQuiz error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };



// Submit & Evaluate Module Quiz — FIXED VERSION
export const evaluateQuiz = async (req, res) => {
  try {
    const { moduleId, answers } = req.body;
    const studentId = req.user._id;

    const quiz = await Quiz.findOne({ moduleId });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // Calculate score
    let score = 0;
    quiz.questions.forEach((q, i) => {
      if (String(q.correct) === String(answers[i])) score++;
    });
    const total = quiz.questions.length;
    const passed = score === total; // You can change to score >= 0.8 * total if you want 80%

    // Get student's active course
    const enrollment = await Enrollment.findOne({ student: studentId, isActive: true });
    if (!enrollment) return res.status(403).json({ message: "You are not enrolled in any course" });

    const courseType = enrollment.courseType;

    // Update progress
    let progress = await Progress.findOne({ studentId, courseType });
    if (!progress) {
      progress = await Progress.create({
        studentId,
        courseType,
        completedModules: [],
        scores: []
      });
    }

    // === KEY CHANGE: Always mark module as completed on submission ===
    const alreadyCompleted = progress.completedModules.map(id => id.toString()).includes(moduleId);

    if (!alreadyCompleted) {
      progress.completedModules.push(moduleId);
    }

    // Always save the score (even if failed)
    progress.scores = progress.scores.filter(s => s.moduleId?.toString() !== moduleId);
    // progress.scores.push({ moduleId, score, answers, passed, attemptedAt: new Date() });

    progress.scores.push({ moduleId, score, total, answers, passed, attemptedAt: new Date() });

    // === Unlock next module (always, since module is now completed) ===
    if (!alreadyCompleted) {
      const currentModule = await Module.findById(moduleId);
      const nextModule = await Module.findOne({
        courseType,
        order: currentModule.order + 1,
      });

      if (nextModule) {
        progress.unlockedModule = nextModule._id;
      }
    }

    await progress.save();

    // Return success
    res.json({
      score,
      total,
      passed,
      message: "Quiz submitted successfully!",
      completed: true // Frontend can use this too
    });

  } catch (err) {
    console.error("evaluateQuiz error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Review Previous Quiz Attempt
// export const reviewQuiz = async (req, res) => {
//   try {
//     const { moduleId } = req.params;
//     const studentId = req.user._id;

//     const quiz = await Quiz.findOne({ moduleId });
//     if (!quiz) return res.status(404).json({ message: "Quiz not found" });

//     const enrollment = await Enrollment.findOne({ student: studentId, isActive: true });
//     if (!enrollment) return res.status(403).json({ message: "Not enrolled" });

//     const progress = await Progress.findOne({ studentId, courseType: enrollment.courseType });
//     if (!progress) return res.status(404).json({ message: "No progress found" });

//     const attempt = progress.scores.find(s => s.moduleId?.toString() === moduleId);
//     if (!attempt) return res.status(404).json({ message: "You haven't attempted this quiz" });

//     const review = quiz.questions.map((q, i) => {
//       const userAnswer = attempt.answers[i];
//       const correctIndex = q.correct;
//       const isCorrect = String(userAnswer) === String(correctIndex);

//       return {
//         question: q.question,
//         options: q.options,
//         correctAnswer: q.options[correctIndex],
//         yourAnswer: userAnswer !== undefined ? q.options[userAnswer] : "Not answered",
//         isCorrect,
//       };
//     });

//     res.json({
//       quizId: quiz._id,
//       moduleId,
//       score: attempt.score,
//       total: quiz.questions.length,
//       passed: attempt.score === quiz.questions.length,
//       review,
//     });
//   } catch (err) {
//     console.error("reviewQuiz error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// routes/quiz.js or wherever it is
export const reviewQuiz = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const studentId = req.user._id;

    // Find quiz
    const quiz = await Quiz.findOne({ moduleId });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // Find enrollment
    const enrollment = await Enrollment.findOne({ student: studentId, isActive: true });
    if (!enrollment) return res.status(403).json({ message: "Not enrolled" });

    // Find progress
    const progress = await Progress.findOne({ studentId, courseType: enrollment.courseType });
    if (!progress) return res.status(404).json({ message: "No progress found" });

    // Find attempt
    const attempt = progress.scores.find(s => s.moduleId?.toString() === moduleId);
    if (!attempt) return res.status(404).json({ message: "You haven't attempted this quiz" });

    // Build review with CORRECT INDEXES
    const review = quiz.questions.map((q, i) => {
      const userAnswerIndex = attempt.answers[i];           // e.g. 0, 1, 2, 3
      const correctIndex = q.correct;                       // e.g. 1 (because it's Number!)
      const isCorrect = userAnswerIndex === correctIndex;

      return {
        question: q.question,
        options: q.options,
        correctAnswerIndex: correctIndex,         // SEND INDEX
        yourAnswerIndex: userAnswerIndex,         // SEND INDEX
        correctAnswer: q.options[correctIndex],
        yourAnswer: userAnswerIndex != null ? q.options[userAnswerIndex] : "Not answered",
        isCorrect,
      };
    });

    res.json({
      moduleId,
      score: attempt.score,
      total: quiz.questions.length,
      passed: attempt.passed || false,
      review,
    });
  } catch (err) {
    console.error("reviewQuiz error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// ==================== FINAL EXAM ====================

// Admin: Create/Update Final Exam
export const createFinalExam = async (req, res) => {
  try {
    const { courseType, questions } = req.body;
    if (!["basic", "intermediate", "advanced"].includes(courseType)) {
      return res.status(400).json({ message: "Invalid courseType" });
    }

    const exam = await FinalExam.findOneAndUpdate(
      { courseType },
      { questions },
      { upsert: true, new: true }
    );

    res.json({ message: "Final exam saved", exam });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Student: Submit Final Exam
export const evaluateFinalExam = async (req, res) => {
  try {
    const { courseType, answers } = req.body;
    const studentId = req.user._id;

    const exam = await FinalExam.findOne({ courseType });
    if (!exam) return res.status(404).json({ message: "Final exam not configured" });

    let score = 0;
    exam.questions.forEach((q, i) => {
      if (String(q.correct) === String(answers[i])) score++;
    });

    const total = exam.questions.length;
    const passed = score >= total * 0.8; // 80% to pass

    await Progress.updateOne(
      { studentId, courseType },
      { finalExamPassed: passed }
    );

    res.json({ score, total, passed, required: Math.ceil(total * 0.8) });
  } catch (err) {
    console.error("Final exam error:", err);
    res.status(500).json({ message: "Server error" });
  }
};