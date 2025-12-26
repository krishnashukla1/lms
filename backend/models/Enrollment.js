import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
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
  // duration: {
  //   type: String,
  //   enum: ["3m", "6m", "1y"],
  //   default: "1y",
  // },
   duration: {
  type: String,
  enum: ["6m", "9m", "12m", "1y"], // keep temporarily
  default: "12m",
},
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true, // We'll calculate this in controller
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

enrollmentSchema.index({ student: 1, courseType: 1 }, { unique: true });

export default mongoose.model("Enrollment", enrollmentSchema);