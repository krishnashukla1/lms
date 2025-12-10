
import express from "express";
import multer from "multer";
import auth from "../middleware/auth.js";
// import { uploadAssignment ,getAllAssignments,getAssignmentFile,deleteAssignment, getAssignmentStatus} from "../controllers/assignmentController.js";

import { uploadAssignment ,getAllAssignments,getAssignmentFile,deleteAssignment, getAssignmentStatus} from "../controllers/finalAssignmentController.js";

const router = express.Router();

// Store file in memory → Buffer → save to MongoDB
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowed = /pdf|docx|zip|jpg|jpeg|png/;
    const ext = file.originalname.toLowerCase().split(".").pop();
    if (allowed.test(ext)) cb(null, true);
    else cb(new Error("Only PDF, DOCX, ZIP, JPG, PNG allowed"));
  },
});

router.post("/", auth, upload.single("assignment"), uploadAssignment);

// Admin: Get all assignments (list)
router.get("/", auth, getAllAssignments);

// Admin: Download single assignment file
router.get("/:id/file", auth, getAssignmentFile);

// Admin: Delete assignment
router.delete("/:id", auth, deleteAssignment);

router.get("/assignment-status",auth, getAssignmentStatus);


export default router;

