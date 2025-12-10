
// models/Assignment.js → Final Professional Version
import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",   // ← THIS IS CORRECT
    required: true,
  },
  studentName: { type: String, required: true },
  // module: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Module",
  //   required: true,
  // },
  fileName: {
    type: String,
    required: true,
  },
  file: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
    enum: ["image/png", "image/jpeg", "application/pdf", "application/zip", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  },
  size: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["submitted", "under_review", "reviewed", "late"],
    default: "submitted",
  },
}, {
  timestamps: true,
});

// Virtual: Human readable size
assignmentSchema.virtual("sizeMB").get(function () {
  return (this.size / (1024 * 1024)).toFixed(2) + " MB";
});

// Index for fast queries
assignmentSchema.index({ student: 1, module: 1 }, { unique: true }); // One submission per student per module

export default mongoose.model("Assignment", assignmentSchema);


//=====================================


