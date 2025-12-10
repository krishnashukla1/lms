import express from "express";
import { adminSignup, adminLogin, registerStudent, updateStudent, deleteStudent,updateProfile, getAllProgress ,enrollStudent} from "../controllers/adminController.js";
import auth from "../middleware/auth.js";
import Student from "../models/Student.js";
// import Admin from "../models/Admin.js";


const router = express.Router();

// Admin signup/login
router.post("/signup", adminSignup);
router.post("/login", adminLogin);

// Student routes (protected)
router.post("/add-student", auth, registerStudent);
router.get("/students", auth, async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ students });
  } catch (err) {
    res.status(500).json({ message: "Error fetching students", error: err.message });
  }
});

// Update student
router.put("/students/:id", auth, updateStudent);

// Delete student
router.delete("/students/:id", auth, deleteStudent);

// Update profile
router.put("/update-profile", auth, updateProfile);

//get all progress
router.get("/all-progress", auth, getAllProgress);

router.post("/enroll-student", auth, enrollStudent);

export default router;

