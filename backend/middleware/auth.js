
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import Admin from "../models/Admin.js";

export default async function auth(req, res, next) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user = null;
    let role = null;

    // check admin
    user = await Admin.findById(decoded.id).select("-password");
    if (user) role = "admin";

    // if not admin → check student
    if (!user) {
      user = await Student.findById(decoded.id).select("-password");
      if (user) role = "student";
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid token user" });
    }

    req.user = user;
    req.user.role = role;  // for frontend / progress.jsx
    req.role = role;       // for backend routes like assignments

    next();

  } catch (err) {
    console.error("AUTH ERROR:", err);
    res.status(401).json({ message: "Token is not valid" });
  }
}

