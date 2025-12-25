
import express from "express";
import multer from "multer";
import auth from "../middleware/auth.js";
import {
  uploadAssignment,
  getAllAssignments,
  getAssignmentFile,
  deleteAssignment,
  getAssignmentStatus,
} from "../controllers/finalAssignmentController.js";

const router = express.Router();

// Multer config – store file in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /pdf|docx|zip|jpg|jpeg|png/;
    const ext = file.originalname.toLowerCase().split(".").pop();
    if (allowed.test(ext)) cb(null, true);
    else cb(new Error("Only PDF, DOCX, ZIP, JPG, PNG allowed"));
  },
});

/* ------------------ FIXED ROUTE ORDER ------------------ */

// Student: check assignment status  (PLACE FIRST)
router.get("/assignment-status", auth, getAssignmentStatus);

// Student: upload assignment
router.post("/", auth, upload.single("assignment"), uploadAssignment);

// Admin: see all submissions
router.get("/", auth, getAllAssignments);

// Admin: download file
router.get("/:id/file", auth, getAssignmentFile);

// Admin: delete assignment
router.delete("/:id", auth, deleteAssignment);

export default router;
