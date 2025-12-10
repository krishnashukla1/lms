
// routes/moduleRoutes.js
import express from "express";
import auth from "../middleware/auth.js";
import { addModule, getModules, getModuleById, updateModule, deleteModule } from "../controllers/moduleController.js";

const router = express.Router();

// Add new module
router.post("/", auth, addModule);

// Get all modules
router.get("/", auth, getModules);

// Get single module by ID
router.get("/:id", auth, getModuleById);

// Update module
router.put("/:id", auth, updateModule);

// Delete module
router.delete("/:id", auth, deleteModule);

export default router;

