
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import {
//   FiLogOut,
//   FiAward,
//   FiBookOpen,
//   FiBarChart2,
//   FiTarget,
//   FiFileText,
// } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import { useAuth } from "../store/authStore";

// export default function StudentDashboard() {
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [assignmentStatus, setAssignmentStatus] = useState({});
//   const [examResults, setExamResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [studentInfo, setStudentInfo] = useState(null);

//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [enrollRes, assignRes, examRes] = await Promise.all([
//           api.get("/enrollments/my"),
//           api.get("/final-assignments/assignment-status"),
//           api.get("/final-exams/results/my"),
//         ]);

//         setEnrolledCourses(enrollRes.data?.activeCourses || []);
//         setAssignmentStatus(assignRes.data || {});
//         setExamResults(examRes.data?.results || []);
//       } catch (err) {
//         console.error("Dashboard load failed:", err);
//         toast.error("Failed to load dashboard. Please refresh.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     api
//       .get("/student/dashboard")
//       .then((res) => setStudentInfo(res.data.student))
//       .catch(console.error);
//   }, []);

//   // COURSE LABELS
//   const courses = {
//     basic: { line1: "Basic", line2: "Course" },
//     intermediate: { line1: "Intermediate", line2: "Course" },
//     advanced: { line1: "Advanced", line2: "Course" },
//   };

//   // Get exam score result
//   const getExamStatus = (type) => {
//     const result = examResults.find((r) => r.courseType === type);

//     if (!result) return { text: "Not Taken", color: "gray" };

//     return {
//       text: `Final Exam: ${result.score}%`,
//       score: result.score,
//       color:
//         result.score >= 75 ? "emerald" : result.score >= 50 ? "amber" : "red",
//     };
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50">
//         <div className="w-20 h-20 border-8 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 p-8">
//       <div className="max-w-full mx-auto">
//         {/* HEADER */}
//         <div className="bg-white backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-12">
//           <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-6">
//             <div className="space-y-4 max-w-2xl">
//               <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
//                 <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                   Welcome,{" "}
//                 </span>
//                 <span className="text-blue-700">
//                   {studentInfo?.name || "Student"}
//                 </span>
//               </h1>

//               <h3 className="text-gray-700 text-lg">
//                 Username:{" "}
//                 <span className="font-bold text-purple-700 text-2xl">
//                   {studentInfo?.username || "Not available"}
//                 </span>
//               </h3>
//             </div>

//             <button
//               onClick={() => {
//                 logout();
//                 toast.success("Logged out");
//                 navigate("/");
//               }}
//               className="cursor-pointer bg-red-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-200"
//             >
//               <FiLogOut className="text-xl" />
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* STATS CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//           {/* Enrolled Courses */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="relative overflow-hidden bg-linear-to-br from-blue-500 via-indigo-600 to-purple-700 text-white p-10 rounded-3xl shadow-2xl text-center"
//           >
//             <FiBarChart2 size={56} className="mx-auto mb-5 drop-shadow-lg" />
//             <p className="text-6xl font-black mb-2">
//               {enrolledCourses.length}
//             </p>
//             <p className="text-2xl font-bold">Enrolled Courses</p>
//           </motion.div>

//           {/* Assignments */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="relative overflow-hidden bg-linear-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white p-10 rounded-3xl shadow-2xl text-center"
//           >
//             <FiTarget size={56} className="mx-auto mb-5" />
//             <p className="text-6xl font-black mb-2">
//               {Object.values(assignmentStatus).filter((s) => s.submitted).length}
//             </p>
//             <p className="text-2xl font-bold">Assignments Done</p>
//           </motion.div>

//           {/* Exams */}

//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="relative overflow-hidden bg-linear-to-br from-purple-600 via-pink-600 to-rose-600 text-white p-10 rounded-3xl shadow-2xl text-center"
//           >
//             <FiAward size={56} className="mx-auto mb-5" />

//             {/* Total Exams Done */}
//             <p className="text-6xl font-black mb-2">
//               {examResults.length}
//             </p>
//             <p className="text-2xl font-bold mb-2">Exams Done</p>

//             {/* Optional: Pass / Fail */}
//             <div className="flex justify-center gap-6 mt-2 text-lg font-semibold">
//               <span className="text-green-300">Passed: {examResults.filter(r => r.passed).length}</span>
//               <span className="text-red-300">Failed: {examResults.filter(r => r.passed === false).length}</span>
//             </div>
//           </motion.div>

//         </div>

//         {/* COURSE CARDS */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
//           {Object.keys(courses).map((key) => {
//             const enrollment = enrolledCourses.find((c) => c.courseType === key);
//             const isEnrolled = Boolean(enrollment);

//             // Check if enrollment is expired
//             const isExpired = enrollment
//               ? new Date(enrollment.expiresAt) < new Date()
//               : false;

//             const assignmentDone = assignmentStatus[key]?.submitted || false;
//             const exam = isEnrolled
//               ? getExamStatus(key)
//               : { text: "Not Taken", color: "gray" };

//             // Calculate duration in months (if custom date, calculate months difference)
//             let durationText = "";
//             if (enrollment) {
//               if (enrollment.duration) {
//                 // If duration is in "3m", "6m", "11y" format
//                 durationText = enrollment.duration.toUpperCase();
//               } else if (enrollment.enrolledAt && enrollment.expiresAt) {
//                 const enrolledDate = new Date(enrollment.enrolledAt);
//                 const expiryDate = new Date(enrollment.expiresAt);
//                 const months =
//                   (expiryDate.getFullYear() - enrolledDate.getFullYear()) * 12 +
//                   (expiryDate.getMonth() - enrolledDate.getMonth());
//                 durationText = `${months} month${months > 1 ? "s" : ""}`;
//               }
//             }

//             return (
//               //               <motion.div
//               //                 key={key}
//               //                 whileHover={{ scale: isEnrolled ? 1.05 : 1 }}


//               //                   className={`
//               //   bg-white rounded-3xl shadow-xl p-10 text-center transition-all duration-500
//               //   ${isEnrolled 
//               //     ? "hover:-translate-y-1 hover:shadow-2xl hover:bg-indigo-50 hover:ring-4 hover:ring-indigo-300/40" 
//               //     : "opacity-60 cursor-not-allowed"
//               //   }
//               // `}

//               //               >
//               //                 <h2 className="text-3xl font-extrabold mb-4 leading-tight">
//               //                   {courses[key].line1}
//               //                   <br />
//               //                   <span className="text-indigo-600">{courses[key].line2}</span>
//               //                 </h2>

//               //                 <div className="space-y-6 mt-8">
//               //                   <div className={`text-2xl font-bold ${isEnrolled ? "text-green-600" : "text-gray-400"}`}>
//               //                     {isEnrolled ? "ENROLLED" : "NOT ENROLLED"}
//               //                   </div>

//               //                   <div className="flex justify-center items-center gap-3">
//               //                     <FiFileText size={28} />


//               //                     <span
//               //   className={`text-lg font-bold 
//               //     ${!isEnrolled 
//               //       ? "text-gray-400" 
//               //       : assignmentDone 
//               //         ? "text-emerald-600" 
//               //         : "text-orange-600"
//               //     }`}
//               // >
//               //   {!isEnrolled 
//               //     ? "Assignment: Not Submitted" 
//               //     : assignmentDone 
//               //       ? "Assignment: Submitted" 
//               //       : "Assignment: Not Submitted"}
//               // </span>

//               //                   </div>

//               //                   <div className="flex justify-center items-center gap-3">
//               //                     <FiBookOpen size={32} />
//               //                     <span
//               //                       className={`text-xl font-black ${exam.color === "emerald"
//               //                           ? "text-emerald-600"
//               //                           : exam.color === "red"
//               //                             ? "text-red-600"
//               //                             : exam.color === "amber"
//               //                               ? "text-amber-600"
//               //                               : "text-gray-600"
//               //                         }`}
//               //                     >
//               //                       {exam.text}
//               //                     </span>
//               //                   </div>

//               //                   {isEnrolled && (
//               //                     <div className="bg-indigo-50 rounded-2xl p-4 text-center mt-6">
//               //                       <p className="text-lg font-semibold text-indigo-700">
//               //                         Duration: <span className="font-bold">{durationText}</span>
//               //                       </p>
//               //                       <p className="text-md text-gray-700 mt-1">
//               //                         {isExpired ? (
//               //                           <span className="font-bold text-red-600">Course Expired</span>
//               //                         ) : (
//               //                           <>
//               //                             Expires On:{" "}
//               //                             {/* <span className="font-bold text-red-600">
//               //                     {new Date(enrollment.expiresAt).toLocaleDateString()}
//               //                   </span> */}

//               //                             <span className="font-bold text-red-600">
//               //                               {new Date(enrollment.expiresAt).toLocaleDateString("en-US", {
//               //                                 day: "2-digit",
//               //                                 month: "short",
//               //                                 year: "numeric",
//               //                               })}
//               //                             </span>

//               //                           </>
//               //                         )}
//               //                       </p>
//               //                     </div>
//               //                   )}

//               //                   {isEnrolled && (
//               //                     <button
//               //                       onClick={() => !isExpired && navigate(`/modules/${key}`)}
//               //                       disabled={isExpired}
//               //                       className={`cursor-pointer mt-8 w-full py-4 rounded-2xl font-bold text-xl text-white transition ${isExpired
//               //                           ? "bg-gray-400 cursor-not-allowed"
//               //                           : "bg-linear-to-r from-indigo-600 to-purple-600 hover:shadow-xl"
//               //                         }`}
//               //                     >
//               //                       Open Course
//               //                     </button>
//               //                   )}
//               //                 </div>
//               //               </motion.div>




//               <motion.div
//                 key={key}
//                 whileHover={isEnrolled ? { scale: 1.03, y: -6 } : {}}
//                 className={`
//     relative overflow-hidden
//     bg-white/90 backdrop-blur-lg 
//     rounded-3xl shadow-xl p-10 text-center 
//     transition-all duration-500 group

//     ${isEnrolled
//                     ? "hover:shadow-3xl hover:bg-indigo-50 hover:ring-4 hover:ring-indigo-300/40"
//                     : "opacity-60 cursor-not-allowed"
//                   }
//   `}
//               >

//                 {/* Top Gradient Border */}
//                 {isEnrolled && (
//                   <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-3xl"></div>
//                 )}

//                 {/* Course Title */}
//                 <h2 className="text-3xl font-extrabold mb-6 leading-tight">
//                   {courses[key].line1}
//                   <br />
//                   <span className="text-indigo-600">{courses[key].line2}</span>
//                 </h2>

//                 <div className="space-y-8">

//                   {/* ENROLLED / NOT ENROLLED */}
//                   <div
//                     className={`
//         inline-block px-5 py-2 rounded-full text-lg font-bold
//         ${isEnrolled ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 text-gray-500"}
//       `}
//                   >
//                     {isEnrolled ? "ENROLLED" : "NOT ENROLLED"}
//                   </div>

//                   {/* ASSIGNMENT STATUS */}
//                   <div className="flex justify-center items-center gap-3">
//                     <FiFileText className="text-indigo-600" size={28} />

//                     <span
//                       className={`text-lg font-bold 
//           ${!isEnrolled
//                           ? "text-gray-400"
//                           : assignmentDone
//                             ? "text-emerald-600"
//                             : "text-orange-600"
//                         }`}
//                     >
//                       {!isEnrolled
//                         ? "Assignment: Not Submitted"
//                         : assignmentDone
//                           ? "Assignment: Submitted"
//                           : "Assignment: Not Submitted"}
//                     </span>
//                   </div>

//                   {/* EXAM STATUS */}
//                   <div className="flex justify-center items-center gap-3">
//                     <FiBookOpen className="text-purple-600" size={30} />
//                     <span
//                       className={`text-xl font-black ${exam.color === "emerald"
//                           ? "text-emerald-600"
//                           : exam.color === "red"
//                             ? "text-red-600"
//                             : exam.color === "amber"
//                               ? "text-amber-600"
//                               : "text-gray-600"
//                         }`}
//                     >
//                       {exam.text}
//                     </span>
//                   </div>

//                   {/* COURSE DURATION & EXPIRY */}
//                   {isEnrolled && (
//                     <div className="bg-indigo-50 rounded-2xl p-5 shadow-inner">
//                       <p className="text-lg font-semibold text-indigo-700">
//                         Duration:{" "}
//                         <span className="font-bold">{durationText}</span>
//                       </p>

//                       <p className="text-md text-gray-700 mt-2">
//                         {isExpired ? (
//                           <span className="font-bold text-red-600">Course Expired</span>
//                         ) : (
//                           <>
//                             Expires On:{" "}
//                             <span className="font-bold text-red-600">
//                               {new Date(enrollment.expiresAt).toLocaleDateString("en-US", {
//                                 day: "2-digit",
//                                 month: "short",
//                                 year: "numeric",
//                               })}
//                             </span>
//                           </>
//                         )}
//                       </p>
//                     </div>
//                   )}

//                   {/* OPEN COURSE BUTTON */}
//                   {isEnrolled && (
//                     <button
//                       onClick={() => !isExpired && navigate(`/modules/${key}`)}
//                       disabled={isExpired}
//                       className={`
//           w-full mt-5 py-4 rounded-2xl font-bold text-xl text-white
//           transition-all duration-300 cursor-pointer
//           ${isExpired
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl hover:from-indigo-700 hover:to-purple-700"
//                         }
//         `}
//                     >
//                       Open Course
//                     </button>
//                   )}
//                 </div>
//               </motion.div>

//             );
//           })}




//         </div>
//       </div>
//     </div>
//   );
// }

//===============with notifictaion============

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  FiLogOut,
  FiAward,
  FiBookOpen,
  FiBarChart2,
  FiTarget,
  FiFileText,
  FiBell,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "../store/authStore";

export default function StudentDashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [assignmentStatus, setAssignmentStatus] = useState({});
  const [examResults, setExamResults] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentInfo, setStudentInfo] = useState(null);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enrollRes, assignRes, examRes, notifRes, infoRes] = await Promise.all([
          api.get("/enrollments/my"),
          api.get("/final-assignments/assignment-status"),
          api.get("/final-exams/results/my"),
          api.get("/notifications/student"),
          api.get("/student/dashboard"),
        ]);

        setEnrolledCourses(enrollRes.data?.activeCourses || []);
        setAssignmentStatus(assignRes.data || {});
        setExamResults(examRes.data?.results || []);
        setStudentInfo(infoRes.data.student);

        // Filter notifications to last 2 weeks (like code 2)
        const TWO_WEEKS = 14 * 24 * 60 * 60 * 1000;
        const validNotifications = (notifRes.data?.data || []).filter((n) => {
          const created = new Date(n.createdAt).getTime();
          return Date.now() - created <= TWO_WEEKS;
        });

        setNotifications(validNotifications);
      } catch (err) {
        console.error("Dashboard load failed:", err);
        toast.error("Failed to load dashboard. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const NEW_WINDOW = 24 * 60 * 60 * 1000;

  const newNotifications = notifications.filter(
    (n) => Date.now() - new Date(n.createdAt) <= NEW_WINDOW
  );

  // COURSE LABELS
  const courses = {
    basic: { line1: "Basic", line2: "Course" },
    intermediate: { line1: "Intermediate", line2: "Course" },
    advanced: { line1: "Advanced", line2: "Course" },
  };

  // Get exam score result
  const getExamStatus = (type) => {
    const result = examResults.find((r) => r.courseType === type);

    if (!result) return { text: "Not Taken", color: "gray" };

    return {
      text: `Final Exam: ${result.score}%`,
      score: result.score,
      color:
        result.score >= 75 ? "emerald" : result.score >= 50 ? "amber" : "red",
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="w-20 h-20 border-8 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">
      <div className="max-w-full mx-auto">
        {/* HEADER */}
        <div className="bg-white backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-12">
          <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-6">
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Welcome,{" "}
                </span>
                <span className="text-blue-700">
                  {studentInfo?.name || "Student"}
                </span>
              </h1>

              <h3 className="text-gray-700 text-lg">
                Username:{" "}
                <span className="font-bold text-purple-700 text-2xl">
                  {studentInfo?.username || "Not available"}
                </span>
              </h3>
            </div>

            <button
              onClick={() => {
                logout();
                toast.success("Logged out");
                navigate("/");
              }}
              className="cursor-pointer bg-red-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-200"
            >
              <FiLogOut className="text-xl" />
              Logout
            </button>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {/* Enrolled Courses */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 text-white p-10 rounded-3xl shadow-2xl text-center"
          >
            <FiBarChart2 size={56} className="mx-auto mb-5 drop-shadow-lg" />
            <p className="text-6xl font-black mb-2">
              {enrolledCourses.length}
            </p>
            <p className="text-2xl font-bold">Enrolled Courses</p>
          </motion.div>

          {/* Assignments Done */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white p-10 rounded-3xl shadow-2xl text-center"
          >
            <FiTarget size={56} className="mx-auto mb-5" />
            <p className="text-6xl font-black mb-2">
              {Object.values(assignmentStatus).filter((s) => s.submitted).length}
            </p>
            <p className="text-2xl font-bold">Assignments Done</p>
          </motion.div>

          {/* Exams Done */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 text-white p-10 rounded-3xl shadow-2xl text-center"
          >
            <FiAward size={56} className="mx-auto mb-5" />
            <p className="text-6xl font-black mb-2">{examResults.length}</p>
            <p className="text-2xl font-bold mb-2">Exams Done</p>
            <div className="flex justify-center gap-6 mt-2 text-lg font-semibold">
              <span className="text-green-300">
                Passed: {examResults.filter((r) => r.passed).length}
              </span>
              <span className="text-red-300">
                Failed: {examResults.filter((r) => r.passed === false).length}
              </span>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-600 to-yellow-600 text-white p-10 rounded-3xl shadow-2xl text-center"
          >
            <FiBell size={56} className="mx-auto mb-5 drop-shadow-lg" />
            <p className="text-6xl font-black mb-2">{notifications.length}</p>



            {newNotifications.length > 0 && (
              <span className="absolute top-6 right-6 bg-red-600 text-white text-sm px-3 py-1 rounded-full">
                {newNotifications.length} New
              </span>
            )}
            {notifications.length === 0 && (
              <p className="text-white italic text-center">
                No recent notifications
              </p>
            )}

            <p className="text-2xl font-bold">Notifications</p>
          </motion.div>
        </div>

        {/* COURSE CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
          {Object.keys(courses).map((key) => {
            const enrollment = enrolledCourses.find((c) => c.courseType === key);
            const isEnrolled = Boolean(enrollment);
            const isExpired = enrollment
              ? new Date(enrollment.expiresAt) < new Date()
              : false;

            const assignmentDone = assignmentStatus[key]?.submitted || false;
            const exam = isEnrolled
              ? getExamStatus(key)
              : { text: "Not Taken", color: "gray" };

            let durationText = "";
            if (enrollment) {
              if (enrollment.duration) {
                durationText = enrollment.duration.toUpperCase();
              } else if (enrollment.enrolledAt && enrollment.expiresAt) {
                const enrolledDate = new Date(enrollment.enrolledAt);
                const expiryDate = new Date(enrollment.expiresAt);
                const months =
                  (expiryDate.getFullYear() - enrolledDate.getFullYear()) * 12 +
                  (expiryDate.getMonth() - enrolledDate.getMonth());
                durationText = `${months} month${months > 1 ? "s" : ""}`;
              }
            }

            return (
              <motion.div
                key={key}
                whileHover={isEnrolled ? { scale: 1.03, y: -6 } : {}}
                className={`
                  relative overflow-hidden
                  bg-white/90 backdrop-blur-lg 
                  rounded-3xl shadow-xl p-10 text-center 
                  transition-all duration-500 group
                  ${isEnrolled
                    ? "hover:shadow-3xl hover:bg-indigo-50 hover:ring-4 hover:ring-indigo-300/40"
                    : "opacity-60 cursor-not-allowed"
                  }
                `}
              >
                {isEnrolled && (
                  <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-3xl"></div>
                )}

                <h2 className="text-3xl font-extrabold mb-6 leading-tight">
                  {courses[key].line1}
                  <br />
                  <span className="text-indigo-600">{courses[key].line2}</span>
                </h2>

                <div className="space-y-8">
                  <div
                    className={`
                      inline-block px-5 py-2 rounded-full text-lg font-bold
                      ${isEnrolled
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-gray-200 text-gray-500"
                      }
                    `}
                  >
                    {isEnrolled ? "ENROLLED" : "NOT ENROLLED"}
                  </div>

                  <div className="flex justify-center items-center gap-3">
                    <FiFileText className="text-indigo-600" size={28} />
                    <span
                      className={`text-lg font-bold 
                        ${!isEnrolled
                          ? "text-gray-400"
                          : assignmentDone
                            ? "text-emerald-600"
                            : "text-orange-600"
                        }`}
                    >
                      {!isEnrolled
                        ? "Assignment: Not Submitted"
                        : assignmentDone
                          ? "Assignment: Submitted"
                          : "Assignment: Not Submitted"}
                    </span>
                  </div>

                  <div className="flex justify-center items-center gap-3">
                    <FiBookOpen className="text-purple-600" size={30} />
                    <span
                      className={`text-xl font-black ${exam.color === "emerald"
                          ? "text-emerald-600"
                          : exam.color === "red"
                            ? "text-red-600"
                            : exam.color === "amber"
                              ? "text-amber-600"
                              : "text-gray-600"
                        }`}
                    >
                      {exam.text}
                    </span>
                  </div>

                  {isEnrolled && (
                    <div className="bg-indigo-50 rounded-2xl p-5 shadow-inner">
                      <p className="text-lg font-semibold text-indigo-700">
                        Duration: <span className="font-bold">{durationText}</span>
                      </p>
                      <p className="text-md text-gray-700 mt-2">
                        {isExpired ? (
                          <span className="font-bold text-red-600">
                            Course Expired
                          </span>
                        ) : (
                          <>
                            Expires On:{" "}
                            <span className="font-bold text-red-600">
                              {new Date(enrollment.expiresAt).toLocaleDateString(
                                "en-US",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  )}

                  {isEnrolled && (
                    <button
                      onClick={() => !isExpired && navigate(`/modules/${key}`)}
                      disabled={isExpired}
                      className={`
                        w-full mt-5 py-4 rounded-2xl font-bold text-xl text-white
                        transition-all duration-300 cursor-pointer
                        ${isExpired
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl hover:from-indigo-700 hover:to-purple-700"
                        }
                      `}
                    >
                      {isExpired ? "Course Expired" : "Open Course"}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* RECENT NOTIFICATIONS SECTION */}
        {notifications.length > 0 && (
          <div className="bg-white backdrop-blur-xl rounded-3xl shadow-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <FiBell className="text-amber-600" size={28} />
              <h2 className="text-3xl font-bold text-gray-800">
                Recent Notifications
              </h2>
            </div>

            <div className="space-y-5">
              {[...notifications]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 3)
                .map((notif) => (
                  <motion.div
                    key={notif._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-5 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border border-amber-100"
                  >
                    <p className="text-gray-800 leading-relaxed">
                      {notif.message}
                    </p>
                    <p className="text-sm text-gray-500 mt-3">
                      {new Date(notif.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </motion.div>
                ))}

              {notifications.length > 3 && (
                <p className="text-center text-gray-500 mt-4 italic">
                  + {notifications.length - 3} more notifications
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}








//===========correct============

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { FiLogOut, FiCheckCircle, FiUpload, FiFileText, FiBookOpen, FiAward } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import { useAuth } from "../store/authStore";

// export default function StudentDashboard() {
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [assignmentStatus, setAssignmentStatus] = useState({});
//   const [examResults, setExamResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const { logout } = useAuth();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [enrollRes, assignRes, examRes] = await Promise.all([
//           api.get("/enrollments/my"),
//           api.get("/final-assignments/assignment-status"),
//           api.get("/final-exams/results/my"),
//         ]);

//         setEnrolledCourses(enrollRes.data.activeCourses || []);
//         setAssignmentStatus(assignRes.data || {});
//         setExamResults(examRes.data.results || []);

//         console.log("Dashboard loaded:", {
//           enrolled: enrollRes.data.activeCourses,
//           assignments: assignRes.data,
//           exams: examRes.data.results,
//         });
//       } catch (err) {
//         console.error("Dashboard load failed:", err.response?.data || err.message);
//         toast.error("Failed to load dashboard. Please refresh.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const courseNames = {
//     basic: { line1: "Basic", line2: "Web Development" },
//     intermediate: { line1: "Intermediate", line2: "JavaScript" },
//     advanced: { line1: "Advanced", line2: "Full Stack" },
//   };

//   const getExamStatus = (courseType) => {
//     const result = examResults.find(r => r.courseType === courseType);
//     if (!result) return { text: "Not Taken", color: "gray", icon: FiFileText };
//     if (result.passed) return { text: "PASSED", score: result.score, color: "emerald", icon: FiAward };
//     return { text: "FAILED", score: result.score, color: "red", icon: FiFileText };
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50">
//         <div className="w-20 h-20 border-8 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-10 border border-white/50">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//             <div>
//               <h1 className="text-5xl font-extrabold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 Welcome Back!
//               </h1>
//               <p className="text-2xl text-gray-700 mt-3">
//                 Ready to continue your learning journey?
//               </p>
//             </div>
//             <button
//               onClick={() => { logout(); toast.success("Logged out"); navigate("/"); }}
//               className="bg-linear-to-r from-red-500 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl hover:shadow-2xl transition"
//             >
//               <FiLogOut /> Logout
//             </button>
//           </div>
//         </div>

//         {/* Course Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {["basic", "intermediate", "advanced"].map((type) => {
//             const isEnrolled = enrolledCourses.some(c => c.courseType === type);
//             const assignmentDone = assignmentStatus[type] || false;
//             const exam = getExamStatus(type);

//             return (
//               <motion.div
//                 key={type}
//                 whileHover={{ scale: 1.05 }}
//                 onClick={() => isEnrolled && navigate(`/modules/${type}`)}
//                 className={`relative overflow-hidden rounded-3xl shadow-2xl p-10 text-white cursor-pointer transition-all
//                   ${isEnrolled ? "bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600" : "bg-gray-400/70"}
//                 `}
//               >
//                 {/* Course Name */}
//                 <h2 className="text-4xl font-extrabold text-center mb-8">
//                   {courseNames[type].line1}
//                   <br />
//                   <span className="text-2xl">{courseNames[type].line2}</span>
//                 </h2>

//                 {/* Status Indicators */}
//                 <div className="space-y-6 text-center">
//                   {/* Enrollment */}
//                   <div className={`text-2xl font-bold ${isEnrolled ? "text-white" : "text-gray-300"}`}>
//                     {isEnrolled ? "ENROLLED" : "NOT ENROLLED"}
//                   </div>

//                   {/* Assignment */}
//                   <div className="flex justify-center items-center gap-3">
//                     <FiFileText size={32} />
//                     <span className={`text-xl font-bold ${assignmentDone ? "text-emerald-300" : "text-orange-300"}`}>
//                       {assignmentDone ? "Assignment Submitted" : "Assignment Pending"}
//                     </span>
//                   </div>

//                   {/* Exam */}
//                   <div className="flex justify-center items-center gap-3">
//                     <exam.icon size={36} />
//                     <div>
//                       <div className={`text-2xl font-black text-${exam.color}-300`}>
//                         {exam.text}
//                       </div>
//                       {exam.score !== undefined && (
//                         <div className="text-lg">Score: {exam.score}%</div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Action Button */}
//                   {isEnrolled && (
//                     <button className="mt-8 w-full bg-white/20 backdrop-blur py-4 rounded-2xl font-bold text-xl hover:bg-white/30 transition">
//                       {exam.text === "Not Taken" ? "Start Course" : "Continue Learning"}
//                     </button>
//                   )}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Footer Message */}
//         <div className="text-center mt-16 text-gray-600">
//           <p className="text-2xl font-semibold">Keep pushing forward — your certificate is waiting!</p>
//         </div>
//       </div>
//     </div>
//   );
// }


