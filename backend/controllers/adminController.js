import Admin from "../models/Admin.js";
import Student from "../models/Student.js";

import User from "../models/Student.js";
import Progress from "../models/Progress.js";
import Module from "../models/Module.js";

import Enrollment from "../models/Enrollment.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ADMIN SIGNUP
export const adminSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  await Admin.create({ name, email, password: hashed });

  res.json({ message: "Admin registered successfully" });
};



// export const adminLogin = async (req, res) => {
//   const { email, password } = req.body;

//   const admin = await Admin.findOne({ email });
//   if (!admin) return res.status(400).json({ message: "Admin not found" });

//   const match = await bcrypt.compare(password, admin.password);
//   if (!match) return res.status(400).json({ message: "Wrong password" });

//   const token = jwt.sign(
//     { id: admin._id, role: "admin" },
//     process.env.JWT_SECRET
//   );

//   res.json({ message: "Login successful", token });
// };



// ADMIN → REGISTER STUDENT


export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(400).json({ message: "Admin not found" });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: admin._id, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  res.json({
    message: "Login successful",
    token,
    admin: {
      id: admin._id,
      email: admin.email,
      name: admin.name,
      role: "admin",
    },
  });
};


export const registerStudent = async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const student = await Student.create({
    name,
    username,
    password: hashed,
    progress: {
      currentModule: null,
      completedModules: []
    }
  });

  res.json({ message: "Student created successfully", student });
};



export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, username, password } = req.body;

    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (name) student.name = name;
    if (username) student.username = username;
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      student.password = hashed;
    }

    await student.save();
    res.json({ message: "Student updated successfully", student });
  } catch (err) {
    res.status(500).json({ message: "Error updating student", error: err.message });
  }
};

// DELETE STUDENT
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    await student.deleteOne();
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting student", error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminId = req.user.id; // from auth middleware

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Update email
    if (email) {
      const existing = await Admin.findOne({ email });
      if (existing && existing._id.toString() !== adminId) {
        return res.status(400).json({ message: "Email already in use" });
      }
      admin.email = email;
    }

    // Update password
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      admin.password = hashed;
    }

    await admin.save();

    res.json({ message: "Profile updated successfully!" });

    console.log("Updating admin:", {
      id: adminId,
      email,
      passwordStatus: password ? "provided" : "not provided",
    });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const getAllProgress = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not allowed" });
    }

    // Get all students
    const students = await User.find({ role: "student" });

    // Get all progress docs
    const progressDocs = await Progress.find()
      .populate("completedModules")
      .populate("unlockedModule");

    // Get total modules count
    const modules = await Module.find();
    const totalModules = modules.length;

    // Merge student + progress details
    const result = students.map((student) => {
      const prog = progressDocs.find(
        (p) => p.studentId.toString() === student._id.toString()
      );

      const completedCount = prog?.completedModules?.length || 0;
      const progressPercentage = totalModules > 0 
        ? Math.round((completedCount / totalModules) * 100)
        : 0;

      return {
        studentId: student._id,
        name: student.name,
        username: student.username,
        email: student.email,
        progressPercentage,
        completedModules: prog?.completedModules || [],
        unlockedModule: prog?.unlockedModule || null,
        updatedAt: prog?.updatedAt || null,
      };
    });

    return res.json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

export const enrollStudent = async (req, res) => {
  try {
    const { studentId, courseType } = req.body;

    if (!["basic", "intermediate", "advanced"].includes(courseType)) {
      return res.status(400).json({ message: "Invalid course type" });
    }

    // Calculate expiration
    const durationMonths = courseType === "advanced" ? 12 : 6;
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + durationMonths);

    // Create enrollment
    const enrollment = await Enrollment.create({
      student: studentId,
      courseType,
      expiresAt,
    });

    // Create initial progress for this course
    await Progress.create({
      studentId,
      courseType,
      completedModules: [],
      unlockedModule: null,
      scores: [],
      finalExamPassed: false,
      finalAssignmentSubmitted: false,
    });

    res.json({ message: "Student enrolled successfully", enrollment });
  } catch (err) {
    res.status(500).json({ message: "Error enrolling student", error: err.message });
  }
};