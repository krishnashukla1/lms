

// // models/Progress.js
// import mongoose from "mongoose";

// const progressSchema = new mongoose.Schema(
//   {
//     studentId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Student",
//       required: true,
//       index: true,
//       unique: true, // one progress document per student
//     },

//     completedModules: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Module",
//       },
//     ],

//     unlockedModule: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Module",
//       default: null,
//     },

//     scores: [
//       {
//         moduleId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Module",
//           required: true,
//         },
//         score: {
//           type: Number,
//           default: 0,
//         },
//         answers: [Number],
//       },
//     ],
//   },
//   { timestamps: true }
// );

// // Prevent duplicate score entries
// progressSchema.index({ studentId: 1 });
// progressSchema.index({ "scores.moduleId": 1 });

// export default mongoose.model("Progress", progressSchema);


// models/Progress.js
import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },
    courseType: {
      type: String,
      enum: ["basic", "intermediate", "advanced"],
      required: true,
    },
    completedModules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
      },
    ],
    unlockedModule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      default: null,
    },
    scores: [
      {
        moduleId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Module",
          required: true,
        },
        score: {
          type: Number,
          default: 0,
        },
        answers: [Number],
      },
    ],
    finalExamPassed: {
      type: Boolean,
      default: false,
    },
    finalAssignmentSubmitted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Prevent duplicates
progressSchema.index({ studentId: 1, courseType: 1 }, { unique: true });
progressSchema.index({ "scores.moduleId": 1 });

export default mongoose.model("Progress", progressSchema);