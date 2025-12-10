// models/FinalExamAttempt.js
import mongoose from "mongoose";

const finalExamAttemptSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  courseType: {
    type: String,
    enum: ["basic", "intermediate", "advanced"],
    required: true,
  },
  answers: [
    {
      questionIndex: { type: Number, required: true },
      selectedOption: { type: Number, required: true },
    },
  ],
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  passed: { type: Boolean, required: true },
  attemptedAt: { type: Date, default: Date.now },
});

finalExamAttemptSchema.index({ student: 1, courseType: 1 }, { unique: true }); // One attempt per course

export default mongoose.model("FinalExamAttempt", finalExamAttemptSchema);