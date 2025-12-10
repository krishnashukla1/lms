// models/FinalExam.js
import mongoose from "mongoose";

const finalExamSchema = new mongoose.Schema(
  {
    courseType: {
      type: String,
      enum: ["basic", "intermediate", "advanced"],
      required: true,
      unique: true, // One final exam per course type
    },
    questions: [
      {
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correct: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("FinalExam", finalExamSchema);