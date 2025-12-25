import express from "express";
import {
  getStudentNotifications,
  getAdminNotifications,
  addNotification,
  updateNotification,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

/* ===================== STUDENT ===================== */
router.get("/student", getStudentNotifications);

/* ====================== ADMIN ====================== */
router.get("/admin", getAdminNotifications);
router.post("/admin", addNotification);
router.put("/admin/:id", updateNotification);
router.delete("/admin/:id", deleteNotification);

export default router;