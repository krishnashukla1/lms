
import Assignment from "../models/Assignment.js";

export const uploadAssignment = async (req, res) => {
  // Check role
  if (req.role !== "student") {
    return res.status(403).json({
      message: "Only students can submit assignments"
    });
  }

  try {
    const studentId = req.user._id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "File is required" });
    }

    // Prevent duplicate (only one assignment allowed per student)
    const alreadySubmitted = await Assignment.findOne({ student: studentId });

    if (alreadySubmitted) {
      return res.status(400).json({
        message: "You have already uploaded your assignment"
      });
    }

    // Create assignment (no module field)
    await Assignment.create({
      student: studentId,
      studentName: req.user.name || req.user.username || "Unknown Student",
      fileName: file.originalname,
      file: file.buffer,
      contentType: file.mimetype,
      size: file.size,
    });

    res.json({ message: "Assignment submitted successfully!" });

  } catch (err) {
    console.error("Assignment Upload Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAllAssignments = async (req, res) => {
  try {
    if (req.role !== "admin") {
      return res.status(403).json({ message: "Only admins can access assignments" });
    }
    // if (req.role !== "admin" && req.role !== "student") {
    //   return res.status(403).json({ message: "Unauthorized" });
    // }


    const assignments = await Assignment.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "student",
        select: "name username email",
      })
      .lean();

    const result = assignments.map(a => ({
      ...a,
      student: a.student || {
        name: a.studentName || "Deleted Student",
        username: "deleted",
        email: "n/a"
      },
    }));

    res.json(result);
  } catch (err) {
    console.error("getAllAssignments error:", err);
    res.status(500).json({ message: "Failed to load assignments" });
  }
};



// DOWNLOAD FILE
export const getAssignmentFile = async (req, res) => {
  try {
    if (req.role !== "admin") {
      return res.status(403).json({ message: "Only admins can download assignments" });
    }

    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    res.set({
      "Content-Type": assignment.contentType,
      "Content-Disposition": `attachment; filename="${assignment.fileName}"`,
    });
    res.send(assignment.file);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Download failed" });
  }
};

// DELETE ASSIGNMENT
export const deleteAssignment = async (req, res) => {
  try {
    if (req.role !== "admin") {
      return res.status(403).json({ message: "Only admins can delete assignments" });
    }

    const result = await Assignment.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Assignment not found" });

    res.json({ message: "Assignment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
};


export const getAssignmentStatus = async (req, res) => {
  if (req.role !== "student") return res.status(403).json({ message: "Unauthorized" });
  const submitted = await Assignment.findOne({ student: req.user._id });
  res.json({ submitted: !!submitted });
};


