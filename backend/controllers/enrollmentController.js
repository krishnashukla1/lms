// // controllers/enrollmentController.js
// import Enrollment from "../models/Enrollment.js";

// // Student: Enroll in a course
// export const enrollInCourse = async (req, res) => {
//   if (req.role !== "student") {
//     return res.status(403).json({ message: "Only students can enroll" });
//   }

//   const { courseType } = req.body;

//   if (!courseType || !["basic", "intermediate", "advanced"].includes(courseType)) {
//     return res.status(400).json({ message: "Valid courseType is required: basic, intermediate, or advanced" });
//   }

//   try {
//     const studentId = req.user._id;

//     // Check if already enrolled
//     const existing = await Enrollment.findOne({
//       student: studentId,
//       courseType,
//     });

//     if (existing) {
//       if (existing.isActive) {
//         return res.status(400).json({ message: `Already enrolled in ${courseType} course` });
//       } else {
//         // Reactivate if expired
//         existing.isActive = true;
//         existing.expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year
//         await existing.save();
//         return res.json({ message: `Re-activated your ${courseType} course access!` });
//       }
//     }

//     // Create new enrollment
//     const enrollment = await Enrollment.create({
//       student: studentId,
//       courseType,
//       expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year access
//     });

//     res.status(201).json({
//       message: `Successfully enrolled in ${courseType} course!`,
//       enrollment: {
//         courseType: enrollment.courseType,
//         enrolledAt: enrollment.enrolledAt,
//         expiresAt: enrollment.expiresAt,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     if (err.code === 11000) {
//       return res.status(400).json({ message: "You are already enrolled in this course" });
//     }
//     res.status(500).json({ message: "Enrollment failed" });
//   }
// };

// // Student: Get my active courses
// export const getMyEnrollments = async (req, res) => {
//   if (req.role !== "student") return res.status(403).json({ message: "Unauthorized" });

//   try {
//     const enrollments = await Enrollment.find({
//       student: req.user._id,
//       isActive: true,
//     }).select("courseType enrolledAt expiresAt");

//     const courses = enrollments.map(e => ({
//       courseType: e.courseType,
//       enrolledAt: e.enrolledAt,
//       expiresAt: e.expiresAt,
//     }));

//     res.json({
//       activeCourses: courses.length > 0 ? courses : [],
//       message: courses.length === 0 ? "You are not enrolled in any course yet" : undefined,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Optional: Admin view all
// export const getAllEnrollments = async (req, res) => {
//   if (req.role !== "admin") return res.status(403).json({ message: "Admin only" });

//   const enrollments = await Enrollment.find()
//     .populate("student", "name username email")
//     .sort({ enrolledAt: -1 });

//   res.json(enrollments);
// };

//===============

// // controllers/enrollmentController.js
// import Enrollment from "../models/Enrollment.js";

// // 1. Enroll in course (already good)
// export const enrollInCourse = async (req, res) => {
//   if (req.role !== "student") {
//     return res.status(403).json({ message: "Only students can enroll" });
//   }

//   const { courseType } = req.body;
//   if (!["basic", "intermediate", "advanced"].includes(courseType)) {
//     return res.status(400).json({ message: "Invalid courseType" });
//   }

//   try {
//     const studentId = req.user._id;

//     const existing = await Enrollment.findOne({ student: studentId, courseType });
//     if (existing?.isActive) {
//       return res.status(400).json({ message: `Already enrolled in ${courseType}` });
//     }

//     if (existing) {
//       // Reactivate expired one
//       existing.isActive = true;
//       existing.expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
//       await existing.save();
//       return res.json({ message: `Re-enrolled in ${courseType} successfully!` });
//     }

//     const enrollment = await Enrollment.create({
//       student: studentId,
//       courseType,
//       expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
//     });

//     res.status(201).json({ message: "Enrolled successfully!", enrollment });
//   } catch (err) {
//     if (err.code === 11000) {
//       return res.status(400).json({ message: "Already enrolled" });
//     }
//     res.status(500).json({ message: "Enrollment failed" });
//   }
// };

// // 2. Get MY active enrollments
// export const getMyEnrollments = async (req, res) => {
//   if (req.role !== "student") return res.status(403).json({ message: "Unauthorized" });

//   const enrollments = await Enrollment.find({
//     student: req.user._id,
//     isActive: true,
//   }).select("courseType enrolledAt expiresAt");

//   res.json({ activeCourses: enrollments });
// };

// // 3. Admin: Get all enrollments
// export const getAllEnrollments = async (req, res) => {
//   if (req.role !== "admin") return res.status(403).json({ message: "Admin only" });

//   const enrollments = await Enrollment.find()
//     .populate("student", "name username email")
//     .sort({ enrolledAt: -1 });

//   res.json(enrollments);
// };

// // 4. Get Enrollment by ID (Student own OR Admin)
// export const getEnrollmentById = async (req, res) => {
//   try {
//     const enrollment = await Enrollment.findById(req.params.id)
//       .populate("student", "name username");

//     if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

//     const isOwner = enrollment.student._id.toString() === req.user._id.toString();
//     const isAdmin = req.role === "admin";

//     if (!isOwner && !isAdmin) {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     res.json(enrollment);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // 5. Update Enrollment (Extend expiry, reactivate, etc.)
// export const updateEnrollment = async (req, res) => {
//   const { courseType, expiresAt, isActive } = req.body;

//   try {
//     const enrollment = await Enrollment.findById(req.params.id);
//     if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

//     const isOwner = enrollment.student.toString() === req.user._id.toString();
//     const isAdmin = req.role === "admin";

//     if (!isOwner && !isAdmin) {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     // Optional: prevent changing courseType
//     if (courseType && courseType !== enrollment.courseType) {
//       return res.status(400).json({ message: "Cannot change course type" });
//     }

//     if (expiresAt) enrollment.expiresAt = new Date(expiresAt);
//     if (typeof isActive === "boolean") enrollment.isActive = isActive;

//     await enrollment.save();

//     res.json({ message: "Enrollment updated successfully", enrollment });
//   } catch (err) {
//     res.status(500).json({ message: "Update failed" });
//   }
// };

// // 6. Delete / Cancel Enrollment (Student can cancel own, Admin can remove any)
// export const deleteEnrollment = async (req, res) => {
//   try {
//     const enrollment = await Enrollment.findById(req.params.id);
//     if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

//     const isOwner = enrollment.student.toString() === req.user._id.toString();
//     const isAdmin = req.role === "admin";

//     if (!isOwner && !isAdmin) {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     await Enrollment.findByIdAndDelete(req.params.id);

//     // Optional: Also delete submitted assignment if exists
//     // await FinalAssignment.deleteOne({ student: enrollment.student, courseType: enrollment.courseType });

//     res.json({ message: `Enrollment in ${enrollment.courseType} cancelled successfully` });
//   } catch (err) {
//     res.status(500).json({ message: "Delete failed" });
//   }
// };

//=============correct==========



// controllers/enrollmentController.js
// import Enrollment from "../models/Enrollment.js";
// import Student from "../models/Student.js"; // assuming you have Student model


// // ADMIN: Create enrollment for any student
// export const createEnrollmentByAdmin = async (req, res) => {
//   if (req.role !== "admin") {
//     return res.status(403).json({ message: "Admin access required" });
//   }

//   const { studentId, courseType } = req.body;

//   if (!studentId || !courseType) {
//     return res.status(400).json({ message: "studentId and courseType are required" });
//   }

//   if (!["basic", "intermediate", "advanced"].includes(courseType)) {
//     return res.status(400).json({ message: "Invalid courseType" });
//   }

//   try {
//     // Validate student exists
//     const student = await Student.findById(studentId);
//     if (!student) return res.status(404).json({ message: "Student not found" });

//     const existing = await Enrollment.findOne({ student: studentId, courseType });

//     if (existing) {
//       if (existing.isActive) {
//         return res.status(400).json({ message: "Student already enrolled in this course" });
//       }
//       // Reactivate expired
//       existing.isActive = true;
//       existing.expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
//       await existing.save();
//       return res.json({ message: "Enrollment reactivated", enrollment: existing });
//     }

//     const enrollment = await Enrollment.create({
//       student: studentId,
//       courseType,
//       expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
//     });

//     await enrollment.populate("student", "name username email");

//     res.status(201).json({
//       message: `Student enrolled in ${courseType} course`,
//       enrollment,
//     });
//   } catch (err) {
//     console.error(err);
//     if (err.code === 11000) {
//       return res.status(400).json({ message: "Duplicate enrollment" });
//     }
//     res.status(500).json({ message: "Failed to enroll student" });
//   }
// };

// // ADMIN: Get all enrollments
// export const getAllEnrollments = async (req, res) => {
//   if (req.role !== "admin") return res.status(403).json({ message: "Admin only" });

//   const enrollments = await Enrollment.find()
//     .populate("student", "name username email")
//     .sort({ enrolledAt: -1 });

//   res.json(enrollments);
// };

// // ADMIN: Get by ID
// export const getEnrollmentById = async (req, res) => {
//   if (req.role !== "admin") return res.status(403).json({ message: "Admin only" });

//   const enrollment = await Enrollment.findById(req.params.id)
//     .populate("student", "name username email");

//   if (!enrollment) return res.status(404).json({ message: "Not found" });

//   res.json(enrollment);
// };

// // ADMIN: Update any enrollment
// export const updateEnrollmentByAdmin = async (req, res) => {
//   if (req.role !== "admin") return res.status(403).json({ message: "Admin only" });

//   const { expiresAt, isActive, courseType } = req.body;

//   const enrollment = await Enrollment.findById(req.params.id);
//   if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

//   if (expiresAt) enrollment.expiresAt = new Date(expiresAt);
//   if (typeof isActive === "boolean") enrollment.isActive = isActive;
//   if (courseType && ["basic", "intermediate", "advanced"].includes(courseType)) {
//     enrollment.courseType = courseType;
//   }

//   await enrollment.save();
//   await enrollment.populate("student", "name username");

//   res.json({ message: "Updated successfully", enrollment });
// };

// // ADMIN: Delete any enrollment
// export const deleteEnrollmentByAdmin = async (req, res) => {
//   if (req.role !== "admin") return res.status(403).json({ message: "Admin only" });

//   const enrollment = await Enrollment.findById(req.params.id);
//   if (!enrollment) return res.status(404).json({ message: "Not found" });

//   await Enrollment.findByIdAndDelete(req.params.id);

//   res.json({ message: `Enrollment removed (${enrollment.courseType})` });
// };

// // STUDENT: Only view own active courses
// // controllers/enrollmentController.js → getMyEnrollments

// // export const getMyEnrollments = async (req, res) => {
// //   console.log("HIT /my route → Role:", req.role);  // ← THIS LINE MUST APPEAR IN CONSOLE

// //   if (req.role !== "student") {
// //     return res.status(403).json({ 
// //       message: "Only students can access this route"   // ← NOT "Admin only"
// //     });
// //   }

// //   const enrollments = await Enrollment.find({
// //     student: req.user._id,
// //     isActive: true
// //   }).select("courseType enrolledAt expiresAt");

// //   res.json({ activeCourses: enrollments });
// // };

// export const getMyEnrollments = async (req, res) => {
//   // Only students can see their own enrollments
//   if (req.role !== "student") {
//     return res.status(403).json({ message: "Only students can view their enrollments" });
//   }

//   try {
//     const enrollments = await Enrollment.find({
//       student: req.user._id,
//       isActive: true,
//     })
//       .select("courseType enrolledAt expiresAt")
//       .sort({ enrolledAt: -1 });

//     res.json({ activeCourses: enrollments });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


//==================with enrollment duration=====================


// controllers/enrollmentController.js
import Enrollment from "../models/Enrollment.js";
import Student from "../models/Student.js";


// Convert "3m", "6m", "1y" to milliseconds
// const getDurationMs = (duration) => {
//   switch (duration) {
//     case "3m":
//       return 3 * 30 * 24 * 60 * 60 * 1000;
//     case "6m":
//       return 6 * 30 * 24 * 60 * 60 * 1000;
//     case "1y":
//       return 365 * 24 * 60 * 60 * 1000;
//     default:
//       return 365 * 24 * 60 * 60 * 1000; // fallback: 1 year
//   }
// };

// Converts duration string to actual expiration date

const getExpiresDate = (enrolledAt, duration) => {
  const start = new Date(enrolledAt);
  const d = new Date(start);

  // switch (duration) {
  //   case "3m":
  //     d.setMonth(d.getMonth() + 3);
  //     break;
  //   case "6m":
  //     d.setMonth(d.getMonth() + 6);
  //     break;
  //   case "1y":
  //     d.setFullYear(d.getFullYear() + 1);
  //     break;
  //   default:
  //     d.setFullYear(d.getFullYear() + 1);
  //     break;
  // }

   switch (duration) {
  case "6m":
    d.setMonth(d.getMonth() + 6);
    break;

  case "9m":
    d.setMonth(d.getMonth() + 9);
    break;

  case "12m":
    d.setMonth(d.getMonth() + 12);
    break;

  default:
    // Default = 12 months
    d.setMonth(d.getMonth() + 12);
    break;
}

  // Fix end-of-month overflow
  if (d.getDate() !== start.getDate()) {
    d.setDate(start.getDate());
  }

  return d;
};



const calculateDurationFromDates = (enrolledAt, expiresAt) => {
  const diffMs = new Date(expiresAt) - new Date(enrolledAt);
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  // if (diffDays <= 90) return "3m";
  // if (diffDays <= 180) return "6m";
  // if (diffDays <= 380) return "1y";
 
   if (diffDays <= 180) return "6m";   // up to ~6 months
if (diffDays <= 270) return "9m";   // up to ~9 months
return "12m";                       // default ~12 months

 
  return `${diffDays}d`; // fallback
};




/*===========================================
   ADMIN: Create Enrollment for Any Student
===========================================*/
export const createEnrollmentByAdmin = async (req, res) => {
  if (req.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }

  const { studentId, courseType, duration = "1y" } = req.body;

  if (!studentId || !courseType) {
    return res.status(400).json({ message: "studentId and courseType are required" });
  }

  if (!["basic", "intermediate", "advanced"].includes(courseType)) {
    return res.status(400).json({ message: "Invalid courseType" });
  }

  try {

    const enrolledAt = new Date();
    const expiresAt = getExpiresDate(enrolledAt, duration);


    // const durationMs = getDurationMs(duration);

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const existing = await Enrollment.findOne({ student: studentId, courseType });

    if (existing) {
      if (existing.isActive) {
        return res.status(400).json({ message: "Student already enrolled in this course" });
      }

      // Reactivate expired enrollment
      existing.isActive = true;
      existing.duration = duration;
      existing.expiresAt = new Date(Date.now() + durationMs);
      await existing.save();

      return res.json({ message: "Enrollment reactivated", enrollment: existing });
    }

    const enrollment = await Enrollment.create({
      student: studentId,
      courseType,
      duration,
      // enrolledAt: new Date(),
      // expiresAt: new Date(Date.now() + durationMs),

      enrolledAt,
      expiresAt,
    });

    await enrollment.populate("student", "name username email");

    res.status(201).json({
      message: `Student enrolled in ${courseType} course`,
      enrollment,
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "Duplicate enrollment" });
    }
    res.status(500).json({ message: "Failed to enroll student" });
  }
};



/*===========================================
   ADMIN: Get All Enrollments
===========================================*/
// export const getAllEnrollments = async (req, res) => {
//   if (req.role !== "admin") return res.status(403).json({ message: "Admin only" });

//   const enrollments = await Enrollment.find()
//     .populate("student", "name username email")
//     .sort({ enrolledAt: -1 });

//   res.json(enrollments);
// };

export const getAllEnrollments = async (req, res) => {
  if (req.role !== "admin") return res.status(403).json({ message: "Admin only" });

  const enrollments = await Enrollment.find()
    .populate("student", "name username email")
    .sort({ enrolledAt: -1 });

  const formatted = enrollments.map(e => ({
    ...e.toObject(),
    duration: e.duration || calculateDurationFromDates(e.enrolledAt, e.expiresAt)
  }));

  res.json(formatted);
};




/*===========================================
   ADMIN: Get Enrollment By ID
===========================================*/
export const getEnrollmentById = async (req, res) => {
  if (req.role !== "admin") return res.status(403).json({ message: "Admin only" });

  const enrollment = await Enrollment.findById(req.params.id)
    .populate("student", "name username email");

  if (!enrollment) return res.status(404).json({ message: "Not found" });

  res.json(enrollment);
};



/*===========================================
   ADMIN: Update Enrollment
===========================================*/
export const updateEnrollmentByAdmin = async (req, res) => {
  if (req.role !== "admin")
    return res.status(403).json({ message: "Admin only" });

  const { duration, isActive, courseType } = req.body;

  const enrollment = await Enrollment.findById(req.params.id);
  if (!enrollment)
    return res.status(404).json({ message: "Enrollment not found" });

  // Update duration → recalculate expiry
  // if (duration) {
  //   const durationMs = getDurationMs(duration);
  //   enrollment.duration = duration;
  //   enrollment.expiresAt = new Date(Date.now() + durationMs);
  // }

  if (duration) {
  enrollment.duration = duration;
  enrollment.expiresAt = getExpiresDate(new Date(enrollment.enrolledAt), duration);
}

  if (typeof isActive === "boolean") {
    enrollment.isActive = isActive;
  }

  if (courseType && ["basic", "intermediate", "advanced"].includes(courseType)) {
    enrollment.courseType = courseType;
  }

  //CUSTOM DATE UPDATE
  if (req.body.expiresAt) {
    enrollment.expiresAt = new Date(req.body.expiresAt);
  }


  await enrollment.save();
  await enrollment.populate("student", "name username email");

  res.json({ message: "Updated successfully", enrollment });
};



/*===========================================
   ADMIN: Delete Enrollment
===========================================*/
export const deleteEnrollmentByAdmin = async (req, res) => {
  if (req.role !== "admin") return res.status(403).json({ message: "Admin only" });

  const enrollment = await Enrollment.findById(req.params.id);
  if (!enrollment) return res.status(404).json({ message: "Not found" });

  await Enrollment.findByIdAndDelete(req.params.id);

  res.json({ message: `Enrollment removed (${enrollment.courseType})` });
};



/*===========================================
   STUDENT: Get Own Active Enrollments
===========================================*/
// If I just want to show expired courses as disabled in the UI

export const getMyEnrollments = async (req, res) => {
  if (req.role !== "student") {
    return res.status(403).json({ message: "Only students can view their enrollments" });
  }

  try {
    const enrollments = await Enrollment.find({
      student: req.user._id,
      isActive: true,
    })
      .select("courseType duration enrolledAt expiresAt")
      .sort({ enrolledAt: -1 });

    res.json({ activeCourses: enrollments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



//=====If I want the database itself to always have isActive correctly updated, then use the “advanced” version.==========

// export const getMyEnrollments = async (req, res) => {
//   if (req.role !== "student") {
//     return res.status(403).json({ message: "Only students can view their enrollments" });
//   }

//   try {
//     const now = new Date();

//     // Find all enrollments (even expired)
//     const allEnrollments = await Enrollment.find({
//       student: req.user._id,
//     }).select("courseType duration enrolledAt expiresAt isActive");

//     // Automatically mark expired ones as inactive
//     const updatePromises = allEnrollments.map(async (enrollment) => {
//       if (enrollment.expiresAt < now && enrollment.isActive) {
//         enrollment.isActive = false;
//         await enrollment.save();
//       }
//     });

//     await Promise.all(updatePromises);

//     // Now return only currently active ones
//     const activeEnrollments = allEnrollments.filter(
//       (e) => e.isActive && e.expiresAt >= now
//     );

//     res.json({ activeCourses: activeEnrollments });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };