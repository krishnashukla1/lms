
// models/Quiz.js
import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
      unique: true, // one quiz per module
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

export default mongoose.model("Quiz", quizSchema);

