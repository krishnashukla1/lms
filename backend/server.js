
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import moduleRoutes from "./routes/moduleRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import queryRoutes from './routes/queryRoutes.js'
import finalAssignmentRoutes from './routes/finalAssignmentRoutes.js'

import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import finalExamRoutes from './routes/finalExamRoutes.js'
import "./models/Student.js";

dotenv.config();
const app = express();

// app.use(express.json({ limit: "10mb" })); // Important for large binary
app.use(express.json());
// app.use(cors());


const allowedOrigins = [
  "http://localhost:5173",       //  local frontend
  "https://learn-step.onrender.com"  //  deployed frontend,
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy: The origin ${origin} is not allowed`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // allow cookies/auth headers if needed
}));




app.use(morgan("dev"));
// app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/query", queryRoutes);
app.use("/api/final-assignments", finalAssignmentRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/final-exams", finalExamRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);



//   PS C:\Users\hp\Desktop\LMS NEW PROJECT> git commit -m "Remove .env files from repository and ignore them"
