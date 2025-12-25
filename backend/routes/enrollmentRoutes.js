// routes/enrollmentRoutes.js
import express from "express";
import auth from "../middleware/auth.js";
import {
  createEnrollmentByAdmin,     // ADMIN ONLY
  getAllEnrollments,           // ADMIN
  getEnrollmentById,           // ADMIN
  updateEnrollmentByAdmin,     // ADMIN
  deleteEnrollmentByAdmin,     // ADMIN
  getMyEnrollments,            // STUDENT ONLY
} from "../controllers/enrollmentController.js";

const router = express.Router();

// === ADMIN ONLY ROUTES ===
router.post("/", auth, createEnrollmentByAdmin);           // Admin creates for any student
router.get("/all", auth, getAllEnrollments);               // All enrollments


router.get("/my", auth, getMyEnrollments);                  // Student sees own


router.get("/:id", auth, getEnrollmentById);               // By ID
router.put("/:id", auth, updateEnrollmentByAdmin);         // Update any
router.delete("/:id", auth, deleteEnrollmentByAdmin);      // Delete any

// === STUDENT ONLY ROUTE ===
// router.get("/my", auth, getMyEnrollments);                 // Student sees own

export default router;