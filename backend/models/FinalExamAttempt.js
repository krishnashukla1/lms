// // models/FinalExamAttempt.js
// import mongoose from "mongoose";

// const finalExamAttemptSchema = new mongoose.Schema({
//   student: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Student",
//     required: true,
//   },
//   courseType: {
//     type: String,
//     enum: ["basic", "intermediate", "advanced"],
//     required: true,
//   },
//   answers: [
//     {
//       questionIndex: { type: Number, required: true },
//       selectedOption: { type: Number, required: true },
//     },
//   ],
//   score: { type: Number, required: true },
//   totalQuestions: { type: Number, required: true },
//   passed: { type: Boolean, required: true },
//   attemptedAt: { type: Date, default: Date.now },
// });

// finalExamAttemptSchema.index({ student: 1, courseType: 1 }, { unique: true }); // One attempt per course

// export default mongoose.model("FinalExamAttempt", finalExamAttemptSchema);


//=============================with timer=============

import mongoose from "mongoose";

const finalExamAttemptSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student", // or "User" — make sure this matches your actual model name
    required: true,
  },
  courseType: {
    type: String,
    enum: ["basic", "intermediate", "advanced"],
    required: true,
  },
  answers: [
    {
      questionIndex: {
        type: Number,
        required: true,
        min: 0,
      },
      selectedOption: {
        type: Number,
        required: false,     // ← THIS IS THE FIX
        default: null,       // ← Allows unanswered questions
        min: 0,
        max: 3,              // assuming 4 options (0-3)
      },
    },
  ],
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  correct: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  passed: {
    type: Boolean,
    required: true,
  },
  timeUp: {
    type: Boolean,
    default: false,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent multiple attempts
finalExamAttemptSchema.index({ student: 1, courseType: 1 }, { unique: true });

export default mongoose.model("FinalExamAttempt", finalExamAttemptSchema);
