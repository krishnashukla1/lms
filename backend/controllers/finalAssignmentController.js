
// controllers/finalAssignmentController.js

import FinalAssignment from "../models/FinalAssignment.js"; // FIXED!
import Enrollment from "../models/Enrollment.js";
import Progress from "../models/Progress.js";

// STUDENT: Submit Final Assignment
// export const uploadAssignment = async (req, res) => {
//   if (req.role !== "student") {
//     return res.status(403).json({ message: "Only students can submit assignments" });
//   }

//   try {
//     const studentId = req.user._id;
//     const file = req.file;
//     const { courseType } = req.body; // Must be sent from frontend/Postman

//     if (!file || !courseType) {
//       return res.status(400).json({ message: "File and courseType are required" });
//     }

//     // Check enrollment
//     const enrollment = await Enrollment.findOne({
//       student: studentId,
//       courseType,
//       isActive: true,
//     });
//     if (!enrollment) {
//       return res.status(403).json({ message: "You are not enrolled in this course" });
//     }

//     // Prevent duplicate submission
//     const alreadySubmitted = await FinalAssignment.findOne({
//       student: studentId,
//       courseType,
//     });
//     if (alreadySubmitted) {
//       return res.status(400).json({ message: "You have already submitted the final assignment for this course" });
//     }

//     // Save assignment
//     await FinalAssignment.create({
//       student: studentId,
//       courseType,
//       studentName: req.user.name || req.user.username || "Unknown Student",
//       fileName: file.originalname,
//       file: file.buffer,
//       contentType: file.mimetype,
//       size: file.size,
//     });

//     // Mark as submitted in Progress
//     await Progress.updateOne(
//       { studentId, courseType },
//       { finalAssignmentSubmitted: true }
//     );

//     res.json({ message: "Final assignment submitted successfully!" });
//   } catch (err) {
//     console.error("uploadAssignment error:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

export const uploadAssignment = async (req, res) => {
  try {
    if (req.role !== "student") {
      return res.status(403).json({
        message: "Only students can submit assignments",
      });
    }

    const studentId = req.user._id;
    const file = req.file;
    const { courseType } = req.body;

    // Validate input
    if (!file || !courseType) {
      return res
        .status(400)
        .json({ message: "File and courseType are required" });
    }

    if (!["basic", "intermediate", "advanced"].includes(courseType)) {
      return res.status(400).json({ message: "Invalid courseType" });
    }

    // Ensure student is enrolled
    const enrollment = await Enrollment.findOne({
      student: studentId,
      courseType,
      isActive: true,
    });

    if (!enrollment) {
      return res.status(403).json({
        message: `You are not actively enrolled in the ${courseType} course`,
      });
    }

    // Prevent duplicate submissions
    const alreadySubmitted = await FinalAssignment.findOne({
      student: studentId,
      courseType,
    });

    if (alreadySubmitted) {
      return res.status(400).json({
        message: `You have already submitted assignment for ${courseType} course`,
      });
    }

    // Save assignment in DB
    // const assignment = await FinalAssignment.create({
    //   student: studentId,
    //   courseType,
    //   studentName: req.user.name || req.user.username || "Unknown Student",
    //   fileName: file.originalname,
    //   file: file.buffer,              // because memoryStorage
    //   contentType: file.mimetype,
    //   size: file.size,
    // });

    const assignment = await FinalAssignment.create({
  student: studentId,
  courseType,
  studentName: req.user.name || req.user.username || "Unknown Student",
  fileName: file.originalname,
  file: file.buffer,
  contentType: file.mimetype,
  size: file.size,
  submittedAt: new Date() // ✅ ensure this exists
});

    // Update progress
    await Progress.updateOne(
      { studentId, courseType },
      { finalAssignmentSubmitted: true },
      { upsert: true }
    );

    return res.status(201).json({
      message: "Assignment submitted successfully!",
      assignment: {
        id: assignment._id,
        courseType: assignment.courseType,
        // submittedAt: assignment.createdAt,
         submittedAt: assignment.submittedAt, // ✅ frontend uses this
      },
    });
  } catch (err) {
    console.error("uploadAssignment error:", err);

    if (err.code === 11000) {
      return res.status(400).json({
        message: `You already submitted an assignment for ${req.body.courseType} course`,
      });
    }

    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ADMIN: Get All Final Assignments
export const getAllAssignments = async (req, res) => {
  if (req.role !== "admin") {
    return res.status(403).json({ message: "Only admins can view assignments" });
  }

  try {
    const assignments = await FinalAssignment.find()
      .sort({ createdAt: -1 })
      .populate("student", "name username")
      .lean();

    res.json(assignments);
  } catch (err) {
    console.error("getAllAssignments error:", err);
    res.status(500).json({ message: "Failed to load assignments" });
  }
};

// ADMIN: Download File
export const getAssignmentFile = async (req, res) => {
  if (req.role !== "admin") {
    return res.status(403).json({ message: "Only admins can download files" });
  }

  try {
    const assignment = await FinalAssignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    res.set({
      "Content-Type": assignment.contentType,
      "Content-Disposition": `attachment; filename="${assignment.fileName}"`,
    });
    res.send(assignment.file);
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).json({ message: "Download failed" });
  }
};

// ADMIN: Delete Assignment
export const deleteAssignment = async (req, res) => {
  if (req.role !== "admin") {
    return res.status(403).json({ message: "Only admins can delete" });
  }

  try {
    const result = await FinalAssignment.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Assignment not found" });

    res.json({ message: "Assignment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

// STUDENT: Check if already submitted
// export const getAssignmentStatus = async (req, res) => {
//   if (req.role !== "student") {
//     return res.status(403).json({ message: "Unauthorized" });
//   }

//   try {
//     const studentId = req.user._id;
//     const enrollment = await Enrollment.findOne({ student: studentId, isActive: true });
//     if (!enrollment) return res.json({ submitted: false });

//     const submitted = await FinalAssignment.findOne({
//       student: studentId,
//       courseType: enrollment.courseType,
//     });

//     res.json({ submitted: !!submitted });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const getAssignmentStatus = async (req, res) => {
//   if (req.role !== "student") return res.status(403).json({ message: "Unauthorized" });

//   try {
//     const studentId = req.user._id;

//     const enrollments = await Enrollment.find({ student: studentId, isActive: true })
//       .select("courseType");

//     const statuses = {};
//     for (const e of enrollments) {
//       const submitted = await FinalAssignment.exists({
//         student: studentId,
//         courseType: e.courseType,
//       });
//       statuses[e.courseType] = { enrolled: true, submitted: !!submitted };
//     }

//     // Add non-enrolled courses as not enrolled
//     ["basic", "intermediate", "advanced"].forEach(type => {
//       if (!statuses[type]) statuses[type] = { enrolled: false, submitted: false };
//     });

//     res.json(statuses);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };



export const getAssignmentStatus = async (req, res) => {
  if (req.role !== "student") 
    return res.status(403).json({ message: "Unauthorized" });

  try {
    const studentId = req.user._id;

    // Fetch active enrollments
    const enrollments = await Enrollment.find({ student: studentId, isActive: true })
      .select("courseType");

    const statuses = {};

    for (const e of enrollments) {
      // Fetch submitted assignment details
      const submittedAssignment = await FinalAssignment.findOne({
        student: studentId,
        courseType: e.courseType,
      }).select("submittedAt file url");

      statuses[e.courseType] = {
        enrolled: true,
        submitted: !!submittedAssignment,
        submittedAt: submittedAssignment?.submittedAt || null,
        file: submittedAssignment?.file || null,
        url: submittedAssignment?.url || null,
      };
    }

    // Ensure all course types exist
    ["basic", "intermediate", "advanced"].forEach(type => {
      if (!statuses[type]) {
        statuses[type] = {
          enrolled: false,
          submitted: false,
          submittedAt: null,
          file: null,
          url: null,
        };
      }
    });

    res.json(statuses);
  } catch (err) {
    console.error("Error fetching assignment status:", err);
    res.status(500).json({ message: "Server error" });
  }
};
