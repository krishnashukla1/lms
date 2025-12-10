

// models/Module.js
import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  materialType: {
    type: String,
    enum: ["video", "pdf", "link", "document"],
    required: true,
  },
  title: { type: String, trim: true },
  url: { type: String, required: true },
});

// Main module schema
const moduleSchema = new mongoose.Schema(
  {
    courseType: {
      type: String,
      enum: ["basic", "intermediate", "advanced"],
      required: true,
      default: "basic"
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    order: {
      type: Number,
      required: true,
      // NOTE: cannot be global unique; uniqueness must be per course
    },

    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      default: null,
    },

    materials: [materialSchema],
  },
  { timestamps: true }
);

// INDEXING
moduleSchema.index({ courseType: 1, order: 1 }, { unique: true });
moduleSchema.index({ courseType: 1 });

export default mongoose.model("Module", moduleSchema);
