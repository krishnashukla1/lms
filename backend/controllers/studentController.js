import Student from "../models/Student.js";
import Module from "../models/Module.js";
import Progress from "../models/Progress.js";
import Quiz from "../models/Quiz.js";
import FinalAssignment from "../models/Assignment.js";
import Enrollment from "../models/Enrollment.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ===========================================================
   STUDENT LOGIN
=========================================================== */
// export const studentLogin = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const student = await Student.findOne({ username });
//     if (!student) return res.status(400).json({ message: "Student not found" });

//     const match = await bcrypt.compare(password, student.password);
//     if (!match) return res.status(400).json({ message: "Wrong password" });

//     const token = jwt.sign(
//       { id: student._id, role: "student" },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       student: {
//         id: student._id,
//         name: student.name,
//         username: student.username,
//       },
//     });
//   } catch (error) {
//     console.error("Student Login Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };




export const studentLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const student = await Student.findOne({ username });
    if (!student) return res.status(400).json({ message: "Student not found" });

    const match = await bcrypt.compare(password, student.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: student._id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      student: {
        id: student._id,
        name: student.name,
        username: student.username,
        role: "student",
      },
    });
  } catch (error) {
    console.error("Student Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/* ===========================================================
   GET STUDENT PROFILE
=========================================================== */
export const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id).select("-password");
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ===========================================================
   GET MODULES + PROGRESS (FOR CURRENT ENROLLED COURSE ONLY)
=========================================================== */
export const getModulesWithProgress = async (req, res) => {
  try {
    const studentId = req.user._id;

    // Find active enrollment
    const enrollment = await Enrollment.findOne({ student: studentId, isActive: true });
    if (!enrollment) {
      return res.status(403).json({ message: "You are not enrolled in any course" });
    }

    const courseType = enrollment.courseType;

    // Get modules & progress for this course only
    const modules = await Module.find({ courseType }).sort({ order: 1 });
    const progress = await Progress.findOne({ studentId, courseType });

    res.json({
      courseType,
      modules,
      progress: progress || { completedModules: [], scores: [], finalExamPassed: false, finalAssignmentSubmitted: false },
    });
  } catch (error) {
    console.error("getModulesWithProgress error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===========================================================
   SUBMIT QUIZ (MODULE QUIZ)
=========================================================== */
export const submitQuiz = async (req, res) => {
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
    const passed = score === total;

    // Find enrollment to get courseType
    const enrollment = await Enrollment.findOne({ student: studentId, isActive: true });
    if (!enrollment) return res.status(403).json({ message: "Not enrolled" });
    const courseType = enrollment.courseType;

    // Update progress
    let progress = await Progress.findOne({ studentId, courseType });
    if (!progress) {
      progress = await Progress.create({
        studentId,
        courseType,
        completedModules: [],
        scores: [],
      });
    }

    // Remove old score
    progress.scores = progress.scores.filter(s => s.moduleId.toString() !== moduleId);

    // Save new score
    // progress.scores.push({ moduleId, score, answers });

    progress.scores.push({
      moduleId,
      score,
      total,        // ← ADD THIS
      answers,
      passed,
      attemptedAt: new Date()
    });

    if (passed) {
      if (!progress.completedModules.includes(moduleId)) {
        progress.completedModules.push(moduleId);
      }

      // Unlock next module
      const currentModule = await Module.findById(moduleId);
      const nextModule = await Module.findOne({
        courseType,
        order: currentModule.order + 1,
      });
      if (nextModule) progress.unlockedModule = nextModule._id;
    }

    await progress.save();

    res.json({ score, total, passed, unlockedModule: progress.unlockedModule });
  } catch (error) {
    console.error("submitQuiz error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===========================================================
   STUDENT DASHBOARD (BEST VERSION)
=========================================================== */
// export const getStudentDashboard = async (req, res) => {
//   try {
//     const studentId = req.user._id;

//     const enrollment = await Enrollment.findOne({ student: studentId, isActive: true });
//     if (!enrollment) {
//       return res.json({ message: "Not enrolled in any course", modules: [] });
//     }

//     const courseType = enrollment.courseType;

//     const [modules, progress, quizzes] = await Promise.all([
//       Module.find({ courseType }).sort({ order: 1 }).lean(),
//       Progress.findOne({ studentId, courseType }).lean(),
//       Quiz.find({ moduleId: { $in: await Module.find({ courseType }).distinct("_id") } }).lean(),
//     ]);

//     const quizMap = Object.fromEntries(quizzes.map(q => [q.moduleId.toString(), true]));
//     const completedSet = new Set((progress?.completedModules || []).map(id => id.toString()));

//     let nextUnlockId = null;
//     for (const mod of modules) {
//       if (!completedSet.has(mod._id.toString())) {
//         nextUnlockId = mod._id.toString();
//         break;
//       }
//     }

//     // const dashboardModules = modules.map(mod => ({
//     //   ...mod,
//     //   completed: completedSet.has(mod._id.toString()),
//     //   unlocked: mod._id.toString() === nextUnlockId,
//     //   hasQuiz: !!quizMap[mod._id.toString()],
//     // }));

//     const dashboardModules = modules.map(mod => {
//       const modIdStr = mod._id.toString();
//       const scoreEntry = progress?.scores?.find(s => s.moduleId?.toString() === modIdStr);

//       return {
//         ...mod,
//         completed: completedSet.has(modIdStr),
//         unlocked: modIdStr === nextUnlockId,
//         hasQuiz: !!quizMap[modIdStr],
//         score: scoreEntry?.score ?? null,
//         total: scoreEntry?.total ?? null,
//       };
//     });

//     const completedCount = completedSet.size;
//     const percentage = modules.length > 0 ? Math.round((completedCount / modules.length) * 100) : 0;

//     res.json({
//       courseType,
//       student: { name: req.user.name },
//       modules: dashboardModules,
//       progress: {
//         percentage,
//         completed: completedCount,
//         total: modules.length,
//         finalExamPassed: progress?.finalExamPassed || false,
//         finalAssignmentSubmitted: progress?.finalAssignmentSubmitted || false,
//       },
//     });
//   } catch (err) {
//     console.error("Dashboard Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };






// export const getStudentDashboard = async (req, res) => {
//   try {
//     const studentId = req.user._id;

//     // Define course order for sequential unlocking
//     const courseOrder = ["basic", "intermediate", "advanced"];

//     // Fetch all modules, progresses, and quizzes (no courseType filter)
//     const [allModules, progresses, quizzes] = await Promise.all([
//       Module.find({}).sort({ order: 1 }).lean(),
//       Progress.find({ studentId }).lean(),
//       Quiz.find({}).lean(),
//     ]);

//     // Maps for quick lookup
//     const progressMap = Object.fromEntries(progresses.map((p) => [p.courseType, p]));
//     const quizMap = Object.fromEntries(quizzes.map((q) => [q.moduleId.toString(), true]));

//     // Group modules by courseType
//     const groupedModules = allModules.reduce((acc, mod) => {
//       if (!acc[mod.courseType]) acc[mod.courseType] = [];
//       acc[mod.courseType].push(mod);
//       return acc;
//     }, {});

//     // Determine if each course is unlocked (sequential: previous must be fully completed)
//     const courseUnlocked = {};
//     let previousCompleted = true; // Basic always unlocked
//     for (const course of courseOrder) {
//       const prog = progressMap[course] || { completedModules: [] };
//       const totalInCourse = groupedModules[course]?.length || 0;
//       const completedInCourse = prog.completedModules.length;
//       const isCourseCompleted = completedInCourse === totalInCourse;
//       courseUnlocked[course] = previousCompleted;
//       previousCompleted = isCourseCompleted;
//     }

//     // Build dashboardModules (flat array) with per-module status
//     const dashboardModules = allModules.map((mod) => {
//       const modIdStr = mod._id.toString();
//       const prog = progressMap[mod.courseType] || { completedModules: [], scores: [] };
//       const scoreEntry = prog.scores?.find((s) => s.moduleId.toString() === modIdStr) || {};
//       const completed = prog.completedModules.some((id) => id.toString() === modIdStr);

//       // If course not unlocked, module is locked
//       if (!courseUnlocked[mod.courseType]) {
//         return {
//           ...mod,
//           completed,
//           unlocked: false,
//           hasQuiz: !!quizMap[modIdStr],
//           score: scoreEntry.score ?? null,
//           total: scoreEntry.total ?? null,
//         };
//       }

//       // For unlocked course, unlock the next incomplete module
//       const courseMods = groupedModules[mod.courseType] || [];
//       const completedSet = new Set(prog.completedModules.map((id) => id.toString()));
//       let isNextUnlock = false;
//       for (const cm of courseMods.sort((a, b) => a.order - b.order)) {
//         if (!completedSet.has(cm._id.toString())) {
//           isNextUnlock = cm._id.toString() === modIdStr;
//           break;
//         }
//       }

//       return {
//         ...mod,
//         completed,
//         unlocked: isNextUnlock,
//         hasQuiz: !!quizMap[modIdStr],
//         score: scoreEntry.score ?? null,
//         total: scoreEntry.total ?? null,
//       };
//     });

//     // Overall progress (across all courses)
//     const totalModules = allModules.length;
//     const completedCount = progresses.reduce((sum, p) => sum + p.completedModules.length, 0);
//     const percentage = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

//     res.json({
//       student: { name: req.user.name, username: req.user.username },
//       modules: dashboardModules,
//       progressPercentage: percentage,
//     });
//   } catch (err) {
//     console.error("Dashboard Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };





// export const getStudentDashboard = async (req, res) => {
//   try {
//     const studentId = req.user._id;

//     const courseOrder = ["basic", "intermediate", "advanced"];

//     const [allModules, progresses, quizzes] = await Promise.all([
//       Module.find({}).sort({ courseType: 1, order: 1 }).lean(),
//       Progress.find({ studentId }).lean(),
//       Quiz.find({}).lean(),
//     ]);

//     const progressMap = Object.fromEntries(
//       progresses.map(p => [p.courseType, p])
//     );

//     const quizMap = Object.fromEntries(
//       quizzes.map(q => [q.moduleId.toString(), true])
//     );

//     // Group modules by courseType
//     const grouped = allModules.reduce((acc, mod) => {
//       if (!acc[mod.courseType]) acc[mod.courseType] = [];
//       acc[mod.courseType].push(mod);
//       return acc;
//     }, {});

//     // Determine which courses are unlocked
//     const courseUnlocked = {};
//     let canUnlockNext = true; // Basic is always visible

//     for (const course of courseOrder) {
//       const modsInCourse = grouped[course] || [];
//       const prog = progressMap[course] || { completedModules: [] };
//       const completedCount = prog.completedModules?.length || 0;

//       // Course is unlocked if: it's basic OR previous course was fully completed
//       // courseUnlocked[course] = canUnlockNext;
//       courseUnlocked[course] = true; // Always visible, but modules stay locked until previous done

//       // Next course can be unlocked only if THIS course is 100% done
//       canUnlockNext = completedCount === modsInCourse.length && modsInCourse.length > 0;
//     }

//     // Build final modules list
//     const dashboardModules = allModules.map(mod => {
//       const modIdStr = mod._id.toString();
//       const prog = progressMap[mod.courseType] || { completedModules: [], scores: [] };
//       const isCompleted = prog.completedModules?.some(id => id.toString() === modIdStr) || false;
//       const scoreEntry = prog.scores?.find(s => s.moduleId?.toString() === modIdStr);

//       // If course is not unlocked → all modules locked
//       if (!courseUnlocked[mod.courseType]) {
//         return {
//           ...mod,
//           unlocked: false,
//           completed: isCompleted,
//           hasQuiz: !!quizMap[modIdStr],
//           score: scoreEntry?.score ?? null,
//           total: scoreEntry?.total ?? null,
//         };
//       }

//       // Course is unlocked → find the "next" module to highlight
//       const courseMods = grouped[mod.courseType];
//       const completedSet = new Set(prog.completedModules?.map(id => id.toString()) || []);

//       let isNext = false;
//       for (const m of courseMods) {
//         if (!completedSet.has(m._id.toString())) {
//           isNext = m._id.toString() === modIdStr;
//           break;
//         }
//       }

//       return {
//         ...mod,
//         unlocked: isNext || isCompleted, // completed ones stay unlocked
//         completed: isCompleted,
//         hasQuiz: !!quizMap[modIdStr],
//         score: scoreEntry?.score ?? null,
//         total: scoreEntry?.total ?? null,
//       };
//     });

//     // Overall progress
//     const totalModules = allModules.length;
//     const totalCompleted = Object.values(progressMap).reduce(
//       (sum, p) => sum + (p.completedModules?.length || 0),
//       0
//     );
//     const percentage = totalModules > 0 ? Math.round((totalCompleted / totalModules) * 100) : 0;

//     res.json({
//       student: {
//         name: req.user.name,
//         username: req.user.username,
//       },
//       modules: dashboardModules,
//       progressPercentage: percentage,
//     });
//   } catch (err) {
//     console.error("Dashboard Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };



export const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user._id;

    const courseOrder = ["basic", "intermediate", "advanced"];

    const [allModules, progresses, quizzes] = await Promise.all([
      Module.find({}).sort({ courseType: 1, order: 1 }).lean(),
      Progress.find({ studentId }).lean(),
      Quiz.find({}).lean(),
    ]);

    const progressMap = Object.fromEntries(
      progresses.map(p => [p.courseType, p])
    );

    const quizMap = Object.fromEntries(
      quizzes.map(q => [q.moduleId.toString(), true])
    );

    // Group modules by courseType
    const grouped = allModules.reduce((acc, mod) => {
      if (!acc[mod.courseType]) acc[mod.courseType] = [];
      acc[mod.courseType].push(mod);
      return acc;
    }, {});

    // Determine which courses are unlocked
    const courseUnlocked = {};
    let canUnlockNext = true;

    for (const course of courseOrder) {
      const modsInCourse = grouped[course] || [];
      const prog = progressMap[course] || { completedModules: [] };
      const completedCount = prog.completedModules?.length || 0;

      courseUnlocked[course] = true; // always visible

      canUnlockNext =
        completedCount === modsInCourse.length && modsInCourse.length > 0;
    }

    // Build final modules list
    const dashboardModules = allModules.map(mod => {
      const modIdStr = mod._id.toString();
      const prog =
        progressMap[mod.courseType] || { completedModules: [], scores: [] };

      const isCompleted =
        prog.completedModules?.some(id => id.toString() === modIdStr) || false;

      const scoreEntry = prog.scores?.find(
        s => s.moduleId?.toString() === modIdStr
      );

      if (!courseUnlocked[mod.courseType]) {
        return {
          ...mod,
          unlocked: false,
          completed: isCompleted,
          hasQuiz: !!quizMap[modIdStr],
          score: scoreEntry?.score ?? null,
          total: scoreEntry?.total ?? null,
        };
      }

      const courseMods = grouped[mod.courseType];
      const completedSet = new Set(
        prog.completedModules?.map(id => id.toString()) || []
      );

      let isNext = false;
      for (const m of courseMods) {
        if (!completedSet.has(m._id.toString())) {
          isNext = m._id.toString() === modIdStr;
          break;
        }
      }

      return {
        ...mod,
        unlocked: isNext || isCompleted,
        completed: isCompleted,
        hasQuiz: !!quizMap[modIdStr],
        score: scoreEntry?.score ?? null,
        total: scoreEntry?.total ?? null,
      };
    });

    const totalModules = allModules.length;
    const totalCompleted = Object.values(progressMap).reduce(
      (sum, p) => sum + (p.completedModules?.length || 0),
      0
    );

    const percentage =
      totalModules > 0
        ? Math.round((totalCompleted / totalModules) * 100)
        : 0;

    res.json({
      student: {
        name: req.user.name || "Not available",
        username: req.user.username || "Not available",
      },
      modules: dashboardModules,
      progressPercentage: percentage,
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



/* ==================== SUBMIT FINAL ASSIGNMENT (THIS WAS MISSING!) ==================== */
export const submitAssignment = async (req, res) => {
  try {
    if (req.role !== "student") {
      return res.status(403).json({ message: "Only students can submit" });
    }

    const studentId = req.user._id;
    const file = req.file;               // from multer
    const { courseType } = req.body;     // student sends courseType

    if (!file || !courseType) {
      return res.status(400).json({ message: "File and courseType are required" });
    }

    // Check enrollment
    const enrollment = await Enrollment.findOne({ student: studentId, courseType, isActive: true });
    if (!enrollment) return res.status(403).json({ message: "You are not enrolled in this course" });

    // Prevent duplicate submission
    const already = await FinalAssignment.findOne({ student: studentId, courseType });
    if (already) return res.status(400).json({ message: "You have already submitted the final assignment" });

    // Save assignment
    await FinalAssignment.create({
      student: studentId,
      courseType,
      studentName: req.user.name || req.user.username,
      fileName: file.originalname,
      file: file.buffer,
      contentType: file.mimetype,
      size: file.size,
    });

    // Mark as submitted in progress
    await Progress.updateOne(
      { studentId, courseType },
      { finalAssignmentSubmitted: true }
    );

    res.json({ message: "Final assignment submitted successfully!" });
  } catch (error) {
    console.error("submitAssignment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};