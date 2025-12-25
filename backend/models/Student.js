
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  password: String,
  role: { type: String, default: "student" },
});

export default mongoose.model("Student", studentSchema);