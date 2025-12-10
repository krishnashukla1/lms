import express from "express";
import { sendQuery } from "../controllers/queryController.js";

const router = express.Router();

router.post("/send-query", sendQuery);

export default router;   // <-- DEFAULT EXPORT (required)
