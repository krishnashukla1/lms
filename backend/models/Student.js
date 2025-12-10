// import mongoose from "mongoose";

// const studentSchema = new mongoose.Schema({
//   name: String,
//   username: { type: String, unique: true },   // ✅ ADD THIS
//   password: String,
//   progress: {
//     currentModule: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Module",
//       default: null
//     },
//     completedModules: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Module"
//       }
//     ]
//   },
//   role: { type: String, default: "student" },

// });

// export default mongoose.model("Student", studentSchema);

import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  password: String,
  role: { type: String, default: "student" },
});

export default mongoose.model("Student", studentSchema);