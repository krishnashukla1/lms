// models/FinalAssignment.js
import mongoose from "mongoose";

const finalAssignmentSchema = new mongoose.Schema({
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
  studentName: { type: String, required: true },
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
   submittedAt: { type: Date, default: Date.now } // ✅ important
}, {
  timestamps: true,
  
});

// Virtual: Human readable size
finalAssignmentSchema.virtual("sizeMB").get(function () {
  return (this.size / (1024 * 1024)).toFixed(2) + " MB";
});

// Index for fast queries
finalAssignmentSchema.index({ student: 1, courseType: 1 }, { unique: true }); // One per student per course

export default mongoose.model("FinalAssignment", finalAssignmentSchema);