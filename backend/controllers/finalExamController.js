// controllers/finalExamController.js
import FinalExam from "../models/FinalExam.js";
import FinalExamAttempt from "../models/FinalExamAttempt.js";
import Enrollment from "../models/Enrollment.js";

// ADMIN: Create or Update Final Exam (one per courseType)
export const createOrUpdateExam = async (req, res) => {
  if (req.role !== "admin") return res.status(403).json({ message: "Admin only" });

  const { courseType } = req.params;
  const { questions } = req.body;

  if (!["basic", "intermediate", "advanced"].includes(courseType)) {
    return res.status(400).json({ message: "Invalid course type" });
  }
  if (!questions || !Array.isArray(questions) || questions.length < 5) {
    return res.status(400).json({ message: "At least 5 questions required" });
  }

  try {
    const exam = await FinalExam.findOneAndUpdate(
      { courseType },
      { courseType, questions },
      { upsert: true, new: true }
    );

    res.json({ message: "Final exam saved successfully", exam });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ADMIN: Get all exams
export const getAllExams = async (req, res) => {
  if (req.role !== "admin") return res.status(403).json({ message: "Admin only" });
  const exams = await FinalExam.find().sort({ courseType: 1 });
  res.json(exams);
};

// ADMIN: Get one exam by courseType (with correct answers)
export const getExamByCourseType = async (req, res) => {
  if (req.role !== "admin") return res.status(403).json({ message: "Admin only" });
  const exam = await FinalExam.findOne({ courseType: req.params.courseType });
  if (!exam) return res.status(404).json({ message: "Exam not created yet" });
  res.json(exam);
};

// STUDENT: Start exam → get questions (without correct answer)
export const getExamForStudent = async (req, res) => {
  if (req.role !== "student") return res.status(403).json({ message: "Students only" });

  const { courseType } = req.params;

  // Check enrollment
  const enrollment = await Enrollment.findOne({
    student: req.user._id,
    courseType,
    isActive: true,
  });
  if (!enrollment) return res.status(403).json({ message: "Not enrolled in this course" });

  // Check if already attempted
  const alreadyAttempted = await FinalExamAttempt.findOne({
    student: req.user._id,
    courseType,
  });
  if (alreadyAttempted) {
    return res.status(400).json({ message: "You have already taken this exam" });
  }

  const exam = await FinalExam.findOne({ courseType });
  if (!exam) return res.status(404).json({ message: "Exam not available yet" });

  // Send only question + options (hide correct answer)
  const safeQuestions = exam.questions.map((q) => ({
    question: q.question,
    options: q.options,
  }));

  res.json({
    courseType,
    totalQuestions: safeQuestions.length,
    questions: safeQuestions,
  });
};

// STUDENT: Submit answers
// export const submitExamAnswers = async (req, res) => {
//   if (req.role !== "student") return res.status(403).json({ message: "Students only" });

//   const { courseType } = req.params;
//   const { answers } = req.body; // array of { questionIndex: 0, selectedOption: 2 }

//   const exam = await FinalExam.findOne({ courseType });
//   if (!exam) return res.status(404).json({ message: "Exam not found" });

//   // Check if already submitted
//   const existing = await FinalExamAttempt.findOne({
//     student: req.user._id,
//     courseType,
//   });
//   if (existing) return res.status(400).json({ message: "Already submitted" });

//   let correctCount = 0;
//   answers.forEach((ans) => {
//     if (exam.questions[ans.questionIndex]?.correct === ans.selectedOption) {
//       correctCount++;
//     }
//   });

//   const score = Math.round((correctCount / exam.questions.length) * 100);
//   const passed = score >= 70; // 70% to pass

//   await FinalExamAttempt.create({
//     student: req.user._id,
//     courseType,
//     answers,
//     score,
//     totalQuestions: exam.questions.length,
//     passed,
//   });

//   res.json({
//     message: "Exam submitted successfully!",
//     score,
//     total: exam.questions.length,
//     correct: correctCount,
//     passed,
//     percentage: score + "%",
//   });
// };


export const submitExamAnswers = async (req, res) => {
  try {
    if (req.role !== "student") {
      return res.status(403).json({ message: "Access denied: Students only" });
    }

    const { courseType } = req.params;
    const { answers, timeUp = false } = req.body; // answers: [{ questionIndex, selectedOption }]

    // Validate input
    if (!Array.isArray(answers)) {
      return res.status(400).json({ message: "Invalid answers format" });
    }

    // Find the exam
    const exam = await FinalExam.findOne({ courseType });
    if (!exam) {
      return res.status(404).json({ message: "Exam not found for this course" });
    }

    // Prevent double submission
    const existingAttempt = await FinalExamAttempt.findOne({
      student: req.user._id,
      courseType,
    });

    if (existingAttempt) {
      return res.status(400).json({ message: "You have already submitted this exam" });
    }

    // Calculate score safely
    let correctCount = 0;
    const totalQuestions = exam.questions.length;

    for (const ans of answers) {
      const questionIndex = ans.questionIndex;
      const selected = ans.selectedOption;

      // Safety checks
      if (
        questionIndex == null || 
        questionIndex < 0 || 
        questionIndex >= totalQuestions
      ) {
        continue; // skip invalid index
      }

      const question = exam.questions[questionIndex];

      // Ensure question has correct answer defined
      if (question && typeof question.correct === "number") {
        if (selected === question.correct) {
          correctCount++;
        }
        // Note: if selected === null → treated as wrong (good!)
      }
    }

    const score = Math.round((correctCount / totalQuestions) * 100);
    const passed = score >= 70;

    // Save attempt
    await FinalExamAttempt.create({
      student: req.user._id,
      courseType,
      answers, // store full answers for review
      score,
      correct: correctCount,
      totalQuestions,
      passed,
      submittedAt: new Date(),
      timeUp, // optional: flag if auto-submitted due to time
    });

    // Success response
    return res.json({
      score,
      correct: correctCount,
      total: totalQuestions,
      passed,
      message: passed ? "Congratulations! You passed the exam 🎉" : "Exam submitted. Better luck next time.",
    });

  } catch (error) {
    console.error("Submit Exam Error:", error);
    return res.status(500).json({ 
      message: "Server error during submission",
      error: error.message 
    });
  }
};


// STUDENT: Get my exam results
export const getStudentResults = async (req, res) => {
  if (req.role !== "student") return res.status(403).json({ message: "Students only" });

  const results = await FinalExamAttempt.find({ student: req.user._id })
    .select("courseType score passed attemptedAt")
    .sort({ attemptedAt: -1 });

  res.json({ results });
};

// STUDENT: Get my final exam detailed review (correct/incorrect count + total)
export const getStudentExamReview = async (req, res) => {
  if (req.role !== "student") {
    return res.status(403).json({ message: "Students only" });
  }

  const attempts = await FinalExamAttempt.find({ 
    student: req.user._id 
  })
  .select("courseType score passed attemptedAt totalQuestions answers")
  .sort({ attemptedAt: -1 });

  if (!attempts || attempts.length === 0) {
    return res.json({ results: [] });
  }

  // Transform to match frontend expectation (same shape as quiz review)
  const results = attempts.map(attempt => ({
    courseType: attempt.courseType,
    score: attempt.score,
    total: attempt.totalQuestions,
    correct: Math.round((attempt.score * attempt.totalQuestions) / 100),
    incorrect: attempt.totalQuestions - Math.round((attempt.score * attempt.totalQuestions) / 100),
    passed: attempt.passed,
    attemptedAt: attempt.attemptedAt,
    // Optional: include questions with user's answers vs correct
    // questions: [...] // you can add later if needed
  }));

  res.json({ results });
};