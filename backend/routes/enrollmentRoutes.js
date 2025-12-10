// // routes/enrollmentRoutes.js
// import express from "express";
// import auth from "../middleware/auth.js";
// import {
//   enrollInCourse,
//   getMyEnrollments,
//   getAllEnrollments, // optional: for admin
// } from "../controllers/enrollmentController.js";

// const router = express.Router();

// // Student: Enroll in a course
// router.post("/enroll", auth, enrollInCourse);

// // Student: See my active courses
// router.get("/my", auth, getMyEnrollments);

// // Admin: See all enrollments (optional)
// router.get("/all", auth, getAllEnrollments);

// export default router;

//======================================
// routes/enrollmentRoutes.js
// import express from "express";
// import auth from "../middleware/auth.js";
// import {
//   enrollInCourse,
//   getMyEnrollments,
//   getAllEnrollments,
//   getEnrollmentById,      // NEW
//   updateEnrollment,       // NEW
//   deleteEnrollment,       // NEW
// } from "../controllers/enrollmentController.js";

// const router = express.Router();

// // Student routes
// router.post("/enroll", auth, enrollInCourse);
// router.get("/my", auth, getMyEnrollments);

// // Shared (Student own + Admin)
// router.get("/:id", auth, getEnrollmentById);           // Get one enrollment
// router.put("/:id", auth, updateEnrollment);            // Update (extend, reactivate)
// router.delete("/:id", auth, deleteEnrollment);         // Cancel enrollment

// // Admin only
// router.get("/all", auth, getAllEnrollments);

// export default router;
//==========================



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